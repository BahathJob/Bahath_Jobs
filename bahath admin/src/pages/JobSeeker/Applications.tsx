// src/pages/JobSeeker/Applications.tsx
import React, { useState, useEffect } from "react";
import api from "../../utils/api"; 
import { Card } from "../../components/UI/Card";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Briefcase,
  MapPin,
  DollarSign,
  Building2,  
} from "lucide-react";

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'applied', label: 'Applied' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' },
];

export default function Applications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications/my-applications");
        setApplications(res.data.applications || []);
      } catch (error) {
        console.error("❌ Failed to fetch applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      responded: "bg-green-100 text-green-800",
      hired: "bg-green-200 text-green-900",
      rejected: "bg-red-100 text-red-800",
    };
    return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.job_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job_location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ✅ Export PDF only
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("My Job Applications Report", 14, 10);

    const tableData = filteredApplications.map((app) => [
      app.job_title,
      app.company_name,
      app.job_location,
      app.status,
      new Date(app.applied_at).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["Job Title", "Company", "Location", "Status", "Applied On"]],
      body: tableData,
    });

    doc.save("applications_report.pdf");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">Track your job applications and statuses</p>
        </div>
        <Button onClick={exportPDF}>
          <Briefcase className="h-4 w-4 mr-2" />
           Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {applications.length}
            </p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {applications.filter((a) => a.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {applications.filter((a) => a.status === "in_progress").length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {applications.filter((a) => a.status === "hired").length}
            </p>
            <p className="text-sm text-gray-600">Hired</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {applications.filter((a) => a.status === "rejected").length}
            </p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
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
        </div>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{app.job_title}</h3>
                  <p className="text-sm text-gray-600">{app.company_name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(app.status)}`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {app.job_location}
                    </span>
                    {app.job && (
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {app.job.salary_min} - {app.job.salary_max} {app.job.currency}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Link to={`/applications/${app.id}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                {app.status === "pending" && (
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Waiting
                  </Button>
                )}
                {app.status === "hired" && (
                  <Button variant="ghost" size="sm" className="text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Hired
                  </Button>
                )}
                {app.status === "rejected" && (
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Rejected
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card className="text-center py-12">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No applications found
          </h3>
          <p className="text-gray-600">
            {applications.length === 0
              ? "You have not applied to any jobs yet"
              : "Try adjusting your search or filters"}
          </p>
        </Card>
      )}
    </div>
  );
}
