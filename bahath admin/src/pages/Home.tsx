import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, MapPin, Clock, Building2 } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';

// ✅ Always use import.meta.env for Vite projects
const API_URL = import.meta.env.VITE_API_URL;

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  company_name: string;
  company_logo?: string;
  created_at: string;
  salary_min?: number;
  salary_max?: number;
  currency?: string;
};

export function Home() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    activeJobs: 0,
    jobSeekers: 0,
    companies: 0,
  });
  const navigate = useNavigate();

  const fetchJobs = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams({
      page: String(1),
      limit: String(6),
      ...(search && { search }),
      ...(location && { location }),
    });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs?${params.toString()}`);
    const data = await res.json();

    if (res.ok) {
      setJobs(data.jobs || []);
    } else {
      setJobs([]);
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
    setJobs([]);
  }
  setLoading(false);
};
const handleSearch = () => {
  navigate(`/jobs?search=${search}&location=${location}`);
};
const fetchStats = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/stats`);
    const data = await res.json();
    if (res.ok) {
      setStats(data);
    }
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
};


  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Job with <span className="text-blue-200">BAHATH JOBZ</span>
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and aspirations.
            Your career journey starts here.
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-lg p-2 flex items-center max-w-4xl mx-auto shadow-lg">
            <div className="flex-1 flex items-center">
              <Search className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full px-3 py-3 text-gray-900 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="border-l border-gray-300 pl-4 flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-48 py-3 text-gray-900 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button className="ml-4 px-8 py-3" onClick={handleSearch}>
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Briefcase className="h-8 w-8 text-blue-600" />, value: `${stats.activeJobs}+`, label: "Active Jobs", color: "bg-blue-100" },
              { icon: <Users className="h-8 w-8 text-green-600" />, value: `${stats.jobSeekers}+`, label: "Job Seekers", color: "bg-green-100" },
              { icon: <Building2 className="h-8 w-8 text-purple-600" />, value: `${stats.companies}+`, label: "Companies", color: "bg-purple-100" },
              { icon: <TrendingUp className="h-8 w-8 text-orange-600" />, value: "95%", label: "Success Rate", color: "bg-orange-100" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Jobs
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Link key={job.id} to={`/jobs/${job.id}`} className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company_name}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {job.salary_min && job.salary_max && (
                        <span className="text-blue-600 font-medium">
                          {`${job.currency} ${job.salary_min} - ${job.salary_max}`}
                        </span>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button size="lg">View All Jobs</Button>
            </Link>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs through BAHATH JOBZ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register?role=job_seeker">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                I'm Looking for a Job
              </Button>
            </Link>
            <Link to="/auth/register?role=employer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                I'm Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}