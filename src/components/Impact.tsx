import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  delay: string;
  isActive: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, image, delay, isActive }) => {
  return (
    <div className={`card transition-all duration-500 ${
      isActive ? `animate-slide-up ${delay} opacity-100` : 'opacity-0'
    }`}>
      <div className="flex items-start mb-4">
        <Quote size={32} className="text-teal-500 mr-2 flex-shrink-0" />
        <p className="text-gray-700 italic">{quote}</p>
      </div>
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

interface CounterProps {
  end: number;
  suffix: string;
  description: string;
  duration: number;
  isActive: boolean;
}

const Counter: React.FC<CounterProps> = ({ end, suffix, description, duration, isActive }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };
    
    animationFrame = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isActive]);
  
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-bold text-teal-600 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Impact: React.FC = () => {
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: countersRef, inView: countersInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const testimonials = [
    {
      quote: "This technology has completely transformed how I communicate with my colleagues. I no longer need an interpreter for most of my workplace interactions.",
      name: "Sarah Johnson",
      role: "Teacher",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300",
      delay: "animate-delay-100"
    },
    {
      quote: "As someone who works with the deaf community, I've seen firsthand how this tool has empowered individuals to engage more confidently in everyday conversations.",
      name: "Michael Chen",
      role: "Community Advocate",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      delay: "animate-delay-300"
    },
    {
      quote: "The accuracy and speed of the translations have made a world of difference in my daily interactions. It's like having an interpreter in my pocket at all times.",
      name: "Emma Rodriguez",
      role: "Software Engineer",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300",
      delay: "animate-delay-500"
    }
  ];

  return (
    <div className="container-custom">
      <div className="section-title">
        <h2>Our Impact</h2>
        <p>Transforming lives through accessible communication technology</p>
      </div>
      
      <div 
        ref={testimonialsRef}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            role={testimonial.role}
            image={testimonial.image}
            delay={testimonial.delay}
            isActive={testimonialsInView}
          />
        ))}
      </div>
      
      <div className="bg-gray-200 rounded-xl text-black p-8">
        <div 
          ref={countersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Counter 
            end={1000} 
            suffix="+" 
            description="Successful Translations" 
            duration={2000}
            isActive={countersInView}
          />
          <Counter 
            end={300} 
            suffix="+" 
            description="Happy Users" 
            duration={2000}
            isActive={countersInView}
          />
          <Counter 
            end={15} 
            suffix="+" 
            description="Supported Countries" 
            duration={2000}
            isActive={countersInView}
          />
          <Counter 
            end={98} 
            suffix="%" 
            description="Accuracy Rate" 
            duration={2000}
            isActive={countersInView}
          />
        </div>
      </div>
    </div>
  );
};

export default Impact;