"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo component đã được mount để tránh hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle navbar styling on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Toggle theme function
  const toggleDarkMode = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const navbarBg = scrolled
    ? 'py-2 bg-white dark:bg-gray-800 shadow-md'
    : 'py-4 bg-transparent';

  const textColor = scrolled || resolvedTheme === 'dark'
    ? 'text-gray-800 dark:text-white'
    : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary"
          >
            FitHub
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/#features"
              className={`${textColor} hover:text-primary transition-colors`}
            >
              Features
            </Link>
            <Link
              href="/#memberships"
              className={`${textColor} hover:text-primary transition-colors`}
            >
              Memberships
            </Link>
            <Link
              href="/#trainers"
              className={`${textColor} hover:text-primary transition-colors`}
            >
              Trainers
            </Link>

            <Link
              href="/#contact"
              className={`${textColor} hover:text-primary transition-colors`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full focus:outline-none ${textColor}`}
                aria-label="Toggle Dark Mode"
              >
                {resolvedTheme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            )}

            {/* Login Button */}
            <Link
              href="/login"
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                scrolled || resolvedTheme === 'dark'
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle Mobile */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className={`p-1 rounded-full focus:outline-none ${textColor}`}
                aria-label="Toggle Dark Mode"
              >
                {resolvedTheme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${textColor} focus:outline-none`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg mt-2 py-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/#features"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#memberships"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Memberships
            </Link>
            <Link
              href="/#trainers"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trainers
            </Link>
            <Link
              href="/#classes"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Classes
            </Link>
            <Link
              href="/#contact"
              className="text-gray-800 dark:text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-full font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;