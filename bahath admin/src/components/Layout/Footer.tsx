import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Heart
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Search className="h-8 w-8 text-blue-400" />
                <User className="h-4 w-4 text-blue-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-400">BAHATH</span>
                <span className="text-2xl font-bold text-blue-300 ml-1">JOBZ</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Connecting talented professionals with their dream careers and helping companies 
              find the perfect candidates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition-colors">
                  Find Jobs
                </Link>
              </li>
              {/* <li>
                <Link to="/auth/register?role=job_seeker" className="text-gray-300 hover:text-white transition-colors">
                  Job Seeker Signup
                </Link>
              </li>
              <li>
                <Link to="/auth/register?role=employer" className="text-gray-300 hover:text-white transition-colors">
                  Employer Signup
                </Link>
              </li> */}
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Career Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>                
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Signup / Login</h3>
            <ul className="space-y-2">
              {/* <li>
                <Link to="/employer/post-job" className="text-gray-300 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer" className="text-gray-300 hover:text-white transition-colors">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Hiring Resources
                </a>
              </li> */}
               <li>
                <Link to="/auth/register" className="text-gray-300 hover:text-white transition-colors">
                 Signup
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:Inquiries@bahathjobz.com" className="text-gray-300 hover:text-white transition-colors">
                  Inquiries@bahathjobz.com
                </a>
              </div>
              {/* <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a href="tel:+15551234567" className="text-gray-300 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div> */}
              {/* <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <div className="text-gray-300">
                  <p>123 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 BAHATH JOBZ. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </footer>
  );
}