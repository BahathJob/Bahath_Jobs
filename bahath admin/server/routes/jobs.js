import express from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import db from '../database/database.js';

const router = express.Router();

// Get all jobs (public route with filters)
router.get('/', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const location = req.query.location || '';
    const industry = req.query.industry || '';
    const workType = req.query.workType || '';
    const seniority = req.query.seniority || '';

    let query = `
      SELECT j.*, c.name as company_name, c.logo as company_logo
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.is_active = 1 AND j.is_approved = 1 AND c.is_approved = 1
    `;
    const params = [];

    if (search) {
      query += ' AND (j.title LIKE ? OR j.description LIKE ? OR c.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (location) {
      query += ' AND j.location LIKE ?';
      params.push(`%${location}%`);
    }

    if (industry) {
      query += ' AND j.industry = ?';
      params.push(industry);
    }

    if (workType) {
      query += ' AND j.work_type = ?';
      params.push(workType);
    }

    if (seniority) {
      query += ' AND j.seniority = ?';
      params.push(seniority);
    }

    query += ' ORDER BY j.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    const jobs = db.prepare(query).all(...params);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as count
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.is_active = 1 AND j.is_approved = 1 AND c.is_approved = 1
    `;
    const countParams = [];

    if (search) {
      countQuery += ' AND (j.title LIKE ? OR j.description LIKE ? OR c.name LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (location) {
      countQuery += ' AND j.location LIKE ?';
      countParams.push(`%${location}%`);
    }

    if (industry) {
      countQuery += ' AND j.industry = ?';
      countParams.push(industry);
    }

    if (workType) {
      countQuery += ' AND j.work_type = ?';
      countParams.push(workType);
    }

    if (seniority) {
      countQuery += ' AND j.seniority = ?';
      countParams.push(seniority);
    }

    const total = db.prepare(countQuery).get(...countParams).count;

    res.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// Get single job
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const job = db.prepare(`
      SELECT j.*, c.name as company_name, c.logo as company_logo, c.description as company_description, c.website as company_website
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.id = ? AND j.is_active = 1 AND j.is_approved = 1 AND c.is_approved = 1
    `).get(id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Get engagement stats
    const engagementStats = db.prepare(`
      SELECT 
        type,
        COUNT(*) as count
      FROM engagements
      WHERE job_id = ?
      GROUP BY type
    `).all(id);

    const stats = {};
    engagementStats.forEach(stat => {
      stats[stat.type] = stat.count;
    });

    res.json({ 
      ...job,
      stats: {
        likes: stats.like || 0,
        comments: stats.comment || 0,
        favorites: stats.favorite || 0,
        interests: stats.interest || 0
      }
    });
  } catch (error) {
    console.error('Job fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch job' });
  }
});

// Create job (employer only)
router.post('/', authenticateToken, requireRole(['employer']), (req, res) => {
  try {
    const jobData = req.body;
    const employerId = req.user.id;

    // Get employer's company
    const company = db.prepare('SELECT * FROM companies WHERE employer_id = ? AND is_approved = 1').get(employerId);
    if (!company) {
      return res.status(400).json({ message: 'You must have an approved company profile to post jobs' });
    }

    const stmt = db.prepare(`
      INSERT INTO jobs (
        title, description, responsibilities, requirements, benefits,
        location, work_type, industry, education, visa_eligible, seniority,
        salary_min, salary_max, currency, company_id, employer_id, deadline
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      jobData.title,
      jobData.description,
      jobData.responsibilities,
      jobData.requirements,
      jobData.benefits,
      jobData.location,
      jobData.workType,
      jobData.industry,
      jobData.education,
      jobData.visaEligible ? 1 : 0,
      jobData.seniority,
      jobData.salaryMin,
      jobData.salaryMax,
      jobData.currency || 'USD',
      company.id,
      employerId,
      jobData.deadline
    );

    const job = db.prepare('SELECT * FROM jobs WHERE rowid = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Job posted successfully. It will be reviewed by our team.',
      job
    });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
});

// Get employer's jobs
router.get('/employer/my-jobs', authenticateToken, requireRole(['employer']), (req, res) => {
  try {
    const employerId = req.user.id;
    
    const jobs = db.prepare(`
      SELECT 
        j.*,
        c.name as company_name,
        (SELECT COUNT(*) FROM job_applications WHERE job_id = j.id) as application_count,
        0 as view_count
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.employer_id = ?
      ORDER BY j.created_at DESC
    `).all(employerId);

    // Calculate stats
    const stats = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.is_active && job.is_approved).length,
      totalApplications: jobs.reduce((sum, job) => sum + job.application_count, 0),
      totalViews: jobs.reduce((sum, job) => sum + job.view_count, 0)
    };

    res.json({ jobs, stats });
  } catch (error) {
    console.error('Employer jobs fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch your jobs' });
  }
});

// Delete job (employer only)
router.delete('/:id', authenticateToken, requireRole(['employer']), (req, res) => {
  try {
    const { id } = req.params;
    const employerId = req.user.id;

    // Verify job belongs to this employer
    const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND employer_id = ?').get(id, employerId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found or you do not have permission to delete it' });
    }

    // Delete job (this will cascade delete applications due to foreign key)
    db.prepare('DELETE FROM jobs WHERE id = ?').run(id);

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Job deletion error:', error);
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

// Apply for job (job seeker only)
router.post('/:id/apply', authenticateToken, requireRole(['job_seeker']), (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { coverNote } = req.body;
    const jobSeekerId = req.user.id;

    // Check if job exists and is active
    const job = db.prepare('SELECT * FROM jobs WHERE id = ? AND is_active = 1 AND is_approved = 1').get(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = db.prepare('SELECT * FROM job_applications WHERE job_id = ? AND job_seeker_id = ?').get(jobId, jobSeekerId);
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const stmt = db.prepare(`
      INSERT INTO job_applications (job_id, job_seeker_id, cover_note)
      VALUES (?, ?, ?)
    `);

    stmt.run(jobId, jobSeekerId, coverNote);

    // Create notification for employer
    const notificationStmt = db.prepare(`
      INSERT INTO notifications (user_id, title, message, type)
      VALUES (?, ?, ?, ?)
    `);

    notificationStmt.run(
      job.employer_id,
      'New Job Application',
      `Someone applied for your job: ${job.title}`,
      'application'
    );

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// Add engagement (like, favorite, interest)
router.post('/:id/engage', authenticateToken, (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { type, content } = req.body;
    const userId = req.user.id;

    if (!['like', 'comment', 'favorite', 'interest'].includes(type)) {
      return res.status(400).json({ message: 'Invalid engagement type' });
    }

    // For like, favorite, interest - check if already exists
    if (['like', 'favorite', 'interest'].includes(type)) {
      const existing = db.prepare('SELECT * FROM engagements WHERE job_id = ? AND user_id = ? AND type = ?').get(jobId, userId, type);
      if (existing) {
        // Remove engagement (toggle)
        db.prepare('DELETE FROM engagements WHERE id = ?').run(existing.id);
        return res.json({ message: `${type} removed` });
      }
    }

    // Add engagement
    const stmt = db.prepare(`
      INSERT INTO engagements (job_id, user_id, type, content)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(jobId, userId, type, content);

    res.status(201).json({ message: `${type} added successfully` });
  } catch (error) {
    console.error('Engagement error:', error);
    res.status(500).json({ message: 'Failed to add engagement' });
  }
});

export default router;