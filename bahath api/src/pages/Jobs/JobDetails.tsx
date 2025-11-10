import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useAuth } from '../../contexts/AuthContext';
import {
  MapPin,
  Clock,
  Building2,
  Heart,
  Bookmark,
  Share2,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const fallbackJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    description: 'We are looking for a talented Senior Frontend Developer to join our growing engineering team. You will be responsible for building modern, responsive web applications using React and TypeScript. This is an excellent opportunity to work with cutting-edge technologies and contribute to products used by millions of users worldwide.',
    responsibilities: 'Develop and maintain frontend applications\nCollaborate with design and backend teams\nWrite clean, maintainable code\nMentor junior developers\nOptimize application performance\nParticipate in code reviews and technical discussions',
    requirements: 'Bachelor\'s degree in Computer Science or related field\n5+ years of experience with React and TypeScript\nProficiency in modern JavaScript (ES6+)\nExperience with state management (Redux, Zustand)\nKnowledge of testing frameworks (Jest, Cypress)\nFamiliarity with version control (Git)',
    benefits: 'Competitive salary and equity package\nHealth, dental, and vision insurance\nFlexible work hours and remote options\nProfessional development budget\n401(k) matching\nModern office with great snacks\nUnlimited PTO policy',
    company_name: 'TechCorp Solutions',
    company_description: 'TechCorp Solutions is a leading technology company specializing in software development, cloud infrastructure, and digital transformation services.',
    company_website: 'https://techcorp.example.com',
    location: 'San Francisco, CA',
    work_type: 'hybrid',
    seniority: 'senior',
    industry: 'Technology',
    education: 'Bachelor\'s Degree',
    visa_eligible: true,
    salary_min: 120000,
    salary_max: 150000,
    currency: 'USD',
    created_at: '2025-01-08T10:00:00Z',
    stats: {
      likes: 23,
      favorites: 12,
      interests: 8,
      comments: 5,
    }
  },
  {
    id: 2,
    title: 'Product Manager',
    description: 'Join our product team as a Product Manager to drive the development of innovative features that delight our customers. You\'ll work cross-functionally to define product strategy and roadmap.',
    responsibilities: 'Define product vision and strategy\nWork with engineering and design teams\nConduct market research and user interviews\nManage product roadmap and priorities\nAnalyze product metrics and user feedback\nCoordinate product launches',
    requirements: 'Bachelor\'s degree in Business, Engineering, or related field\n3+ years of product management experience\nExperience with Agile methodologies\nStrong analytical and communication skills\nExperience with product analytics tools\nTechnical background preferred',
    benefits: 'Competitive salary and bonuses\nStock options\nHealth and wellness benefits\nFlexible PTO policy\nLearning and development opportunities\nRemote work flexibility',
    company_name: 'TechCorp Solutions',
    company_description: 'TechCorp Solutions is a leading technology company specializing in software development, cloud infrastructure, and digital transformation services.',
    company_website: 'https://techcorp.example.com',
    location: 'Remote',
    work_type: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    education: 'Bachelor\'s Degree',
    visa_eligible: true,
    salary_min: 100000,
    salary_max: 130000,
    currency: 'USD',
    created_at: '2025-01-06T10:00:00Z',
    stats: {
      likes: 18,
      favorites: 9,
      interests: 12,
      comments: 3,
    }
  },
  {
    id: 3,
    title: 'Creative Director',
    description: 'Lead our creative team and oversee the development of brand campaigns, digital experiences, and marketing materials for our diverse client portfolio.',
    responsibilities: 'Lead and inspire the creative team\nDevelop creative strategies for client campaigns\nOversee design and copy development\nPresent concepts to clients\nManage multiple projects simultaneously\nStay current with design trends and technologies',
    requirements: 'Bachelor\'s degree in Design, Marketing, or related field\n7+ years of creative leadership experience\nProficiency in Adobe Creative Suite\nStrong portfolio of creative work\nExcellent presentation and communication skills\nExperience managing creative teams',
    benefits: 'Competitive salary\nCreative freedom and autonomy\nHealth and dental insurance\nPaid time off and holidays\nProfessional development opportunities\nInspiring work environment',
    company_name: 'Creative Agency Inc',
    company_description: 'Creative Agency Inc is a full-service digital agency that helps brands tell their story through compelling design and strategic marketing.',
    company_website: 'https://creative-agency.example.com',
    location: 'New York, NY',
    work_type: 'onsite',
    seniority: 'senior',
    industry: 'Marketing & Advertising',
    education: 'Bachelor\'s Degree',
    visa_eligible: false,
    salary_min: 90000,
    salary_max: 120000,
    currency: 'USD',
    created_at: '2025-01-04T10:00:00Z',
    stats: {
      likes: 15,
      favorites: 7,
      interests: 5,
      comments: 8,
    }
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    description: 'We are seeking a talented Full Stack Developer to join our dynamic team. You will work on both frontend and backend development, creating scalable web applications using modern technologies. This role offers the opportunity to work on exciting projects and grow your skills in a collaborative environment.',
    responsibilities: 'Develop full-stack web applications\nDesign and implement RESTful APIs\nWork with databases and data modeling\nCollaborate with cross-functional teams\nWrite unit and integration tests\nOptimize application performance\nParticipate in agile development processes',
    requirements: 'Bachelor\'s degree in Computer Science or related field\n3+ years of full-stack development experience\nProficiency in JavaScript/TypeScript\nExperience with React and Node.js\nKnowledge of SQL and NoSQL databases\nFamiliarity with cloud platforms (AWS, Azure)\nExperience with version control (Git)',
    benefits: 'Competitive salary package\nHealth and dental insurance\nFlexible working hours\nRemote work options\nProfessional development budget\nStock options\nTeam building activities\nModern office environment',
    company_name: 'InnovateTech',
    company_description: 'InnovateTech is a fast-growing startup focused on building innovative software solutions for businesses worldwide.',
    company_website: 'https://innovatetech.example.com',
    location: 'Austin, TX',
    work_type: 'hybrid',
    seniority: 'mid',
    industry: 'Technology',
    education: 'Bachelor\'s Degree',
    visa_eligible: true,
    salary_min: 80000,
    salary_max: 110000,
    currency: 'USD',
    created_at: '2025-01-07T10:00:00Z',
    stats: {
      likes: 31,
      favorites: 18,
      interests: 14,
      comments: 7,
    }
  },
  {
    id: 7,
    title: 'UX/UI Designer',
    description: 'Join our design team as a UX/UI Designer to create beautiful and intuitive user experiences. You will work closely with product managers and developers to design user-centered solutions that solve real problems.',
    responsibilities: 'Design user interfaces and experiences\nConduct user research and usability testing\nCreate wireframes and prototypes\nCollaborate with development teams\nMaintain design systems\nPresent design concepts to stakeholders',
    requirements: 'Bachelor\'s degree in Design or related field\n3+ years of UX/UI design experience\nProficiency in Figma and Adobe Creative Suite\nStrong portfolio of design work\nUnderstanding of user-centered design principles\nExperience with design systems',
    benefits: 'Competitive salary\nCreative freedom\nHealth benefits\nFlexible schedule\nDesign tool subscriptions\nConference attendance budget',
    company_name: 'DesignStudio Pro',
    company_description: 'DesignStudio Pro is a creative agency specializing in digital product design and user experience consulting.',
    company_website: 'https://designstudio.example.com',
    location: 'Los Angeles, CA',
    work_type: 'remote',
    seniority: 'mid',
    industry: 'Design',
    education: 'Bachelor\'s Degree',
    visa_eligible: false,
    salary_min: 70000,
    salary_max: 95000,
    currency: 'USD',
    created_at: '2025-01-05T10:00:00Z',
    stats: {
      likes: 27,
      favorites: 15,
      interests: 11,
      comments: 4,
    }
  }
];

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch job:', error);
      
      // Fallback to mock data if API fails
      const fallbackJob = fallbackJobs.find(job => job.id === parseInt(id || '0'));
      if (fallbackJob) {
        setJob(fallbackJob);
        console.log('Using fallback data for job:', id);
      } else {
        toast.error('Failed to fetch job details');
        setJob(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    if (user.role !== 'job_seeker') {
      toast.error('Only job seekers can apply for jobs');
      return;
    }

    try {
      setApplying(true);
      await api.post(`/jobs/${id}/apply`, { coverNote });
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      setCoverNote('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const handleEngagement = async (type: 'like' | 'favorite' | 'interest') => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    try {
      await api.post(`/jobs/${id}/engage`, { type });
      toast.success(`Job ${type}d!`);
      // Refresh job data to update engagement counts
      fetchJob();
    } catch (error) {
      console.error(`Failed to ${type} job:`, error);
      toast.error(`Failed to ${type} job`);
    }
  };

  const formatSalary = (min?: number, max?: number, currency: string = 'USD') => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `$${min.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  const getWorkTypeBadge = (workType: string) => {
    const badges = {
      remote: 'bg-green-100 text-green-800',
      onsite: 'bg-blue-100 text-blue-800',
      hybrid: 'bg-purple-100 text-purple-800',
    };
    return badges[workType as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getSeniorityBadge = (seniority: string) => {
    const badges = {
      entry: 'bg-green-100 text-green-800',
      mid: 'bg-blue-100 text-blue-800',
      senior: 'bg-purple-100 text-purple-800',
      executive: 'bg-red-100 text-red-800',
    };
    return badges[seniority as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded mb-6 w-1/4"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6">
        <Card className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job not found</h3>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/jobs')}>Browse Jobs</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </button>

      {/* Job Header */}
      <Card className="mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              {job.company_logo ? (
                <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 object-cover rounded-lg" />
              ) : (
                <Building2 className="h-8 w-8 text-blue-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
              <div className="flex items-center space-x-3 text-gray-600 mb-2">
                <span className="font-medium">{job.company_name}</span>
                {job.company_website && (
                  <a 
                    href={job.company_website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEngagement('like')}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleEngagement('favorite')}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-3 py-1 text-sm rounded-full ${getWorkTypeBadge(job.work_type)}`}>
            {job.work_type.charAt(0).toUpperCase() + job.work_type.slice(1)}
          </span>
          <span className={`px-3 py-1 text-sm rounded-full ${getSeniorityBadge(job.seniority)}`}>
            {job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1)} Level
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
            {job.industry}
          </span>
          {job.visa_eligible && (
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
              Visa Eligible
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-lg font-semibold text-gray-900">
              <DollarSign className="h-5 w-5 mr-1" />
              {formatSalary(job.salary_min, job.salary_max, job.currency)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {user?.role === 'job_seeker' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleEngagement('interest')}
                >
                  Mark Interest
                </Button>
                <Button onClick={() => setShowApplyModal(true)}>
                  Apply Now
                </Button>
              </>
            )}
            {!user && (
              <Button onClick={() => navigate('/auth/login')}>
                Sign In to Apply
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
            <div className="prose max-w-none">
              <div className="text-gray-700">
                {job.responsibilities.split('\n').map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <div className="prose max-w-none">
              <div className="text-gray-700">
                {job.requirements.split('\n').map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {job.benefits && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
              <div className="prose max-w-none">
                <div className="text-gray-700">
                  {job.benefits.split('\n').map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Job Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Education</span>
                <span className="font-medium">{job.education}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{job.seniority} Level</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Work Type</span>
                <span className="font-medium capitalize">{job.work_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Industry</span>
                <span className="font-medium">{job.industry}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Company Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Company</span>
                <p className="font-medium">{job.company_name}</p>
              </div>
              {job.company_description && (
                <div>
                  <span className="text-gray-600">About</span>
                  <p className="text-sm text-gray-700 mt-1">{job.company_description}</p>
                </div>
              )}
              {job.company_website && (
                <div>
                  <a 
                    href={job.company_website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Engagement</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Likes</span>
                <span className="font-medium">{job.stats?.likes || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Favorites</span>
                <span className="font-medium">{job.stats?.favorites || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Interests</span>
                <span className="font-medium">{job.stats?.interests || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Comments</span>
                <span className="font-medium">{job.stats?.comments || 0}</span>
              </div>
            </div>
          </Card>

          {/* Similar Jobs */}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for {job.title}</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Note (Optional)
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell the employer why you're interested in this role..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowApplyModal(false)}
                disabled={applying}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}