import axios from 'axios';
import React, { useState } from "react";
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  console.log(BACKEND_URL)
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await axios.post(`${BACKEND_URL}/user/sendemail`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      {/* Contact Section Title */}
      <div className="container mx-auto text-center pt-20 bg-indigo-50">
        <h1 className="text-indigo-800 text-3xl md:text-4xl font-bold relative inline-block pb-2.5 mb-6">
          Contact Section
          <span className="block w-32 h-0.5 bg-[#5c8bf5] mx-auto mt-2"></span>
        </h1>
      </div>

      {/* Contact Section Content */}
      <section id="contact" className="bg-gradient-to-br bg-indigo-50 pt-30 pb-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">

            {/* Contact Info Section */}
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <div className="bg-indigo-100 rounded-lg shadow-lg p-8 border border-indigo-950">
                <div className="space-y-6">

                  {/* Address */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Address</h3>
                      <p className="text-gray-600">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Call Us</h3>
                      <p className="text-gray-600">+91 9123456789</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800">Email Us</h3>
                      <p className="text-gray-600">info@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14675.078917899717!2d72.57136277483738!3d23.022505636428267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bebae1869e71a9d%3A0x3ec525422411e0ac!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                    className="w-full h-64 rounded-lg"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="w-full lg:w-1/2 px-4">
              <form onSubmit={handleSubmit} className="bg-indigo-100 rounded-lg shadow-lg p-7 border border-indigo-950">
                <div className="mb-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 bg-indigo-100 ">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-indigo-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 border border-indigo-950"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 bg-indigo-100">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 border border-indigo-950"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 bg-indigo-100">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 border border-indigo-950"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 bg-indigo-100">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 border border-indigo-950"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  {status === 'loading' && <div className="text-blue-500 mb-4">Sending message...</div>}
                  {status === 'error' && <div className="text-red-500 mb-4">An error occurred. Please try again.</div>}
                  {status === 'success' && <div className="text-green-500 mb-4">Your message has been sent. Thank you!</div>}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                    disabled={status === 'loading'}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export default ContactSection;    