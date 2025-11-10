import React from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { 
  Target, 
  Users, 
  Award, 
  Heart, 
  Briefcase, 
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former HR executive with 15+ years in talent acquisition and career development.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Tech veteran who built scalable platforms for Fortune 500 companies.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Operations',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Operations expert focused on creating seamless user experiences.',
  },
  {
    name: 'David Park',
    role: 'Head of Marketing',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Marketing strategist passionate about connecting talent with opportunities.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We exist to bridge the gap between talented individuals and great opportunities.',
  },
  {
    icon: Heart,
    title: 'People-First',
    description: 'Every decision we make prioritizes the success and well-being of our users.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from our platform to our support.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We continuously innovate to stay ahead of industry trends and user needs.',
  },
];

const achievements = [
  { number: '50,000+', label: 'Job Seekers Helped' },
  { number: '2,500+', label: 'Partner Companies' },
  { number: '10,000+', label: 'Successful Placements' },
  { number: '95%', label: 'User Satisfaction' },
];

export function About() {
  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About BAHATH JOBZ</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            We're on a mission to revolutionize the job search experience by connecting 
            talented professionals with their dream careers and helping companies find 
            the perfect candidates.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                BAHATH JOBZ was founded in 2023 with a simple yet powerful vision: to make 
                job searching and hiring more efficient, transparent, and human-centered.
              </p>
              <p>
                Our founders, having experienced the frustrations of traditional job boards 
                firsthand, set out to create a platform that truly serves both job seekers 
                and employers with equal dedication.
              </p>
              <p>
                Today, we're proud to be a trusted partner for thousands of professionals 
                and companies worldwide, facilitating meaningful connections that drive 
                career growth and business success.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">2023</div>
                <div className="text-sm">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To empower professionals to find meaningful work and help companies 
              build exceptional teams through innovative technology and personalized support.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most trusted career platform, where every professional 
              can discover their potential and every company can find their perfect match.
            </p>
          </Card>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-50 rounded-lg p-12 mb-16 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      {/* <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div> */}

      {/* Why Choose Us */}
      <Card className="max-w-4xl mx-auto p-8 mb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose BAHATH JOBZ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Smart Matching</h4>
                <p className="text-gray-600 text-sm">AI-powered algorithms connect you with the most relevant opportunities.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Verified Companies</h4>
                <p className="text-gray-600 text-sm">All our partner companies are thoroughly vetted for legitimacy.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Career Support</h4>
                <p className="text-gray-600 text-sm">Get personalized career advice and interview preparation.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Privacy First</h4>
                <p className="text-gray-600 text-sm">Your data is secure and never shared without your consent.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                <p className="text-gray-600 text-sm">Our dedicated support team is always here to help you succeed.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">Free to Use</h4>
                <p className="text-gray-600 text-sm">Job seekers can access all features completely free of charge.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of professionals who have found their dream careers with BAHATH JOBZ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg">
            <Users className="h-5 w-5 mr-2" />
            Find Jobs
          </Button>
          <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
            <Briefcase className="h-5 w-5 mr-2" />
            Post Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}