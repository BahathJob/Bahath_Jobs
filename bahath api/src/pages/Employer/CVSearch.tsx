import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Search, 
  Filter, 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Download
} from 'lucide-react';

const mockCandidates = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    phone: '+1-555-123-4567',
    location: 'San Francisco, CA',
    summary: 'Passionate frontend developer with 4 years of experience building modern web applications. Love working with React, TypeScript, and creating beautiful user interfaces.',
    experience: '4 years of frontend development experience',
    education: 'Bachelor\'s in Computer Science',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Git'],
    visaStatus: 'Citizen',
    availability: 'Immediately',
    portfolioUrl: 'https://alicejohnson.dev',
    linkedinUrl: 'https://linkedin.com/in/alicejohnson',
    resumeUrl: '/resumes/alice-johnson.pdf',
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    phone: '+1-555-987-6543',
    location: 'Austin, TX',
    summary: 'Full-stack developer with expertise in both frontend and backend technologies. Experienced in building scalable web applications and RESTful APIs.',
    experience: '6 years of full-stack development experience',
    education: 'Master\'s in Software Engineering',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    visaStatus: 'H1B',
    availability: '2 weeks notice',
    portfolioUrl: 'https://bobsmith.dev',
    linkedinUrl: 'https://linkedin.com/in/bobsmith',
    resumeUrl: '/resumes/bob-smith.pdf',
  },
  {
    id: '3',
    firstName: 'Carol',
    lastName: 'Davis',
    email: 'carol@example.com',
    phone: '+1-555-456-7890',
    location: 'New York, NY',
    summary: 'Senior product manager with 8 years of experience leading cross-functional teams and delivering successful products. Expert in agile methodologies and user-centered design.',
    experience: '8 years of product management experience',
    education: 'MBA in Business Administration',
    skills: ['Product Management', 'Agile', 'Scrum', 'User Research', 'Analytics', 'Roadmapping', 'Leadership'],
    visaStatus: 'Green Card',
    availability: '1 month',
    portfolioUrl: 'https://caroldavis.com',
    linkedinUrl: 'https://linkedin.com/in/caroldavis',
    resumeUrl: '/resumes/carol-davis.pdf',
  },
];

const locationOptions = [
  { value: '', label: 'All Locations' },
  { value: 'San Francisco', label: 'San Francisco, CA' },
  { value: 'New York', label: 'New York, NY' },
  { value: 'Austin', label: 'Austin, TX' },
  { value: 'Remote', label: 'Remote' },
];

const educationOptions = [
  { value: '', label: 'All Education Levels' },
  { value: 'High School', label: 'High School' },
  { value: 'Associate', label: 'Associate Degree' },
  { value: 'Bachelor', label: 'Bachelor\'s Degree' },
  { value: 'Master', label: 'Master\'s Degree' },
  { value: 'PhD', label: 'PhD' },
];

const visaStatusOptions = [
  { value: '', label: 'All Visa Status' },
  { value: 'Citizen', label: 'Citizen' },
  { value: 'Green Card', label: 'Green Card' },
  { value: 'H1B', label: 'H1B' },
  { value: 'L1', label: 'L1' },
  { value: 'F1 (OPT)', label: 'F1 (OPT)' },
];

export function CVSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [educationFilter, setEducationFilter] = useState('');
  const [visaStatusFilter, setVisaStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const getVisaStatusBadge = (visaStatus: string) => {
    const badges = {
      'Citizen': 'bg-green-100 text-green-800',
      'Green Card': 'bg-blue-100 text-blue-800',
      'H1B': 'bg-purple-100 text-purple-800',
      'L1': 'bg-orange-100 text-orange-800',
      'F1 (OPT)': 'bg-yellow-100 text-yellow-800',
    };
    return badges[visaStatus as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CV Search</h1>
        <p className="text-gray-600">Search and discover talented candidates for your open positions</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by skills, experience, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Select
                options={locationOptions}
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="Location"
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
            <p className="text-sm text-gray-600">{mockCandidates.length} candidates found</p>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <Select
                options={educationOptions}
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
                placeholder="Education Level"
              />
              <Select
                options={visaStatusOptions}
                value={visaStatusFilter}
                onChange={(e) => setVisaStatusFilter(e.target.value)}
                placeholder="Visa Status"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Candidates List */}
      <div className="space-y-6">
        {mockCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {candidate.firstName} {candidate.lastName}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {candidate.location}
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Available {candidate.availability}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getVisaStatusBadge(candidate.visaStatus)}`}>
                  {candidate.visaStatus}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-3">{candidate.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  {candidate.education}
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {candidate.experience}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <a
                  href={`mailto:${candidate.email}`}
                  className="flex items-center hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {candidate.email}
                </a>
                <a
                  href={`tel:${candidate.phone}`}
                  className="flex items-center hover:text-blue-600"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {candidate.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                {candidate.portfolioUrl && (
                  <a
                    href={candidate.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Button variant="ghost" size="sm">
                      <Globe className="h-4 w-4 mr-1" />
                      Portfolio
                    </Button>
                  </a>
                )}
                {candidate.linkedinUrl && (
                  <a
                    href={candidate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                  </a>
                )}
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Resume
                </Button>
                <Button size="sm">
                  Contact
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {mockCandidates.length === 0 && (
        <Card className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
          <Button onClick={() => {
            setSearchTerm('');
            setLocationFilter('');
            setEducationFilter('');
            setVisaStatusFilter('');
          }}>
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}