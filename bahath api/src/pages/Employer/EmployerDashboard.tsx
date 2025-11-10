import React from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  Briefcase, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp,
  Plus,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockStats = {
  totalJobs: 12,
  totalApplications: 234,
  totalViews: 1567,
  totalEngagements: 89,
};

const recentJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    applications: 45,
    views: 234,
    postedDate: '2025-01-05',
    status: 'pending_approval',
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Remote',
    applications: 67,
    views: 456,
    postedDate: '2025-01-03',
    status: 'active',
  },
  {
    id: '3',
    title: 'Backend Developer',
    location: 'Remote',
    applications: 0,
    views: 12,
    postedDate: '2025-01-09',
    status: 'pending_approval',
  },
];

const recentApplications = [
  {
    id: '1',
    candidateName: 'Alice Johnson',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '2025-01-07',
    status: 'under_review',
  },
  {
    id: '2',
    candidateName: 'Bob Smith',
    jobTitle: 'Product Manager',
    appliedDate: '2025-01-06',
    status: 'shortlisted',
  },
];

export function EmployerDashboard() {
  const getApplicationStatusBadge = (status: string) => {
    const badges = {
      applied: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your job posts and track hiring progress</p>
        </div>
        <Link to="/employer/post-job">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalJobs}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalApplications}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalViews}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Engagements</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalEngagements}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Job Posts</h3>
            <Link to="/employer/jobs">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{job.title}</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {job.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.applications} applications
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {job.views} views
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {job.postedDate}
                  </span>
                </div>
                <Link to={`/employer/jobs/${job.id}`} className="absolute inset-0"></Link>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Applications */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <Link to="/employer/applications">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{application.candidateName}</h4>
                    <p className="text-sm text-gray-600">{application.jobTitle}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getApplicationStatusBadge(application.status)}`}>
                    {application.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Applied {application.appliedDate}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}