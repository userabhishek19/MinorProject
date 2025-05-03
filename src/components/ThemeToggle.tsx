import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 rounded-full bg-gradient-to-r transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-light-primary dark:focus:ring-dark-primary group"
      style={{
        backgroundImage: theme === 'light' 
          ? 'linear-gradient(to right,rgb(47, 17, 83),rgb(7, 8, 52))' 
          : 'linear-gradient(to right,rgb(47, 17, 83)#006A67,rgb(47, 17, 83))'
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <div
        className={`absolute left-1 transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
          {theme === 'light' ? (
            <Sun size={12} className="text-light-primary" />
          ) : (
            <Moon size={12} className="text-dark-primary" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;