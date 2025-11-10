import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  Heart,
  Bookmark,
  Eye,
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  User
} from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export function Dashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    likes: 0,
    favorites: 0,
    profileViews: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch applications
      const applicationsResponse = await api.get('/applications/my-applications');
      setRecentApplications(applicationsResponse.data.applications.slice(0, 5));
      
      // Calculate stats from real data
      setStats({
        applications: applicationsResponse.data.applications.length,
        likes: 0, // Would need separate API endpoint for engagement stats
        favorites: 0,
        profileViews: 0,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard data');
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your job search overview.</p>
        </div>
        <Link to="/jobs">
          <Button>
            <Briefcase className="h-4 w-4 mr-2" />
            Browse Jobs
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Liked Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.likes}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.favorites}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Bookmark className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profile Views</p>
              <p className="text-3xl font-bold text-gray-900">{stats.profileViews}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <Link to="/applications">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {recentApplications.length > 0 ? recentApplications.map((application: any) => (
              <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{application.job_title}</h4>
                    <p className="text-sm text-gray-600">{application.company_name}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(application.status)}`}>
                    {application.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {application.job_location || 'Location not specified'}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Applied {new Date(application.applied_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No applications yet</p>
                <Link to="/jobs">
                  <Button variant="outline" size="sm" className="mt-2">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/jobs" className="block">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Browse Jobs</span>
              </div>
            </Link>
            <Link to="/profile" className="block">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <User className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Update Profile</span>
              </div>
            </Link>
            <Link to="/saved-jobs" className="block">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <Bookmark className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Saved Jobs</span>
              </div>
            </Link>
            <Link to="/applications" className="block">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">My Applications</span>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}