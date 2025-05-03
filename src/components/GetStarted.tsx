import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const GetStarted: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to a server
  };

  return (
    <div 
      ref={ref}
      className={`container-custom max-w-5xl transition-all duration-500 ${
        inView ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Join the Communication Revolution
          </h2>
          
          <p className="text-gray-600 mb-8">
            Be among the first to experience our groundbreaking technology. 
    
          </p>
          
          <div className="space-y-4 mb-8">
            {[
              
              "Help shape product development"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mt-0.5 mr-3">
                  <Check size={14} />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!submitted ? (
            <>
              <h3 className="text-xl font-semibold mb-6">Details</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your organization"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn btn-primary text-center"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your request has been submitted successfully. We'll be in touch soon with your early access details.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;