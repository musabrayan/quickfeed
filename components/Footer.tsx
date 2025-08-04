'use client';

import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface FooterProps {
  year?: number;
  email?: string;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Sign In', href: '/signin' },
] as const;

const Footer: React.FC<FooterProps> = ({
  year = new Date().getFullYear(),
  email = 'support@quickfeed.io',
}) => {
  return (
    <footer className="py-10 mt-16 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Quickfeed Logo" 
              className="h-6 w-6  dark:invert"
            />
              QuickFeed
            </h3>
            <p className="text-sm text-muted-foreground">
              Collect and showcase real feedback effortlessly.
            </p>
            <p className="text-sm text-muted-foreground">© {year} QuickFeed. All rights reserved.</p>
          </div>

  
          <div>
            <h4 className="text-md font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

   
          <div>
            <h4 className="text-md font-semibold mb-4">Connect with Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/musabrayan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaGithub size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://x.com/musabrayan_17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.linkedin.com/in/musab-rayan-87a391267/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <FaLinkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaEnvelope className="w-4 h-4" />
              <a href={`mailto:${email}`} className="hover:underline">
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>QuickFeed helps businesses grow by providing feedback solutions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
