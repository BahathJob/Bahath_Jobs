import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { Search, Filter, CheckCircle, XCircle, Eye, MessageCircle, User, Flag } from 'lucide-react';

const mockComments = [
  {
    id: '1',
    content: 'This looks like a great opportunity! The company culture seems amazing and the role aligns perfectly with my career goals.',
    author: 'Alice Johnson',
    authorEmail: 'alice@example.com',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    status: 'approved',
    createdAt: '2025-01-08T10:30:00Z',
    reports: 0,
  },
  {
    id: '2',
    content: 'I applied for this position last week. When can I expect to hear back? The job description mentions remote work but the location says onsite.',
    author: 'Bob Smith',
    authorEmail: 'bob@example.com',
    jobTitle: 'Product Manager',
    company: 'TechCorp Solutions',
    status: 'pending',
    createdAt: '2025-01-07T15:45:00Z',
    reports: 1,
  },
  {
    id: '3',
    content: 'This company is terrible to work for. They don\'t pay on time and the management is awful. Stay away!',
    author: 'Anonymous User',
    authorEmail: 'anonymous@example.com',
    jobTitle: 'Creative Director',
    company: 'Creative Agency Inc',
    status: 'flagged',
    createdAt: '2025-01-06T09:15:00Z',
    reports: 5,
  },
  {
    id: '4',
    content: 'Great benefits package! I\'ve been working here for 2 years and can highly recommend this company.',
    author: 'Sarah Wilson',
    authorEmail: 'sarah@example.com',
    jobTitle: 'Data Scientist',
    company: 'DataTech Analytics',
    status: 'approved',
    createdAt: '2025-01-05T14:20:00Z',
    reports: 0,
  },
];

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'rejected', label: 'Rejected' },
];

export function Comments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      flagged: 'bg-red-100 text-red-800',
      rejected: 'bg-gray-100 text-gray-800',
    };
    
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const handleApprove = (commentId: string) => {
    console.log('Approving comment:', commentId);
    // Implementation would update comment status
  };

  const handleReject = (commentId: string) => {
    console.log('Rejecting comment:', commentId);
    // Implementation would reject comment
  };

  const handleFlag = (commentId: string) => {
    console.log('Flagging comment:', commentId);
    // Implementation would flag comment
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Comment Moderation</h1>
          <p className="text-gray-600">Review and moderate user comments on job postings</p>
        </div>
        <Button>
          <MessageCircle className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-gray-600">Total Comments</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">45</p>
            <p className="text-sm text-gray-600">Pending Review</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">23</p>
            <p className="text-sm text-gray-600">Flagged</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">1,166</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search comments..."
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
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {mockComments.map((comment) => (
          <Card key={comment.id} className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{comment.author}</p>
                  <p className="text-sm text-gray-600">{comment.authorEmail}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(comment.status)}`}>
                  {comment.status.toUpperCase()}
                </span>
                {comment.reports > 0 && (
                  <span className="flex items-center text-red-600 text-sm">
                    <Flag className="h-4 w-4 mr-1" />
                    {comment.reports} reports
                  </span>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <div className="text-sm text-gray-500">
                <p>On: <span className="font-medium">{comment.jobTitle}</span> at <span className="font-medium">{comment.company}</span></p>
                <p>Posted: {new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Job
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {comment.status === 'pending' && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleApprove(comment.id)}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReject(comment.id)}
                    >
                      <XCircle className="h-4 w-4 text-red-600 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                {comment.status === 'approved' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleFlag(comment.id)}
                  >
                    <Flag className="h-4 w-4 text-red-600 mr-1" />
                    Flag
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}