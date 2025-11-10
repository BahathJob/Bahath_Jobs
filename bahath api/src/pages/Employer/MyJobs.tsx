import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Clock, 
  DollarSign,
  Briefcase
} from 'lucide-react';
import { useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    seniority: 'senior',
    industry: 'Technology',
    salaryMin: 120000,
    salaryMax: 150000,
    status: 'pending_approval',
    isApproved: true,
    applications: 45,
    views: 234,
    createdAt: '2025-01-05',
    deadline: '2025-02-05',
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Remote',
    workType: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 100000,
    salaryMax: 130000,
    status: 'active',
    isApproved: true,
    applications: 67,
    views: 456,
    createdAt: '2025-01-03',
    deadline: '2025-02-03',
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 85000,
    salaryMax: 115000,
    status: 'draft',
    isApproved: false,
    applications: 0,
    views: 0,
    createdAt: '2025-01-08',
    deadline: '2025-02-08',
  },
  {
    id: '4',
    title: 'Backend Developer',
    location: 'Remote',
    workType: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 90000,
    salaryMax: 120000,
    status: 'pending_approval',
    isApproved: false,
    applications: 0,
    views: 12,
    createdAt: '2025-01-09',
    deadline: '2025-02-09',
  }
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
  { value: 'closed', label: 'Closed' },
];

export function MyJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalViews: 0
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // This would be a new endpoint to get employer's jobs
      const response = await api.get('/jobs/employer/my-jobs');
      setJobs(response.data.jobs || []);
      setStats(response.data.stats || stats);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to fetch your jobs');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, isApproved: boolean) => {
    if (status === 'pending_approval' || (!isApproved && status !== 'draft')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    
    const badges = {
      active: 'bg-green-100 text-green-800',
      pending_approval: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800',
      paused: 'bg-orange-100 text-orange-800',
      closed: 'bg-red-100 text-red-800',
    };
    
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string, isApproved: boolean) => {
    if (status === 'pending_approval' || (!isApproved && status !== 'draft')) {
      return 'PENDING APPROVAL';
    }
    return status.toUpperCase();
  };

  const getWorkTypeBadge = (workType: string) => {
    const badges = {
      remote: 'bg-green-100 text-green-800',
      onsite: 'bg-blue-100 text-blue-800',
      hybrid: 'bg-purple-100 text-purple-800',
    };
    return badges[workType as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      await api.delete(`/jobs/${jobId}`);
      toast.success('Job deleted successfully');
      fetchJobs(); // Refresh the list
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
          <p className="text-gray-600">Manage your job postings and track their performance</p>
        </div>
        <Link to="/employer/post-job">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
            <p className="text-sm text-gray-600">Total Jobs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.totalApplications}</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
            <p className="text-sm text-gray-600">Total Views</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by status"
          />
          <Button variant="outline">
            View Analytics
          </Button>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job: any) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(job.is_approved ? 'active' : 'pending_approval', job.is_approved)}`}>
                          {getStatusText(job.is_approved ? 'active' : 'pending_approval', job.is_approved)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(job.work_type)}`}>
                          {job.work_type.charAt(0).toUpperCase() + job.work_type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job.salary_min && job.salary_max ? formatSalary(job.salary_min, job.salary_max) : 'Salary not specified'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {job.application_count || 0} applications
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Eye className="h-4 w-4 mr-1" />
                    {job.view_count || 0} views
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Posted {new Date(job.created_at).toLocaleDateString()}
                    </span>
                    {job.deadline && (
                      <span>
                        Deadline: {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Link to={`/employer/jobs/${job.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Link to={`/employer/applications?jobId=${job.id}`}>
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    Applications
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && !loading && (
        <Card className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-600 mb-4">Start by posting your first job to attract talented candidates</p>
          <Link to="/employer/post-job">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Job
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}