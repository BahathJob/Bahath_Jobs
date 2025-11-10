import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Heart,
  Eye,
  Briefcase
} from 'lucide-react';

const mockLikedJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    workType: 'hybrid',
    seniority: 'senior',
    industry: 'Technology',
    salaryMin: 120000,
    salaryMax: 150000,
    likedAt: '2025-01-08T10:30:00Z',
    description: 'We are looking for a talented Senior Frontend Developer to join our growing engineering team.',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Design Studio Pro',
    location: 'Los Angeles, CA',
    workType: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 80000,
    salaryMax: 110000,
    likedAt: '2025-01-06T09:45:00Z',
    description: 'Create intuitive and beautiful user experiences for our digital products.',
  },
  {
    id: '5',
    title: 'Marketing Manager',
    company: 'Growth Marketing Co',
    location: 'Chicago, IL',
    workType: 'onsite',
    seniority: 'mid',
    industry: 'Marketing & Advertising',
    salaryMin: 70000,
    salaryMax: 95000,
    likedAt: '2025-01-04T16:20:00Z',
    description: 'Develop and execute marketing strategies to drive brand awareness and growth.',
  },
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
];

const workTypeOptions = [
  { value: '', label: 'All Work Types' },
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
];

export function LikedJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('');

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

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const handleUnlike = (jobId: string) => {
    console.log('Unliking job:', jobId);
    // Implementation would remove job from liked list
  };

  const filteredJobs = mockLikedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !industryFilter || job.industry === industryFilter;
    const matchesWorkType = !workTypeFilter || job.workType === workTypeFilter;
    
    return matchesSearch && matchesIndustry && matchesWorkType;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Liked Jobs</h1>
        <p className="text-gray-600">Jobs you've shown interest in by liking them</p>
      </div>

      {/* Stats Card */}
      <Card className="mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <p className="text-3xl font-bold text-gray-900">{mockLikedJobs.length}</p>
          </div>
          <p className="text-gray-600">Jobs you've liked</p>
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search liked jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            options={industryOptions}
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            placeholder="Filter by industry"
          />
          <Select
            options={workTypeOptions}
            value={workTypeFilter}
            onChange={(e) => setWorkTypeFilter(e.target.value)}
            placeholder="Filter by work type"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(job.workType)}`}>
                          {job.workType.charAt(0).toUpperCase() + job.workType.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getSeniorityBadge(job.seniority)}`}>
                          {job.seniority.charAt(0).toUpperCase() + job.seniority.slice(1)} Level
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {job.industry}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </div>

                <div className="mb-3">
                  <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Liked {new Date(job.likedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <Link to={`/jobs/${job.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Job
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleUnlike(job.id)}
                >
                  <Heart className="h-4 w-4 mr-1 text-red-500" />
                  Unlike
                </Button>
                <Button size="sm">
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && mockLikedJobs.length > 0 && (
        <Card className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
          <Button onClick={() => {
            setSearchTerm('');
            setIndustryFilter('');
            setWorkTypeFilter('');
          }}>
            Clear Filters
          </Button>
        </Card>
      )}

      {mockLikedJobs.length === 0 && (
        <Card className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No liked jobs yet</h3>
          <p className="text-gray-600 mb-4">Start browsing jobs and like the ones you're interested in</p>
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