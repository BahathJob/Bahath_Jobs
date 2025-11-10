import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  Search,
  Heart,
  BookmarkIcon,
  User,
  Mail
} from 'lucide-react';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  // Super Admin Items
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    roles: ['super_admin'],
  },
  // {
  //   label: 'Analytics',
  //   href: '/admin/analytics',
  //   icon: BarChart3,
  //   roles: ['super_admin'],
  // },
  {
    label: 'Job Seeker Management',
    href: '/admin/users',
    icon: Users,
    roles: ['super_admin'],
  },
  {
    label: 'Employer Management',
    href: '/admin/allEmployers',
    icon: Users,
    roles: ['super_admin'],
  },
  {
    label: 'Company Management',
    href: '/admin/employers',
    icon: Building2,
    roles: ['super_admin'],
  },
  {
    label: 'Job Moderation',
    href: '/admin/jobs',
    icon: Briefcase,
    roles: ['super_admin'],
  },
  // {
  //   label: 'Comments',
  //   href: '/admin/comments',
  //   icon: MessageSquare,
  //   roles: ['super_admin'],
  // },
  {
    label: 'Blog Management',
    href: '/admin/blog',
    icon: FileText,
    roles: ['super_admin'],
  },
  {
    label: 'Contact Inquiries',
    href: '/admin/contact',
    icon: Mail,
    roles: ['super_admin'],
  },
  
  // Employer Items
  {
    label: 'Dashboard',
    href: '/employer',
    icon: LayoutDashboard,
    roles: ['employer'],
  },
  {
    label: 'Company Profile',
    href: '/employer/profile',
    icon: Building2,
    roles: ['employer'],
  },
  {
    label: 'Post Job',
    href: '/employer/post-job',
    icon: Briefcase,
    roles: ['employer'],
  },
  {
    label: 'My Jobs',
    href: '/employer/jobs',
    icon: FileText,
    roles: ['employer'],
  },
   {
    label: 'Blog Management',
    href: '/employer/blog',
    icon: FileText,
    roles: ['employer'],
  },
  {
    label: 'CV Search',
    href: '/employer/cv-search',
    icon: Search,
    roles: ['employer'],
  },
  {
    label: 'Applications',
    href: '/employer/applications',
    icon: Users,
    roles: ['employer'],
  },
  
  // Job Seeker Items
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['job_seeker'],
  },
  {
    label: 'Browse Jobs',
    href: '/jobs',
    icon: Search,
    roles: ['job_seeker'],
  },
  {
    label: 'My Applications',
    href: '/applications',
    icon: FileText,
    roles: ['job_seeker'],
  },
  {
    label: 'Saved Jobs',
    href: '/saved-jobs',
    icon: BookmarkIcon,
    roles: ['job_seeker'],
  },
  // {
  //   label: 'Liked Jobs',
  //   href: '/liked-jobs',
  //   icon: Heart,
  //   roles: ['job_seeker'],
  // },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    roles: ['job_seeker'],
  },
  {
    label: 'Contact Inquiries',
    href: '/contacts/my-contacts',
    icon: Mail,
    roles: ['job_seeker'],
  },
];

export function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userSidebarItems = sidebarItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-2">
          {userSidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}