import React from 'react';
import { Fingerprint, BrainCircuit, MessageSquare } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, delay, isActive }) => {
  return (
    <div className={`card flex flex-col items-center text-center transition-all duration-500 ${
      isActive ? `animate-slide-up ${delay} opacity-100` : 'opacity-0'
    }`}>
      <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    {
      icon: <Fingerprint size={32} />,
      title: "Sign",
      description: "Use sign language in front of your camera. Our system captures the hand gestures and movements in real-time.",
      delay: "animate-delay-100"
    },
    {
      icon: <BrainCircuit size={32} />,
      title: "Detect",
      description: "Advanced AI algorithms analyze the signs, recognizing patterns and translating them into text with high accuracy.",
      delay: "animate-delay-300"
    },
    {
      icon: <MessageSquare size={32} />,
      title: "Speak",
      description: "The translated text is converted to natural-sounding speech, enabling seamless communication between signers and non-signers.",
      delay: "animate-delay-500"
    }
  ];

  return (
    <div className="container-custom">
      <div className="section-title">
        <h2>How It Works</h2>
        <p>Our technology bridges communication gaps through a simple three-step process</p>
      </div>
      
      <div ref={ref} className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            delay={step.delay}
            isActive={inView}
          />
        ))}
      </div>
      
      {/* Process Flow Arrow */}
      <div className="hidden md:flex justify-center mt-16">
        <div className="h-2 bg-gradient-to-r from-teal-400 via-blue-400 to-teal-400 rounded-full w-1/2"></div>
      </div>
    </div>
  );
};

export default HowItWorks;