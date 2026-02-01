'use client';

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (
      formData.phone &&
      !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message:
            result.message ||
            "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message:
            result.error || 'Failed to send your message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h3 className="text-primary mb-6 text-2xl font-bold">
              Send us a message
            </h3>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 rounded-lg p-4 ${
                  submitStatus.type === 'success'
                    ? 'border border-green-200 bg-green-50 text-green-700'
                    : 'border border-red-200 bg-red-50 text-red-700'
                }`}
              >
                <div className="flex items-center">
                  {submitStatus.type === 'success' ? (
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {submitStatus.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`bg-input focus:ring-primary w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.name ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`bg-input focus:ring-primary w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`bg-input focus:ring-primary w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.phone ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label
                  htmlFor="company"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-input border-border focus:ring-primary w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none"
                  placeholder="Your company or organization"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`bg-input focus:ring-primary w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.subject ? 'border-red-500' : 'border-border'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Product Information">
                    Product Information
                  </option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership Opportunity">
                    Partnership Opportunity
                  </option>
                  <option value="Quote Request">Quote Request</option>
                  <option value="Training & Education">
                    Training & Education
                  </option>
                  <option value="Regulatory Compliance">
                    Regulatory Compliance
                  </option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="text-muted-foreground mb-2 block font-medium"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`bg-input focus:ring-primary resize-vertical w-full rounded-lg border p-3 transition-colors focus:ring-2 focus:outline-none ${
                    errors.message ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Please provide details about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-gray-400'
                    : 'bg-primary hover:bg-primary/90 shadow-md hover:scale-105 hover:shadow-lg'
                } text-primary-foreground`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              <p className="text-muted-foreground mt-4 text-center text-sm">
                * Required fields. We typically respond within 24 hours.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-primary mb-4 text-2xl font-bold">
                Addis Ababa, Ethiopia
              </h3>
              <p className="text-muted-foreground">+25111 273 4554</p>
              <p className="text-muted-foreground">+251 91 366 7537</p>
              <p className="text-muted-foreground mt-2">
                Gulele Subcity, Woreda 09, House no new/Droga building
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-4 text-2xl font-bold">
                Somaliland
              </h3>
              <p className="text-muted-foreground">+252 634 958 444</p>
              <p className="text-muted-foreground">+252 637 611 171</p>
              <p className="text-muted-foreground mt-2">
                Cabaaye Bus Station, Downtown, Hargeysa, Somaliland
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
