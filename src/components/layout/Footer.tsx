import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">RA</span>
            </div>
            <span className="text-gray-900 dark:text-white font-semibold">React Assignment App</span>
          </div>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>© {currentYear} Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for React Assignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};