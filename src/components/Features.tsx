import React from 'react';
import { Clock, Globe, Headphones, Smartphone, Laptop, Check, ShieldCheck, Target } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  isActive: boolean;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay, isActive }) => {
  return (
    <div className={`card flex transition-all duration-500 ${
      isActive ? `animate-slide-up ${delay} opacity-100` : 'opacity-0'
    }`}>
      <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: <Clock size={24} />,
      title: "Real-Time Gesture Detection",
      description: "Instantly recognizes and interprets sign language gestures without noticeable delay.",
      delay: "animate-delay-100"
    },
    {
      icon: <Globe size={24} />,
      title: "Multiple Sign Language Support",
      description: "Supports various sign languages including ASL, BSL, and ISL to serve diverse communities.",
      delay: "animate-delay-200"
    },
    {
      icon: <Headphones size={24} />,
      title: "Natural Voice Output",
      description: "Converts translated text into natural-sounding speech that feels human and authentic.",
      delay: "animate-delay-300"
    },
    {
      icon: <Laptop size={24} />,
      title: "Browser-Based Access",
      description: "Works directly in your web browser with no downloads or installations required.",
      delay: "animate-delay-100"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile and Desktop Friendly",
      description: "Fully responsive design that works seamlessly on smartphones, tablets, and computers.",
      delay: "animate-delay-200"
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Privacy-Focused",
      description: "Processing happens locally in your browser ensuring your conversations remain private.",
      delay: "animate-delay-300"
    },
    {
      icon: <Target size={24} />,
      title: "High Accuracy",
      description: "Advanced algorithms provide industry-leading accuracy in sign language recognition.",
      delay: "animate-delay-100"
    },
    {
      icon: <Check size={24} />,
      title: "Ease of Use",
      description: "Intuitive interface designed to be used by anyone, regardless of technical expertise.",
      delay: "animate-delay-200"
    }
  ];

  return (
    <div className="container-custom">
      <div className="section-title">
        <h2>Powerful Features</h2>
        <p>Our platform combines cutting-edge technology with user-friendly design</p>
      </div>
      
      <div 
        ref={ref}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={feature.delay}
            isActive={inView}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;