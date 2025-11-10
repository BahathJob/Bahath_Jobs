import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  ArrowLeft, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  Bookmark,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Calendar,
  TrendingUp,
  User,
  Mail,
  Phone,
  Download,
  CheckCircle,
  XCircle,
  Edit,
  Share2,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import toast from 'react-hot-toast';
import api from '../../utils/api';

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchJobDetails();
      fetchApplications();
      fetchComments();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast.error('Failed to fetch job details');
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/applications/employer?jobId=${id}`);
      setApplications(response.data.applications || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications([]);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/admin/engagements?jobId=${id}&type=comment`);
      setComments(response.data.engagements || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setComments([]);
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

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    const updateStatus = async () => {
      try {
        await api.patch(`/applications/${applicationId}/status`, { status: newStatus });
        toast.success(`Application status updated to ${newStatus.replace('_', ' ')}`);
        fetchApplications(); // Refresh applications
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to update application status');
      }
    };

    updateStatus();
  };

  const handleEditJob = () => {
    navigate(`/employer/jobs/${id}/edit`);
  };

  const handleShareJob = () => {
    const jobUrl = `${window.location.origin}/jobs/${id}`;
    navigator.clipboard.writeText(jobUrl);
    toast.success('Job URL copied to clipboard!');
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
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6">
        <Card className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Job not found</h3>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/employer/jobs')}>Back to My Jobs</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate('/employer/jobs')}
        className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 px-3 py-1.5 text-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to My Jobs
      </button>

      {/* Job Header */}
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
              <span className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {job.company_name}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Posted {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${getWorkTypeBadge(job.work_type)}`}>
                {job.work_type ? job.work_type.charAt(0).toUpperCase() + job.work_type.slice(1) : 'N/A'}
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                {job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1)} Level
              </span>
              <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                {job.industry}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleShareJob}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleEditJob}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Link to={`/jobs/${job.id}`} target="_blank">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Public
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Eye className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{job.stats?.views || 0}</p>
            <p className="text-sm text-gray-600">Views</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{applications.length}</p>
            <p className="text-sm text-gray-600">Applications</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{job.stats?.likes || 0}</p>
            <p className="text-sm text-gray-600">Likes</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Bookmark className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{job.stats?.bookmarks || 0}</p>
            <p className="text-sm text-gray-600">Bookmarks</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'applications', label: `Applications (${applications.length})`, icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'comments', label: `Comments (${comments.length})`, icon: MessageCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h3>
              <div className="space-y-2">
                {job.responsibilities.split('\n').map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-2">
                {job.requirements.split('\n').map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Job Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range</span>
                  <span className="font-medium">
                    {job.salary_min && job.salary_max ? 
                      `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}` : 
                      'Not specified'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Type</span>
                  <span className="font-medium capitalize">{job.work_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{job.seniority} Level</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                {job.deadline && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Rate</span>
                  <span className="font-medium">3.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Daily Views</span>
                  <span className="font-medium">176</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-medium">7.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time to Fill</span>
                  <span className="font-medium">18 days</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-4">
          {applications.map((application: any) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.first_name} {application.last_name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {application.email}
                          </span>
                          <span className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {application.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(application.status)}`}>
                      {application.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-gray-700 text-sm">{application.cover_note || 'No cover note provided'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Experience:</span> {application.experience}
                    </div>
                    <div>
                      <span className="font-medium">Education:</span> {application.education}
                    </div>
                  </div>

                  {application.skills && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {JSON.parse(application.skills || '[]').map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    Applied on {new Date(application.applied_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {application.resume_url ? (
                    <a href={application.resume_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                    </a>
                  ) : (
                    <Button variant="ghost" size="sm" disabled>
                      <Download className="h-4 w-4 mr-1" />
                      No Resume
                    </Button>
                  )}
                  {application.status === 'applied' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusChange(application.id, 'under_review')}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  )}
                  {application.status === 'under_review' && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange(application.id, 'shortlisted')}
                      >
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        Shortlist
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange(application.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 text-red-600 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  {application.status === 'shortlisted' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusChange(application.id, 'hired')}
                    >
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-1" />
                      Hire
                    </Button>
                  )}
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {applications.length === 0 && (
            <Card className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">Applications will appear here when candidates apply for this job</p>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{job.stats?.views || 0}</p>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-xs text-green-600 mt-1">+12% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{applications.length}</p>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-xs text-green-600 mt-1">+8% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{job.stats?.likes || 0}</p>
                <p className="text-sm text-gray-600">Likes</p>
                <p className="text-xs text-green-600 mt-1">+15% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {job.stats?.views ? ((applications.length / job.stats.views) * 100).toFixed(1) : 0}%
                </p>
                <p className="text-sm text-gray-600">Application Rate</p>
                <p className="text-xs text-green-600 mt-1">Above average</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views to Applications</span>
                  <span className="font-medium">
                    {job.stats?.views ? ((applications.length / job.stats.views) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Likes to Applications</span>
                  <span className="font-medium">
                    {job.stats?.likes && applications.length ? ((applications.length / job.stats.likes) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bookmarks to Applications</span>
                  <span className="font-medium">
                    {job.stats?.bookmarks && applications.length ? ((applications.length / job.stats.bookmarks) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Comments to Applications</span>
                  <span className="font-medium">
                    {comments.length && applications.length ? ((applications.length / comments.length) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Applications</span>
                  <span className="font-medium">{applications.filter((app: any) => app.status === 'applied').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Under Review</span>
                  <span className="font-medium">{applications.filter((app: any) => app.status === 'under_review').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shortlisted</span>
                  <span className="font-medium">{applications.filter((app: any) => app.status === 'shortlisted').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hired</span>
                  <span className="font-medium">{applications.filter((app: any) => app.status === 'hired').length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="space-y-4">
          {comments.map((comment: any) => (
            <Card key={comment.id}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{comment.first_name} {comment.last_name}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}

          {comments.length === 0 && (
            <Card className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No comments yet</h3>
              <p className="text-gray-600">Comments from job seekers will appear here</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}