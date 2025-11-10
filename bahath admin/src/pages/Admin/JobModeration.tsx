  import React, { useState, useEffect } from 'react';
  import { Card } from '../../components/UI/Card';
  import { Button } from '../../components/UI/Button';
  import { Input } from '../../components/UI/Input';
  import { Select } from '../../components/UI/Select';
  import {
    Search,
    CheckCircle,
    XCircle,
    Briefcase,
    MapPin,
    Clock,
    Trash2,
  } from 'lucide-react';
  import api from '../../utils/api';
  import toast from 'react-hot-toast';
  import { countryOptions, industryOptions, currentPositionOptions } from "../../utils/options";

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
  ];

  // const industryOptions = [
  //   { value: '', label: 'All Industries' },
  //   { value: 'Technology', label: 'Technology' },
  //   { value: 'Healthcare', label: 'Healthcare' },
  //   { value: 'Finance', label: 'Finance' },
  //   { value: 'Education', label: 'Education' },
  //   { value: 'Marketing & Advertising', label: 'Marketing & Advertising' },
  //   { value: 'Manufacturing', label: 'Manufacturing' },
  //   { value: 'Retail', label: 'Retail' },
  // ];

  export function JobModeration() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
    const [stats, setStats] = useState({
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    });

    useEffect(() => {
      // ✅ Debounced fetch on search, status, or industry change
      const delayDebounce = setTimeout(() => {
        fetchJobs();
      }, 900);

      return () => clearTimeout(delayDebounce);
    }, [pagination.page, statusFilter, industryFilter, searchTerm]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());

      if (statusFilter === 'approved') params.append('approved', 'true');
      if (statusFilter === 'pending') params.append('approved', 'false');
      if (searchTerm.trim()) params.append('search', searchTerm.trim());

      const response = await api.get(`/admin/jobs?${params.toString()}`);
      const { jobs: jobsData, pagination: pagData } = response.data;

      setJobs(jobsData);

      // ✅ Update pagination info
      setPagination((prev) => ({
        ...prev,
        total: pagData.total,
        totalPages: pagData.totalPages,
      }));

      // ✅ Update stats
      setStats({
        total: pagData.total,
        pending: jobsData.filter((j:any) => !j.is_approved).length,
        approved: jobsData.filter((j:any) => j.is_approved).length,
        rejected: 0,
      });
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to fetch jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };


    const handleApprovalToggle = async (jobId: string, currentStatus: boolean) => {
      try {
        await api.patch(`/admin/jobs/${jobId}/approval`, {
          isApproved: !currentStatus,
        });
        toast.success('Job approval status updated successfully');
        fetchJobs();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || 'Failed to update job approval'
        );
      }
    };
      const handleDeleteJob = async (jobId: string) => {
      if (window.confirm('Are you sure you want to delete this job?')) {
        try {
          await api.delete(`/jobs/${jobId}`);
          toast.success('Job deleted successfully');
          fetchJobs();
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Failed to delete job');
        }
      }
    };

    const getStatusBadge = (status: string) => {
      const badges = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
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

    const formatSalary = (min: number, max: number) => {
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    };

    if (loading) {
      return (
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Moderation
            </h1>
            <p className="text-gray-600">
              Review and moderate job postings before they go live
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Jobs</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
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
            {/* <Select
              options={industryOptions}
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              placeholder="Filter by industry"
            /> */}
          </div>
        </Card>

        {/* Jobs Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Job Details
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Location & Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Salary
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Posted
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job: any) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {job.company_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          by {job.first_name} {job.last_name}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getWorkTypeBadge(
                            job.workType || job.work_type
                          )}`}
                        >
                          {(job.workType || job.work_type)
                            .charAt(0)
                            .toUpperCase() +
                            (job.workType || job.work_type).slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">
                        {job.salary_min && job.salary_max
                          ? formatSalary(job.salary_min, job.salary_max)
                          : 'Not specified'}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          job.is_approved ? 'approved' : 'pending'
                        )}`}
                      >
                        {job.is_approved ? 'APPROVED' : 'PENDING'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="flex items-center text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleApprovalToggle(job.id, job.is_approved)
                          }
                          className={
                            job.is_approved
                              ? 'text-red-600 hover:text-red-700'
                              : 'text-green-600 hover:text-green-700'
                          }
                        >
                          {job.is_approved ? (
                            <XCircle className="h-4 w-4 mr-1" />
                          ) : (
                            <CheckCircle className="h-4 w-4 mr-1" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pagination.totalPages > 1 && (
    <Card className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total} jobs
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
          >
            Previous
          </Button>
          <span className="px-3 py-1 text-sm">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page === pagination.totalPages}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  )}
        </Card>
      </div>
    );
  }
