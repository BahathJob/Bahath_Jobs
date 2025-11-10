import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Briefcase, Building2, ArrowLeft } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const industryOptions = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Education', label: 'Education' },
  { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
];

const workTypeOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
];

const seniorityOptions = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'executive', label: 'Executive' },
];

const educationOptions = [
  { value: 'High School', label: 'High School' },
  { value: 'Associate Degree', label: 'Associate Degree' },
  { value: 'Bachelor\'s Degree', label: 'Bachelor\'s Degree' },
  { value: 'Master\'s Degree', label: 'Master\'s Degree' },
  { value: 'PhD', label: 'PhD' },
];

export function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    location: '',
    workType: 'remote',
    industry: 'Technology',
    education: 'Bachelor\'s Degree',
    visaEligible: false,
    seniority: 'mid',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    deadline: '',
  });

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setCompanyLoading(true);
      const response = await api.get('/companies/me');
      setCompany(response.data);
    } catch (error) {
      console.error('Failed to fetch company profile:', error);
      setCompany(null);
    } finally {
      setCompanyLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Job title is required');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Job description is required');
      return;
    }

    if (!formData.responsibilities.trim()) {
      toast.error('Job responsibilities are required');
      return;
    }

    if (!formData.requirements.trim()) {
      toast.error('Job requirements are required');
      return;
    }

    if (!formData.location.trim()) {
      toast.error('Job location is required');
      return;
    }

    setLoading(true);

    try {
      const jobData = {
        ...formData,
        salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : undefined,
      };

      await api.post('/jobs', jobData);
      
      toast.success('Job posted successfully! It will be reviewed by our team.');
      navigate('/employer/jobs');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (companyLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6">
        <Card className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Profile Required</h3>
          <p className="text-gray-600 mb-4">You need to create and get approval for your company profile before posting jobs.</p>
          <Button onClick={() => navigate('/employer/profile')}>
            Create Company Profile
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/employer')}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600">Create an attractive job posting to find the perfect candidate</p>
      </div>

      {company && !company.is_approved && (
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Building2 className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-yellow-800">Company Approval Pending</p>
              <p className="text-sm text-yellow-700">Your company profile is under review. You can create job drafts, but they won't be published until your company is approved.</p>
            </div>
          </div>
        </Card>
      )}

      {company && company.is_approved && (
        <Card className="mb-6 bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">Company Approved</p>
              <p className="text-sm text-green-700">Your company profile is approved. You can post jobs that will be visible after review.</p>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Developer"
                required
              />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                required
              />
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role and what the candidate will be doing..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List the key responsibilities for this role..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="List the skills, experience, and qualifications required..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits (Optional)
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the benefits and perks offered..."
                />
              </div>
            </div>
          </div>

          {/* Job Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Work Type"
                name="workType"
                options={workTypeOptions}
                value={formData.workType}
                onChange={handleChange}
                required
              />
              <Select
                label="Industry"
                name="industry"
                options={industryOptions}
                value={formData.industry}
                onChange={handleChange}
                required
              />
              <Select
                label="Education Level"
                name="education"
                options={educationOptions}
                value={formData.education}
                onChange={handleChange}
                required
              />
              <Select
                label="Seniority Level"
                name="seniority"
                options={seniorityOptions}
                value={formData.seniority}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="visaEligible"
                checked={formData.visaEligible}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                This position is eligible for visa sponsorship
              </label>
            </div>
          </div>

          {/* Compensation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compensation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Minimum Salary"
                name="salaryMin"
                type="number"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="80000"
              />
              <Input
                label="Maximum Salary"
                name="salaryMax"
                type="number"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="120000"
              />
              <Select
                label="Currency"
                name="currency"
                options={[
                  { value: 'USD', label: 'USD' },
                  { value: 'EUR', label: 'EUR' },
                  { value: 'GBP', label: 'GBP' },
                ]}
                value={formData.currency}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <Input
              label="Application Deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button variant="ghost" onClick={() => navigate('/employer')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Posting Job...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}