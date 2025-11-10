import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  Eye,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const mockApplications = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    companyName: 'TechCorp Solutions',
    companyLogo: null,
    location: 'San Francisco, CA',
    workType: 'hybrid',
    status: 'under_review',
    appliedAt: '2025-01-07T10:30:00Z',
    updatedAt: '2025-01-08T14:20:00Z',
    coverNote: 'I am very excited about this opportunity to work with TechCorp Solutions. My experience with React and TypeScript aligns perfectly with your requirements.',
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'Product Manager',
    companyName: 'TechCorp Solutions',
    companyLogo: null,
    location: 'Remote',
    workType: 'remote',
    status: 'shortlisted',
    appliedAt: '2025-01-06T09:15:00Z',
    updatedAt: '2025-01-07T16:45:00Z',
    coverNote: 'I believe my full-stack experience and product mindset would be valuable for this Product Manager role.',
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'UX Designer',
    companyName: 'Design Studio Pro',
    companyLogo: null,
    location: 'Los Angeles, CA',
    workType: 'remote',
    status: 'applied',
    appliedAt: '2025-01-05T15:20:00Z',
    updatedAt: '2025-01-05T15:20:00Z',
    coverNote: 'I am passionate about creating user-centered designs and would love to contribute to your design team.',
  },
  {
    id: '4',
    jobId: '4',
    jobTitle: 'Data Scientist',
    companyName: 'DataTech Analytics',
    companyLogo: null,
    location: 'Austin, TX',
    workType: 'hybrid',
    status: 'rejected',
    appliedAt: '2025-01-03T11:00:00Z',
    updatedAt: '2025-01-06T10:30:00Z',
  }
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'applied', label: 'Applied' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' },
];

export function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    under_review: 0,
    shortlisted: 0,
    hired: 0
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/applications/my-applications');
      setApplications(response.data.applications || []);
      
      // Calculate stats
      const apps = response.data.applications || [];
      setStats({
        total: apps.length,
        applied: apps.filter((app: any) => app.status === 'applied').length,
        under_review: apps.filter((app: any) => app.status === 'under_review').length,
        shortlisted: apps.filter((app: any) => app.status === 'shortlisted').length,
        hired: apps.filter((app: any) => app.status === 'hired').length,
      });
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to fetch your applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      applied: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-purple-100 text-purple-800',
    };
    
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getWorkTypeBadge = (workType: string) => {
    const badges = {
      remote: 'bg-green-100 text-green-800',
      onsite: 'bg-blue-100 text-blue-800',
      hybrid: 'bg-purple-100 text-purple-800',
    };
    return badges[workType as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusMessage = (status: string) => {
    const messages = {
      applied: 'Your application has been submitted and is waiting for review.',
      under_review: 'Your application is currently being reviewed by the employer.',
      shortlisted: 'Congratulations! You have been shortlisted for this position.',
      rejected: 'Unfortunately, your application was not selected for this position.',
      hired: 'Congratulations! You have been hired for this position.',
    };
    
    return messages[status as keyof typeof messages] || 'Status unknown';
  };

  const filteredApplications = applications.filter((application: any) => {
    const matchesSearch = application.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || application.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track the status of your job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {stats.applied}
            </p>
            <p className="text-sm text-gray-600">Applied</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {stats.under_review}
            </p>
            <p className="text-sm text-gray-600">Under Review</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {stats.shortlisted}
            </p>
            <p className="text-sm text-gray-600">Shortlisted</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {stats.hired}
            </p>
            <p className="text-sm text-gray-600">Hired</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
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
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application: any) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      {application.company_logo ? (
                        <img src={application.company_logo} alt={application.company_name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <Building2 className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{application.job_title}</h3>
                      <p className="text-sm text-gray-600">{application.company_name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(application.work_type)}`}>
                          {application.work_type.charAt(0).toUpperCase() + application.work_type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(application.status)}`}>
                    {application.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600">{getStatusMessage(application.status)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {application.job_location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied {new Date(application.applied_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Updated {new Date(application.updated_at).toLocaleDateString()}
                  </div>
                </div>

                {application.cover_note && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 line-clamp-2">{application.cover_note}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <Link to={`/jobs/${application.job_id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Job
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Company
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {applications.length === 0 && !loading && (
        <Card className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-4">Start applying for jobs to see your applications here</p>
          <Link to="/jobs">
            <Button>
              Browse Jobs
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}