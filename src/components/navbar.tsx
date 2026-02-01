'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/#contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-card/95 border-border/50 sticky top-0 z-50 border-b shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="ILKKA Logo"
              width={120}
              height={48}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 group relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300"
              >
                {link.label}
                <span className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-0 transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="hover:bg-muted rounded-lg p-2 transition-colors duration-300 md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
        >
          <div className="bg-card border-border/50 space-y-1 border-t px-2 pt-2 pb-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 block rounded-lg px-3 py-3 text-base font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
