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

const mockJobDetails = {
  '1': {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for a talented Senior Frontend Developer to join our growing engineering team. You will be responsible for building modern, responsive web applications using React and TypeScript.',
    responsibilities: 'Develop and maintain frontend applications\nCollaborate with design and backend teams\nWrite clean, maintainable code\nMentor junior developers\nOptimize application performance',
    requirements: 'Bachelor\'s degree in Computer Science or related field\n5+ years of experience with React and TypeScript\nProficiency in modern JavaScript (ES6+)\nExperience with state management (Redux, Zustand)',
    benefits: 'Competitive salary and equity package\nHealth, dental, and vision insurance\nFlexible work hours and remote options\nProfessional development budget',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    seniority: 'senior',
    industry: 'Technology',
    salaryMin: 120000,
    salaryMax: 150000,
    currency: 'USD',
    status: 'active',
    isApproved: true,
    createdAt: '2025-01-05T10:00:00Z',
    deadline: '2025-02-05',
    companyName: 'TechCorp Solutions',
    stats: {
      views: 1234,
      applications: 45,
      likes: 89,
      comments: 12,
      bookmarks: 34,
      interests: 23,
    },
    dailyViews: [
      { date: '2025-01-01', views: 45, applications: 3 },
      { date: '2025-01-02', views: 67, applications: 5 },
      { date: '2025-01-03', views: 89, applications: 7 },
      { date: '2025-01-04', views: 123, applications: 9 },
      { date: '2025-01-05', views: 156, applications: 12 },
      { date: '2025-01-06', views: 178, applications: 8 },
      { date: '2025-01-07', views: 201, applications: 6 },
    ],
    applications: [
      {
        id: 'app1',
        candidateName: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1-555-123-4567',
        appliedAt: '2025-01-07T10:30:00Z',
        status: 'under_review',
        coverNote: 'I am very excited about this opportunity to work with TechCorp Solutions. My experience with React and TypeScript aligns perfectly with your requirements.',
        experience: '4 years of frontend development',
        education: 'Bachelor\'s in Computer Science',
        skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
        resumeUrl: '/resumes/alice-johnson.pdf',
      },
      {
        id: 'app2',
        candidateName: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1-555-987-6543',
        appliedAt: '2025-01-06T15:20:00Z',
        status: 'shortlisted',
        coverNote: 'I believe my full-stack experience would be valuable for this frontend role.',
        experience: '6 years of full-stack development',
        education: 'Master\'s in Software Engineering',
        skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
        resumeUrl: '/resumes/bob-smith.pdf',
      },
      {
        id: 'app3',
        candidateName: 'Carol Davis',
        email: 'carol@example.com',
        phone: '+1-555-456-7890',
        appliedAt: '2025-01-05T09:45:00Z',
        status: 'applied',
        coverNote: 'I am interested in this position and believe my skills would be a great fit.',
        experience: '3 years of frontend development',
        education: 'Bachelor\'s in Computer Science',
        skills: ['React', 'Vue.js', 'JavaScript', 'CSS'],
        resumeUrl: '/resumes/carol-davis.pdf',
      },
    ],
    comments: [
      {
        id: 'comment1',
        author: 'David Wilson',
        content: 'This looks like a great opportunity! The company culture seems amazing.',
        createdAt: '2025-01-06T14:20:00Z',
        status: 'approved',
      },
      {
        id: 'comment2',
        author: 'Emma Brown',
        content: 'What are the specific React frameworks you use? Any experience with Next.js required?',
        createdAt: '2025-01-05T11:15:00Z',
        status: 'approved',
      },
    ]
  },
  '2': {
    id: '2',
    title: 'Product Manager',
    description: 'Join our product team as a Product Manager to drive the development of innovative features that delight our customers.',
    responsibilities: 'Define product vision and strategy\nWork with engineering and design teams\nConduct market research and user interviews\nManage product roadmap and priorities',
    requirements: 'Bachelor\'s degree in Business, Engineering, or related field\n3+ years of product management experience\nExperience with Agile methodologies\nStrong analytical and communication skills',
    benefits: 'Competitive salary and bonuses\nStock options\nHealth and wellness benefits\nFlexible PTO policy',
    location: 'Remote',
    workType: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 100000,
    salaryMax: 130000,
    currency: 'USD',
    status: 'active',
    isApproved: true,
    createdAt: '2025-01-03T10:00:00Z',
    deadline: '2025-02-03',
    companyName: 'TechCorp Solutions',
    stats: {
      views: 987,
      applications: 67,
      likes: 56,
      comments: 8,
      bookmarks: 23,
      interests: 34,
    },
    dailyViews: [
      { date: '2025-01-01', views: 34, applications: 4 },
      { date: '2025-01-02', views: 56, applications: 6 },
      { date: '2025-01-03', views: 78, applications: 8 },
      { date: '2025-01-04', views: 98, applications: 11 },
      { date: '2025-01-05', views: 134, applications: 15 },
      { date: '2025-01-06', views: 167, applications: 12 },
      { date: '2025-01-07', views: 189, applications: 11 },
    ],
    applications: [
      {
        id: 'app4',
        candidateName: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+1-555-234-5678',
        appliedAt: '2025-01-06T11:15:00Z',
        status: 'shortlisted',
        coverNote: 'I have extensive product management experience and would love to contribute to your team.',
        experience: '5 years of product management',
        education: 'MBA in Business Administration',
        skills: ['Product Management', 'Agile', 'Analytics', 'Leadership'],
        resumeUrl: '/resumes/sarah-wilson.pdf',
      },
    ],
    comments: []
  }
};

