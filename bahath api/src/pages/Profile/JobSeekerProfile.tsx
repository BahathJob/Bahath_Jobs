import React, { useState, useEffect } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { User, Upload, Save, Plus, X } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const availabilityOptions = [
  { value: 'Immediately', label: 'Immediately' },
  { value: '1 week', label: '1 week' },
  { value: '2 weeks', label: '2 weeks' },
  { value: '1 month', label: '1 month' },
  { value: '2-3 months', label: '2-3 months' },
];

const educationOptions = [
  { value: 'High School', label: 'High School' },
  { value: 'Associate Degree', label: 'Associate Degree' },
  { value: 'Bachelor\'s Degree', label: 'Bachelor\'s Degree' },
  { value: 'Master\'s Degree', label: 'Master\'s Degree' },
  { value: 'PhD', label: 'PhD' },
];

const visaStatusOptions = [
  { value: 'Citizen', label: 'Citizen' },
  { value: 'Green Card', label: 'Green Card' },
  { value: 'H1B', label: 'H1B' },
  { value: 'L1', label: 'L1' },
  { value: 'F1 (OPT)', label: 'F1 (OPT)' },
  { value: 'Other', label: 'Other' },
];

export function JobSeekerProfile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    summary: '',
    availability: 'Immediately',
    education: 'Bachelor\'s Degree',
    experience: '',
    skills: [] as string[],
    location: '',
    visaStatus: 'Citizen',
    portfolioUrl: '',
    linkedinUrl: '',
  });
  const [newSkill, setNewSkill] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/job-seeker/me');
      setProfile(response.data);
    } catch (error) {
      // Profile doesn't exist yet, that's okay
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('File size must be less than 10MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Add profile data
      Object.entries(profile).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      });

      // Add resume if selected
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      await api.post('/profiles/job-seeker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Complete your profile to attract potential employers</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Summary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About You
              </label>
              <textarea
                name="summary"
                value={profile.summary}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a brief summary about your professional background, skills, and career goals..."
              />
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Availability"
                name="availability"
                options={availabilityOptions}
                value={profile.availability}
                onChange={handleChange}
                required
              />
              <Input
                label="Location"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                required
              />
              <Select
                label="Education Level"
                name="education"
                options={educationOptions}
                value={profile.education}
                onChange={handleChange}
                required
              />
              <Select
                label="Visa Status"
                name="visaStatus"
                options={visaStatusOptions}
                value={profile.visaStatus}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your work experience, previous roles, and achievements..."
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a skill (e.g., React, Python, Project Management)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF, DOC, DOCX)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {resumeFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Portfolio URL"
                name="portfolioUrl"
                type="url"
                value={profile.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
              <Input
                label="LinkedIn URL"
                name="linkedinUrl"
                type="url"
                value={profile.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="submit" disabled={loading} className="flex items-center">
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}