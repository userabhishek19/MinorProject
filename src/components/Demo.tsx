import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Play, XCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Demo: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState<'webcam' | 'upload'>('webcam');
  const [isRecording, setIsRecording] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
  const [showUploadPreview, setShowUploadPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  useEffect(() => {
    return () => {
      // Cleanup: stop the stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Unable to access webcam. Please ensure you have granted camera permissions.');
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  
  const handleStartDemo = async () => {
    setIsRecording(true);
    await startWebcam();
    
    // Simulate detection after a brief delay
    const phrases = [
      "Hello, nice to meet you.",
      "My name is Sarah.",
      "How are you doing today?",
      "I'm learning sign language.",
      "Thank you for your help."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < phrases.length) {
        setDetectedText(phrases[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };
  
  const handleStopDemo = () => {
    setIsRecording(false);
    setDetectedText('');
    stopWebcam();
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideo(url);
      setShowUploadPreview(true);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleAnalyzeVideo = () => {
    setIsRecording(true);
    
    // Simulate detection after a brief delay
    setTimeout(() => {
      setDetectedText("Thank you for sharing this video. I'm interested in learning more about sign language.");
    }, 1500);
  };
  
  const resetUpload = () => {
    setUploadedVideo(null);
    setShowUploadPreview(false);
    setIsRecording(false);
    setDetectedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div 
      ref={ref}
      className={`container-custom transition-all duration-500 ${
        inView ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="section-title">
        <h2>Translation</h2>
        <p>Experience the technology in action with our interactive </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === 'webcam' 
                ? 'text-teal-600 border-b-2 border-teal-500' 
                : 'text-gray-500 hover:text-teal-500'
            }`}
            onClick={() => setActiveTab('webcam')}
          >
            <div className="flex items-center gap-2">
              <Camera size={18} />
              <span>Webcam</span>
            </div>
          </button>
          
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === 'upload' 
                ? 'text-teal-600 border-b-2 border-teal-500' 
                : 'text-gray-500 hover:text-teal-500'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            <div className="flex items-center gap-2">
              <Upload size={18} />
              <span>Upload Video</span>
            </div>
          </button>
        </div>
        
        {/* Webcam Demo */}
        {activeTab === 'webcam' && (
          <div className="bg-gray-100 rounded-xl p-4 md:p-8">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
              {isRecording ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-red-500 h-4 w-4 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <Camera size={64} className="text-gray-400" />
              )}
            </div>
            
            <div className="flex justify-center mb-6">
              {!isRecording ? (
                <button 
                  className="btn btn-primary flex items-center gap-2"
                  onClick={handleStartDemo}
                >
                  <Play size={18} />
                  Start 
                </button>
              ) : (
                <button 
                  className="btn bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                  onClick={handleStopDemo}
                >
                  <XCircle size={18} />
                  Stop 
                </button>
              )}
            </div>
            
            <div className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300 ${
              detectedText ? 'opacity-100' : 'opacity-0'
            }`}>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Detected Speech:</h3>
              <p className="text-lg">{detectedText}</p>
            </div>
          </div>
        )}
        
        {/* Video Upload */}
        {activeTab === 'upload' && (
          <div className="bg-gray-100 rounded-xl p-4 md:p-8">
            {!showUploadPreview ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 transition-colors"
                onClick={handleUploadClick}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  accept="video/*"
                  onChange={handleFileUpload}
                />
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload a video file</p>
                <p className="text-gray-400 text-sm">Supports: MP4, MOV, AVI (Max 20MB)</p>
              </div>
            ) : (
              <div>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative">
                  {uploadedVideo && (
                    <video 
                      src={uploadedVideo} 
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  {isRecording && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-500 h-4 w-4 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center gap-4 mb-6">
                  {!isRecording ? (
                    <>
                      <button 
                        className="btn btn-primary flex items-center gap-2"
                        onClick={handleAnalyzeVideo}
                      >
                        <Play size={18} />
                        Analyze Video
                      </button>
                      <button 
                        className="btn btn-secondary flex items-center gap-2"
                        onClick={resetUpload}
                      >
                        <XCircle size={18} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                      onClick={handleStopDemo}
                    >
                      <XCircle size={18} />
                      Stop Analysis
                    </button>
                  )}
                </div>
                
                <div className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300 ${
                  detectedText ? 'opacity-100' : 'opacity-0'
                }`}>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Detected Speech:</h3>
                  <p className="text-lg">{detectedText}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;