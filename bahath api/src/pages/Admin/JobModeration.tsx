import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Search, Filter, CheckCircle, XCircle, Eye, Briefcase, Building2, MapPin, Clock } from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    industry: 'Technology',
    salaryMin: 120000,
    salaryMax: 150000,
    status: 'pending',
    postedDate: '2025-01-08',
    employer: 'John Smith',
    applications: 0,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'TechCorp Solutions',
    location: 'Remote',
    workType: 'remote',
    industry: 'Technology',
    salaryMin: 100000,
    salaryMax: 130000,
    status: 'approved',
    postedDate: '2025-01-06',
    employer: 'John Smith',
    applications: 23,
  },
  {
    id: '3',
    title: 'Creative Director',
    company: 'Creative Agency Inc',
    location: 'New York, NY',
    workType: 'onsite',
    industry: 'Marketing & Advertising',
    salaryMin: 90000,
    salaryMax: 120000,
    status: 'rejected',
    postedDate: '2025-01-04',
    employer: 'Sarah Johnson',
    applications: 0,
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataTech Analytics',
    location: 'Austin, TX',
    workType: 'hybrid',
    industry: 'Technology',
    salaryMin: 95000,
    salaryMax: 125000,
    status: 'pending',
    postedDate: '2025-01-02',
    employer: 'Mike Chen',
    applications: 0,
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
];

export function JobModeration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
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

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const handleApprove = (jobId: string) => {
    console.log('Approving job:', jobId);
    // Implementation would update job status
  };

  const handleReject = (jobId: string) => {
    console.log('Rejecting job:', jobId);
    // Implementation would reject job
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Moderation</h1>
          <p className="text-gray-600">Review and moderate job postings before they go live</p>
        </div>
        <Button>
          <Briefcase className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">8,934</p>
            <p className="text-sm text-gray-600">Total Jobs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">156</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8,234</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">544</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <Select
            options={industryOptions}
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            placeholder="Filter by industry"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Jobs Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Job Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location & Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Posted</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockJobs.map((job) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{job.company}</p>
                      <p className="text-sm text-gray-600">by {job.employer}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location}
                      </p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(job.workType)}`}>
                        {job.workType.charAt(0).toUpperCase() + job.workType.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">
                      {formatSalary(job.salaryMin, job.salaryMax)}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                      {job.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p className="flex items-center text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {job.postedDate}
                      </p>
                      <p className="text-gray-500">{job.applications} applications</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {job.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(job.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(job.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}