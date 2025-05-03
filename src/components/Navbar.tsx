import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110">
            <MessageSquare size={24} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary bg-clip-text text-transparent">
            SignSync
          </span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks scrolled={scrolled} mobile={false} onClose={() => {}} />
          <ThemeToggle />
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-light-primary dark:text-dark-primary focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-custom py-6">
          <NavLinks scrolled={true} mobile={true} onClose={closeMenu} />
        </div>
      </div>
    </nav>
  );
};

interface NavLinksProps {
  scrolled: boolean;
  mobile: boolean;
  onClose: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ mobile, onClose }) => {
  const links = [
    { text: 'Home', href: '#hero' },
    { text: 'How It Works', href: '#how-it-works' },
   
    { text: 'Translation', href: '#demo' },
    { text: 'Get Started', href: '#get-started' },
  ];

  return (
    <div className={mobile ? 'flex flex-col space-y-4' : 'flex gap-8 items-center'}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`nav-link text-light-primary dark:text-dark-primary hover:text-light-secondary dark:hover:text-dark-secondary ${
            mobile ? 'text-lg py-2' : ''
          }`}
          onClick={onClose}
        >
          {link.text}
        </a>
      ))}
      {!mobile && (
        <a 
          href="#get-started" 
          className="btn btn-primary bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white"
        >
          Start Now
        </a>
      )}
    </div>
  );
};

export default Navbar;