export function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const jobData = mockJobDetails[id as keyof typeof mockJobDetails];
      if (jobData) {
        setJob(jobData);
      } else {
        setJob(null);
      }
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast.error('Failed to fetch job details');
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

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    console.log('Changing application status:', applicationId, 'to:', newStatus);
    toast.success(`Application status updated to ${newStatus.replace('_', ' ')}`);
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
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
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
                {job.companyName}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 text-sm rounded-full ${getWorkTypeBadge(job.workType)}`}>
                {job.workType.charAt(0).toUpperCase() + job.workType.slice(1)}
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
            <p className="text-2xl font-bold text-blue-600">{job.stats.views}</p>
            <p className="text-sm text-gray-600">Views</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{job.stats.applications}</p>
            <p className="text-sm text-gray-600">Applications</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{job.stats.likes}</p>
            <p className="text-sm text-gray-600">Likes</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Bookmark className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{job.stats.bookmarks}</p>
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
              { id: 'applications', label: `Applications (${job.stats.applications})`, icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'comments', label: `Comments (${job.stats.comments})`, icon: MessageCircle },
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
                    ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Type</span>
                  <span className="font-medium capitalize">{job.workType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{job.seniority} Level</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">{job.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
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
          {job.applications.map((application: any) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
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
                    <p className="text-gray-700 text-sm">{application.coverNote}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Experience:</span> {application.experience}
                    </div>
                    <div>
                      <span className="font-medium">Education:</span> {application.education}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {application.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Applied on {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
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

          {job.applications.length === 0 && (
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
                <p className="text-2xl font-bold text-blue-600">{job.stats.views}</p>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-xs text-green-600 mt-1">+12% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{job.stats.applications}</p>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-xs text-green-600 mt-1">+8% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{job.stats.likes}</p>
                <p className="text-sm text-gray-600">Likes</p>
                <p className="text-xs text-green-600 mt-1">+15% this week</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">3.6%</p>
                <p className="text-sm text-gray-600">Application Rate</p>
                <p className="text-xs text-green-600 mt-1">Above average</p>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={job.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={3} name="Views" />
                <Line type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={3} name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views to Applications</span>
                  <span className="font-medium">3.6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Likes to Applications</span>
                  <span className="font-medium">50.6%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Bookmarks to Applications</span>
                  <span className="font-medium">132.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Comments to Applications</span>
                  <span className="font-medium">375%</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Applications</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Under Review</span>
                  <span className="font-medium">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shortlisted</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hired</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="space-y-4">
          {job.comments.map((comment: any) => (
            <Card key={comment.id}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{comment.author}</h4>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}

          {job.comments.length === 0 && (
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