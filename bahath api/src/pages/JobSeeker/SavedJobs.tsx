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
  Bookmark,
  Heart,
  Eye,
  Briefcase
} from 'lucide-react';

const mockSavedJobs = [
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
    savedAt: '2025-01-08T10:30:00Z',
    type: 'favorite', // favorite or bookmark
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'TechCorp Solutions',
    location: 'Remote',
    workType: 'remote',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 100000,
    salaryMax: 130000,
    savedAt: '2025-01-07T15:20:00Z',
    type: 'bookmark',
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
    savedAt: '2025-01-06T09:45:00Z',
    type: 'favorite',
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataTech Analytics',
    location: 'Austin, TX',
    workType: 'hybrid',
    seniority: 'mid',
    industry: 'Technology',
    salaryMin: 95000,
    salaryMax: 125000,
    savedAt: '2025-01-05T14:10:00Z',
    type: 'bookmark',
  },
];

const typeOptions = [
  { value: '', label: 'All Saved Jobs' },
  { value: 'favorite', label: 'Liked Jobs' },
  { value: 'bookmark', label: 'Bookmarked Jobs' },
];

const industryOptions = [
  { value: '', label: 'All Industries' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
];

export function SavedJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

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

  const handleRemove = (jobId: string) => {
    console.log('Removing saved job:', jobId);
    // Implementation would remove job from saved list
  };

  const filteredJobs = mockSavedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    const matchesIndustry = !industryFilter || job.industry === industryFilter;
    
    return matchesSearch && matchesType && matchesIndustry;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-600">Jobs you've liked or bookmarked for later review</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{mockSavedJobs.length}</p>
            <p className="text-sm text-gray-600">Total Saved</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {mockSavedJobs.filter(job => job.type === 'favorite').length}
            </p>
            <p className="text-sm text-gray-600">Liked Jobs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {mockSavedJobs.filter(job => job.type === 'bookmark').length}
            </p>
            <p className="text-sm text-gray-600">Bookmarked</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            placeholder="Filter by type"
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
                  <div className="flex items-center space-x-2">
                    {job.type === 'favorite' ? (
                      <Heart className="h-5 w-5 text-red-500 fill-current" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-blue-500 fill-current" />
                    )}
                  </div>
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
                    Saved {new Date(job.savedAt).toLocaleDateString()}
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
                  onClick={() => handleRemove(job.id)}
                >
                  Remove
                </Button>
                <Button size="sm">
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && mockSavedJobs.length > 0 && (
        <Card className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs match your filters</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
          <Button onClick={() => {
            setSearchTerm('');
            setTypeFilter('');
            setIndustryFilter('');
          }}>
            Clear Filters
          </Button>
        </Card>
      )}

      {mockSavedJobs.length === 0 && (
        <Card className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
          <p className="text-gray-600 mb-4">Start browsing jobs and save the ones you're interested in</p>
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