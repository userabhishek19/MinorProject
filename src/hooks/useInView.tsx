import { useState, useEffect, useRef, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView({ 
  threshold = 0, 
  rootMargin = '0px', 
  triggerOnce = false 
}: InViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const enteredRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (triggerOnce && isIntersecting && !enteredRef.current) {
          setInView(true);
          enteredRef.current = true;
          
          // Disconnect once triggered if triggerOnce is true
          observerRef.current?.disconnect();
        } else if (!triggerOnce) {
          setInView(isIntersecting);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}