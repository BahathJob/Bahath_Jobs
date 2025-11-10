import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Eye, Building2 } from 'lucide-react';

const mockEmployers = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    contactName: 'John Smith',
    email: 'john@techcorp.com',
    phone: '+1-555-123-4567',
    industry: 'Technology',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    status: 'approved',
    joinDate: '2024-12-15',
    jobsPosted: 12,
    activeJobs: 8,
  },
  {
    id: '2',
    companyName: 'Creative Agency Inc',
    contactName: 'Sarah Johnson',
    email: 'sarah@creative-agency.com',
    phone: '+1-555-987-6543',
    industry: 'Marketing & Advertising',
    location: 'New York, NY',
    website: 'https://creative-agency.com',
    status: 'pending',
    joinDate: '2024-12-20',
    jobsPosted: 0,
    activeJobs: 0,
  },
  {
    id: '3',
    companyName: 'HealthTech Innovations',
    contactName: 'Dr. Michael Chen',
    email: 'michael@healthtech.com',
    phone: '+1-555-456-7890',
    industry: 'Healthcare',
    location: 'Boston, MA',
    website: 'https://healthtech.com',
    status: 'approved',
    joinDate: '2024-11-10',
    jobsPosted: 6,
    activeJobs: 4,
  },
  {
    id: '4',
    companyName: 'FinanceFirst Corp',
    contactName: 'Emily Rodriguez',
    email: 'emily@financefirst.com',
    phone: '+1-555-321-0987',
    industry: 'Finance',
    location: 'Chicago, IL',
    website: 'https://financefirst.com',
    status: 'suspended',
    joinDate: '2024-10-05',
    jobsPosted: 3,
    activeJobs: 0,
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
];

export function EmployerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };
    
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const handleApprove = (employerId: string) => {
    console.log('Approving employer:', employerId);
    // Implementation would update employer status
  };

  const handleSuspend = (employerId: string) => {
    console.log('Suspending employer:', employerId);
    // Implementation would suspend employer
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Management</h1>
          <p className="text-gray-600">Manage employer accounts and company profiles</p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">2,456</p>
            <p className="text-sm text-gray-600">Total Employers</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">2,234</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">156</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">66</p>
            <p className="text-sm text-gray-600">Suspended</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employers..."
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

      {/* Employers Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Jobs</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEmployers.map((employer) => (
                <tr key={employer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{employer.companyName}</p>
                        <p className="text-sm text-gray-600">{employer.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{employer.contactName}</p>
                      <p className="text-sm text-gray-600">{employer.email}</p>
                      <p className="text-sm text-gray-600">{employer.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {employer.industry}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(employer.status)}`}>
                      {employer.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p className="font-medium">{employer.activeJobs} active</p>
                      <p className="text-gray-600">{employer.jobsPosted} total</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{employer.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {employer.status === 'pending' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleApprove(employer.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {employer.status === 'approved' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleSuspend(employer.id)}
                        >
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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