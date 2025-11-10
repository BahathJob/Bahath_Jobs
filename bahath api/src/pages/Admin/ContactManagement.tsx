import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  User,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Reply,
  Building2,
  Heart,
  Handshake
} from 'lucide-react';

const mockContactData = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    inquiryType: 'job_seeker',
    subject: 'Unable to upload resume',
    message: 'I\'m having trouble uploading my resume to my profile. The file is a PDF and under 10MB but it keeps failing. Can you please help?',
    status: 'pending',
    priority: 'medium',
    createdAt: '2025-01-08T10:30:00Z',
    respondedAt: null,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@techcorp.com',
    inquiryType: 'employer',
    subject: 'Company approval status',
    message: 'Hi, I submitted my company profile for approval 5 days ago. Could you please let me know the status? We\'re eager to start posting jobs.',
    status: 'responded',
    priority: 'high',
    createdAt: '2025-01-07T15:20:00Z',
    respondedAt: '2025-01-07T16:45:00Z',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    inquiryType: 'technical',
    subject: 'Login issues',
    message: 'I can\'t log into my account. I keep getting an "invalid credentials" error even though I\'m sure my password is correct. I tried resetting it but didn\'t receive the email.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-01-06T09:15:00Z',
    respondedAt: null,
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@startup.com',
    inquiryType: 'partnership',
    subject: 'Partnership opportunity',
    message: 'We\'re a recruiting agency interested in partnering with BAHATH JOBZ. We have access to high-quality candidates and would like to discuss potential collaboration opportunities.',
    status: 'pending',
    priority: 'low',
    createdAt: '2025-01-05T14:10:00Z',
    respondedAt: null,
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    inquiryType: 'feedback',
    subject: 'Great platform!',
    message: 'I just wanted to say thank you for creating such an amazing job platform. I found my dream job through BAHATH JOBZ within 2 weeks of signing up. The interface is intuitive and the job matching is excellent.',
    status: 'responded',
    priority: 'low',
    createdAt: '2025-01-04T11:30:00Z',
    respondedAt: '2025-01-04T12:15:00Z',
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'responded', label: 'Responded' },
  { value: 'closed', label: 'Closed' },
];

const inquiryTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'job_seeker', label: 'Job Seeker Support' },
  { value: 'employer', label: 'Employer Support' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'feedback', label: 'Feedback' },
];

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [inquiryTypeFilter, setInquiryTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      responded: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return badges[priority as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getInquiryTypeIcon = (type: string) => {
    const icons = {
      general: MessageCircle,
      job_seeker: User,
      employer: Building2,
      technical: AlertCircle,
      partnership: Handshake,
      feedback: Heart,
    };
    return icons[type as keyof typeof icons] || MessageCircle;
  };

  const handleStatusChange = (contactId: string, newStatus: string) => {
    console.log('Changing contact status:', contactId, 'to:', newStatus);
    // Implementation would update contact status
  };

  const filteredContacts = mockContactData.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || contact.status === statusFilter;
    const matchesType = !inquiryTypeFilter || contact.inquiryType === inquiryTypeFilter;
    const matchesPriority = !priorityFilter || contact.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
          <p className="text-gray-600">Manage user inquiries and support requests</p>
        </div>
        <Button>
          <Mail className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{mockContactData.length}</p>
            <p className="text-sm text-gray-600">Total Inquiries</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {mockContactData.filter(c => c.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {mockContactData.filter(c => c.status === 'in_progress').length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {mockContactData.filter(c => c.status === 'responded').length}
            </p>
            <p className="text-sm text-gray-600">Responded</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inquiries..."
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
            options={inquiryTypeOptions}
            value={inquiryTypeFilter}
            onChange={(e) => setInquiryTypeFilter(e.target.value)}
            placeholder="Filter by type"
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            placeholder="Filter by priority"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Contact Inquiries List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => {
          const TypeIcon = getInquiryTypeIcon(contact.inquiryType);
          return (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <TypeIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(contact.status)}`}>
                            {contact.status.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(contact.priority)}`}>
                            {contact.priority.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {contact.inquiryType.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 mb-1">{contact.subject}</h4>
                    <p className="text-gray-700 text-sm line-clamp-2">{contact.message}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                      {contact.respondedAt && (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Responded {new Date(contact.respondedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {contact.status === 'pending' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusChange(contact.id, 'in_progress')}
                    >
                      <Clock className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {['pending', 'in_progress'].includes(contact.status) && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusChange(contact.id, 'responded')}
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="text-center py-12">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No contact inquiries found</h3>
          <p className="text-gray-600">
            {mockContactData.length === 0 ? 'No contact inquiries have been submitted yet' : 'Try adjusting your search criteria'}
          </p>
        </Card>
      )}
    </div>
  );
}