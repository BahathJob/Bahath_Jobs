import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Import pages
import { Home } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { JobBrowse } from './pages/Jobs/JobBrowse';
import { JobDetails } from './pages/Jobs/JobDetails';
import { Dashboard } from './pages/JobSeeker/Dashboard';
import { JobSeekerProfile } from './pages/Profile/JobSeekerProfile';
import { Blog } from './pages/Blog/Blog';
import { BlogDetail } from './pages/Blog/BlogDetail';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { UserManagement } from './pages/Admin/UserManagement';
import { Analytics } from './pages/Admin/Analytics';
import { EmployerManagement } from './pages/Admin/EmployerManagement';
import { JobModeration } from './pages/Admin/JobModeration';
import { Comments } from './pages/Admin/Comments';
import { BlogManagement } from './pages/Admin/BlogManagement';
import { BlogCreate } from './pages/Admin/BlogCreate';
import { BlogEdit } from './pages/Admin/BlogEdit';
import { ContactManagement } from './pages/Admin/ContactManagement';
import { EmployerDashboard } from './pages/Employer/EmployerDashboard';
import { PostJob } from './pages/Employer/PostJob';
import { CompanyProfile } from './pages/Employer/CompanyProfile';
import { MyJobs } from './pages/Employer/MyJobs';
import { CVSearch } from './pages/Employer/CVSearch';
import { Applications as EmployerApplications } from './pages/Employer/Applications';
import { JobDetail } from './pages/Employer/JobDetail';
import { Applications as JobSeekerApplications } from './pages/JobSeeker/Applications';
import { SavedJobs } from './pages/JobSeeker/SavedJobs';
import { LikedJobs } from './pages/JobSeeker/LikedJobs';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#374151',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="jobs" element={<JobBrowse />} />
                <Route path="jobs/:id" element={<JobDetails />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                
                {/* Auth routes */}
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/register" element={<Register />} />
                
                {/* Job Seeker routes */}
                <Route path="dashboard" element={
                  <ProtectedRoute roles={['job_seeker']}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute roles={['job_seeker']}>
                    <JobSeekerProfile />
                  </ProtectedRoute>
                } />
                
                {/* Employer routes */}
                <Route path="employer" element={
                  <ProtectedRoute roles={['employer']}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="employer/post-job" element={
                  <ProtectedRoute roles={['employer']}>
                    <PostJob />
                  </ProtectedRoute>
                } />
                <Route path="employer/jobs" element={
                  <ProtectedRoute roles={['employer']}>
                    <MyJobs />
                  </ProtectedRoute>
                } />
                <Route path="employer/cv-search" element={
                  <ProtectedRoute roles={['employer']}>
                    <CVSearch />
                  </ProtectedRoute>
                } />
                <Route path="employer/applications" element={
                  <ProtectedRoute roles={['employer']}>
                    <EmployerApplications />
                  </ProtectedRoute>
                } />
                
                {/* Job Seeker additional routes */}
                <Route path="applications" element={
                  <ProtectedRoute roles={['job_seeker']}>
                    <JobSeekerApplications />
                  </ProtectedRoute>
                } />
                <Route path="saved-jobs" element={
                  <ProtectedRoute roles={['job_seeker']}>
                    <SavedJobs />
                  </ProtectedRoute>
                } />
                <Route path="liked-jobs" element={
                  <ProtectedRoute roles={['job_seeker']}>
                    <LikedJobs />
                  </ProtectedRoute>
                } />
                
                {/* Admin routes */}
                <Route path="admin" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="admin/analytics" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <Analytics />
                  </ProtectedRoute>
                } />
                <Route path="admin/users" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="admin/employers" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <EmployerManagement />
                  </ProtectedRoute>
                } />
                <Route path="admin/jobs" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <JobModeration />
                  </ProtectedRoute>
                } />
                <Route path="admin/comments" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <Comments />
                  </ProtectedRoute>
                } />
                <Route path="admin/blog" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <BlogManagement />
                  </ProtectedRoute>
                } />
                <Route path="admin/blog/create" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <BlogCreate />
                  </ProtectedRoute>
                } />
                <Route path="admin/blog/edit/:id" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <BlogEdit />
                  </ProtectedRoute>
                } />
                <Route path="admin/contact" element={
                  <ProtectedRoute roles={['super_admin']}>
                    <ContactManagement />
                  </ProtectedRoute>
                } />
                
                {/* Fallback */}
                <Route path="*" element={
                  <div className="p-6">
                    <div className="text-center py-12">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                      <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                      <a href="/" className="text-blue-600 hover:text-blue-500">
                        Go back home
                      </a>
                    </div>
                  </div>
                } />
                <Route path="employer/profile" element={
                  <ProtectedRoute roles={['employer']}>
                    <CompanyProfile />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;