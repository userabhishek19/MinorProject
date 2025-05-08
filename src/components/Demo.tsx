import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Demo: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    window.open('https://userabhishek19-asl-model-app-6n2ugi.streamlit.app/', '_blank');
  };

  return (
    <div
      ref={ref}
      className={`container-custom transition-all duration-500 ${inView ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="section-title">
        <h2>Translation</h2>
        <p>Experience the technology in action with our interactive</p>
      </div>

      <div className="max-w-4xl mx-auto">

        {/* ASL Translator Box */}
        <div className="bg-gray-100 rounded-xl p-6 mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4">Try the ASL Translator</h3>
          <p className="text-sm text-gray-500 mb-6">Use our Streamlit app for sign language translation.</p>
          <div className="flex justify-center">
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleUploadClick}
            >
              <Upload size={18} /> Upload Image or Video
            </button>
          </div>
        </div>

        {/* Additional Access Box */}
        <div className="bg-white shadow-lg rounded-xl p-8 mt-12 max-w-xl mx-auto text-center border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Access</h3>
          <p className="text-sm text-gray-500 mb-6">You can also access the model below:</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-blue-900 rounded-lg shadow transition duration-200"
            >
              Open Local URL
            </a>
            <a
              href="http://192.168.29.33:8501"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block px-5 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-blue-900 rounded-lg shadow transition duration-200"
            >
              Open Network URL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
