import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Search, 
  MapPin, 
  Clock, 
  Building2, 
  Heart, 
  Bookmark, 
  Eye,
  Filter,
  DollarSign,
  Briefcase
} from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Education', label: 'Education' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
];

const workTypeOptions = [
  { value: '', label: 'All Work Types' },
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
];

const seniorityOptions = [
  { value: '', label: 'All Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
];

export function JobBrowse() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    industry: '',
    workType: '',
    seniority: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      
      if (filters.search) params.append('search', filters.search);
      if (filters.location) params.append('location', filters.location);
      if (filters.industry) params.append('industry', filters.industry);
      if (filters.workType) params.append('workType', filters.workType);
      if (filters.seniority) params.append('seniority', filters.seniority);

      const response = await api.get(`/jobs?${params.toString()}`);
      setJobs(response.data.jobs || []);
      setPagination(response.data.pagination || pagination);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to fetch jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleEngagement = async (jobId: string, type: 'like' | 'favorite') => {
    if (!user) {
      toast.error('Please login to engage with jobs');
      navigate('/login');
      return;
    }

    try {
      await api.post(`/jobs/${jobId}/engage`, { type });
      toast.success(`Job ${type}d!`);
      // Optionally refresh the job list to update engagement counts
      fetchJobs();
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
        <div className="animate-pulse space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
        <p className="text-gray-600">Discover opportunities that match your skills and interests</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for jobs, companies, keywords..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
            <p className="text-sm text-gray-600">{pagination.total} jobs found</p>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <Select
                options={industryOptions}
                value={filters.industry}
                onChange={(e) => handleFilterChange('industry', e.target.value)}
                placeholder="Industry"
              />
              <Select
                options={workTypeOptions}
                value={filters.workType}
                onChange={(e) => handleFilterChange('workType', e.target.value)}
                placeholder="Work Type"
              />
              <Select
                options={seniorityOptions}
                value={filters.seniority}
                onChange={(e) => handleFilterChange('seniority', e.target.value)}
                placeholder="Experience Level"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job: any) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer relative">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {job.company_logo ? (
                        <img src={job.company_logo} alt={job.company_name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <Building2 className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{job.company_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEngagement(job.id, 'like');
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors relative z-10"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEngagement(job.id, 'favorite');
                      }}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors relative z-10"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(job.work_type)}`}>
                    {job.work_type.charAt(0).toUpperCase() + job.work_type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeniorityBadge(job.seniority)}`}>
                    {job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1)} Level
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    {job.industry}
                  </span>
                  {job.visa_eligible && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Visa Eligible
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-blue-600 font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {formatSalary(job.salary_min, job.salary_max, job.currency)}
                    </span>
                  </div>
                </div>
              </div>
              <Link to={`/jobs/${job.id}`} className="absolute inset-0 z-0"></Link>
            </div>
          </Card>
        ))}

        {jobs.length === 0 && !loading && (
          <Card className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={() => setFilters({
              search: '',
              location: '',
              industry: '',
              workType: '',
              seniority: '',
            })}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} jobs
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                Previous
              </Button>
              <span className="px-3 py-1 text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}