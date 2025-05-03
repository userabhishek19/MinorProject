import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-background via-light-accent/20 to-light-background dark:from-dark-background dark:via-dark-accent/20 dark:to-dark-background transition-colors duration-300 flex items-center pt-16">
      <div className="container-custom">
        <div 
          ref={ref}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="bg-light-accent/10 dark:bg-dark-accent/10 text-light-primary dark:text-dark-primary py-2 px-4 rounded-full inline-flex items-center text-sm font-medium mb-8 animate-float">
              <span className="mr-2">Breakthrough Technology</span>
              <ArrowRight size={14} />
            </div>
            
            <h1 className="mb-6 leading-tight">
              Breaking Communication Barriers: Real-Time Sign-to-text Conversion
            </h1>
            
            <p className="mb-8 leading-relaxed">
              Empowering the deaf and hard-of-hearing community with instant, accurate 
              sign language translation technology that bridges the communication gap.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#demo" 
                className="btn btn-primary flex items-center gap-2 group"
              >
                Start Using Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#how-it-works" 
                className="btn btn-secondary group"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Hero Animation */}
          <div className={`flex justify-center ${inView ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative">
              <div className="card p-6 max-w-md">
                <img 
                  src="https://images.pexels.com/photos/7516363/pexels-photo-7516363.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Person using sign language" 
                  className="rounded-xl w-full h-auto object-cover aspect-[4/3]"
                />
                
                {/* Speech Bubbles */}
                <div className="absolute -top-12 right-0 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white p-4 rounded-2xl rounded-br-none shadow-xl animate-float">
                  <MessageSquare size={24} />
                </div>
                
                <div className="absolute -bottom-10 left-4 bg-gradient-to-r from-light-secondary to-light-primary dark:from-dark-secondary dark:to-dark-primary text-white p-4 rounded-2xl rounded-bl-none shadow-xl max-w-[200px] animate-float animate-delay-500">
                  <p className="text-sm font-medium">Hello, nice to meet you!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;