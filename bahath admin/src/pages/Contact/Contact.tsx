import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  HelpCircle,
  Users,
  Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'job_seeker', label: 'Job Seeker Support' },
  { value: 'employer', label: 'Employer Support' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
];

const employerInquiryTypes = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'support', label: 'Support' },
  { value: 'assign_recruiter', label: 'Assign a recruiter' },
  { value: 'branding', label: 'Branding' },
  { value: 'other', label: 'Other' },
];

const jobSeekerInquiryTypes = [
  { value: 'technical', label: 'Technical Issue' },
  { value: 'support', label: 'Support' },
  { value: 'cv_writing', label: 'CV writing ATS' },
  { value: 'career_coaching', label: 'Career coaching' },
  { value: 'other', label: 'Other' },
];
const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Send us an email and we\'ll respond within 24 hours',
    contact: 'Inquiries@bahathjobz.com',
    action: 'mailto:Inquiries@bahathjobz.com',
  },
  // {
  //   icon: Phone,
  //   title: 'Call Us',
  //   description: 'Speak directly with our support team',
  //   contact: '+1 (555) 123-4567',
  //   action: 'tel:+15551234567',
  // },
  // {
  //   icon: MessageCircle,
  //   title: 'Live Chat',
  //   description: 'Chat with us in real-time for immediate assistance',
  //   contact: 'Available 24/7',
  //   action: '#',
  // },
];

const faqs = [
  {
    question: 'How do I create an account?',
    answer: 'Click on "Sign Up" in the top right corner and choose whether you\'re a job seeker or employer. Fill out the required information and verify your email address.',
  },
  {
    question: 'Is BAHATH JOBZ free to use?',
    answer: 'Yes! Job seekers can use all features completely free. Employers have access to basic features for free, with premium options available for enhanced visibility and advanced tools.',
  },
  {
    question: 'How do I apply for jobs?',
    answer: 'Browse jobs, click on any position that interests you, and click "Apply Now". You can include a cover note and your resume will be automatically attached from your profile.',
  },
  {
    question: 'Can I edit my application after submitting?',
    answer: 'Once submitted, applications cannot be edited. However, you can contact the employer directly or reach out to our support team for assistance.',
  },
];

export function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry_type: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const getInquiryTypes = () => {
    if (user?.role === 'employer') {
      return employerInquiryTypes;
    }
    if (user?.role === 'job_seeker') {
      return jobSeekerInquiryTypes;
    }
    return inquiryTypes;
  };

  const currentInquiryTypes = getInquiryTypes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        priority: 'medium', 
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      inquiry_type: '',
      subject: '',
      message: '',
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    toast.error(error.message || 'Something went wrong, please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            We're here to help! Reach out to us with any questions, concerns, or feedback.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                        <a
                          href={method.action}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {method.contact}
                        </a>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Office Info */}
            {/* <Card className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Office Location
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>BAHATH JOBZ Headquarters</p>
                <p>123 Innovation Drive</p>
                <p>San Francisco, CA 94105</p>
                <p>United States</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Mon - Fri: 9:00 AM - 6:00 PM PST
                </p>
              </div>
            </Card> */}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Inquiry Type"
                    name="inquiry_type"
                    options={currentInquiryTypes}
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject line"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Seekers</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get help with your profile, applications, and job search strategy.
            </p>
            <Button variant="outline" size="sm">
              Job Seeker Help
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Employers</h3>
            <p className="text-gray-600 text-sm mb-4">
              Support for posting jobs, managing applications, and finding talent.
            </p>
            <Button variant="outline" size="sm">
              Employer Help
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Having technical issues? Our tech team is here to help.
            </p>
            <Button variant="outline" size="sm">
              Technical Help
            </Button>
          </Card>
        </div>        
      </div>
    </div>
  );
}