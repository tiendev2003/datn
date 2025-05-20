'use client';

import { useAuth } from '@/context/AuthContext';
import { textRevealCharacter, textRevealContainer, textRotate } from '@/utils/animations';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import MessageNotificationBadge from './MessageNotificationBadge';
import TextFlip from './TextFlip';

// Define prop types for components
interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

interface MobileNavLinkProps {
  href: string;
  label: string;
  index: number;
  onClick?: () => void;
}

interface HeaderProps {
  isAccountPage?: boolean;
}

// Text reveal component for animating text
const TextReveal = ({ text }: { text: string }) => {
  return (
    <motion.div
      variants={textRevealContainer}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={textRevealCharacter}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Legacy TextFlip component - keeping it for reference
const TextFlipLegacy = ({ text }: { text: string }) => {
  return (
    <div className="inline-block overflow-hidden">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block transform-gpu"
          initial="initial"
          whileHover="hover"
          custom={index}
          variants={textRotate}
          style={{
            transformOrigin: "center center",
            display: "inline-block",
            backfaceVisibility: "hidden"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const Header = ({ isAccountPage = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  // Mock remaining days data - this should come from your API
  const remainingDays = 30;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Disable scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Close user menu when clicking outside
    const closeUserMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', closeUserMenu);
    return () => {
      document.removeEventListener('click', closeUserMenu);
    };
  }, [isUserMenuOpen]);

  // Navigation link with hover animation
  const NavLink = ({ href, children, onClick = () => { } }: NavLinkProps) => (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className={`${isScrolled ? 'text-secondary' : 'text-white'} hover:text-primary transition duration-300`}
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );

  // Mobile navigation link with animation
  const MobileNavLink = ({ href, label, index, onClick = () => { } }: MobileNavLinkProps) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      className="border-b border-white/20 py-2"
    >
      <Link
        href={href}
        className="text-white text-xl font-medium transition-colors duration-300 block"
        onClick={onClick}
      >
        <TextFlip text={label} className="hover:text-primary" delay={0.03} />
      </Link>
    </motion.div>
  );

  // Render auth buttons (login/register) or user profile based on authentication status
  const renderAuthSection = () => {
    if (isAuthenticated && user) {
      return (
        <div className="relative user-menu-container">
          <div className="flex items-center space-x-2">
            {/* Message notification */}
            {
              user.role === 'user'  || user.role === 'trainer' && (
                <Link href="/account/messages" className="hidden md:block">
                  <MessageNotificationBadge
                    className={isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20 text-white'}
                  />
                </Link>)
            }
           

            {/* Membership days remaining tag */}
            <div className="hidden md:flex items-center mr-4">
              <div className={`${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-full px-3 py-1 text-xs font-semibold flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Còn {remainingDays} ngày tập</span>
              </div>
            </div>

            {/* User info and avatar with dropdown - Adding onClick handler here */}
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleUserMenu}
            >
              <div className="hidden md:block text-right">
                <p className={`font-medium ${isScrolled ? 'text-secondary' : 'text-white'}`}>{user.fullName}</p>
                <p className={`text-xs ${isScrolled ? 'text-secondary/70' : 'text-white/70'}`}>{user.role === 'user' ? 'Hội viên' : user.role === 'trainer' ? 'Huấn luyện viên' : 'Quản trị viên'}</p>
              </div>

              {/* Avatar */}
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary ml-2">
                <Image
                  src="https://via.placeholder.com/150"
                  alt="User avatar"
                  fill
                  className="object-cover"
                />
                <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ${isScrolled ? 'border-white' : 'border-secondary'} border-2`}></div>
              </div>

              {/* Dropdown arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ml-1 ${isUserMenuOpen ? 'rotate-180' : ''} ${isScrolled ? 'text-secondary' : 'text-white'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* User dropdown menu */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-50 ${isScrolled ? 'border border-gray-200' : ''}`}
              >
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {/* Mobile only - membership days remaining */}
                <div className="md:hidden px-4 py-2 border-b">
                  <div className="flex items-center text-sm text-primary font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Còn {remainingDays} ngày tập</span>
                  </div>
                </div>

                {user.role === 'trainer' ? (
                  <Link href="/account/trainer/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard Huấn luyện viên
                    </div>
                  </Link>
                ) : (
                  <Link href="/account/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Bảng điều khiển
                    </div>
                  </Link>
                )}

                <Link href="/account/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Cài đặt tài khoản
                  </div>
                </Link>

                {user.role === 'trainer' ? (
                  <>
                    <Link href="/account/trainer/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Lịch PT
                      </div>
                    </Link>

                    <Link href="/account/trainer/clients" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Khách hàng
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/account/membership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        Gói tập của tôi
                      </div>
                    </Link>

                    <Link href="/account/schedule" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors duration-200">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Lịch tập
                      </div>
                    </Link>
                  </>
                )}

                <div className="border-t my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center space-x-4"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/login"
            className={`px-4 py-2 border border-primary ${isScrolled ? 'text-secondary' : 'text-white'} rounded-md hover:bg-primary hover:text-white transition duration-300`}
          >
            Đăng nhập
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block"
        >
          <Link
            href="/register"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
          >
            Đăng ký
          </Link>
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={`md:hidden ${isScrolled ? 'text-secondary' : 'text-white'}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    );
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed w-full top-0 z-50 ${isScrolled ? 'bg-white shadow-sm' : 'bg-secondary'
        } transition-all duration-300`}
    >
      <div className="container flex justify-between items-center py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="text-2xl font-bold text-primary">
            GYM<span className={isScrolled ? 'text-secondary' : 'text-white'}>MASTER</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {!isAccountPage && (
            <>
              <NavLink href="/#about">Giới thiệu</NavLink>
              <NavLink href="/#packages">Gói tập</NavLink>
              <NavLink href="/#trainers">Huấn luyện viên</NavLink>
              <NavLink href="/#facilities">Cơ sở vật chất</NavLink>
              <NavLink href="/#contact">Liên hệ</NavLink>
            </>
          )}
          {isAccountPage && (
            <>
              <NavLink href="/account/dashboard">Dashboard</NavLink>
              <NavLink href="/account/settings">Cài đặt</NavLink>
            </>
          )}
        </nav>

        {renderAuthSection()}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-gradient-to-b from-secondary via-secondary to-black/90 z-40 flex flex-col md:hidden"
          >
            {/* Red accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-0 left-0 w-full h-1 bg-primary origin-left"
            ></motion.div>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors duration-300"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-16 mb-10"
            >
              <Link href="/" className="text-3xl font-bold text-white" onClick={toggleMenu}>
                <TextFlip text="GYMMASTER" />
              </Link>
            </motion.div>

            {/* Navigation links */}
            <nav className="flex flex-col space-y-5 px-8">
              {[
                { href: "/#about", label: "Giới thiệu" },
                { href: "/#packages", label: "Gói tập" },
                { href: "/#trainers", label: "Huấn luyện viên" },
                { href: "/#facilities", label: "Cơ sở vật chất" },
                { href: "/#contact", label: "Liên hệ" }
              ].map((link, index) => (
                <MobileNavLink
                  key={index}
                  href={link.href}
                  label={link.label}
                  index={index}
                  onClick={toggleMenu}
                />
              ))}
            </nav>

            {/* User section for mobile */}
            {isAuthenticated && user ? (
              <div className="px-8 mt-10 space-y-4">
                <div className="flex items-center space-x-4 py-3 border-t border-white/10">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src="https://via.placeholder.com/150"
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.fullName}</p>
                    <p className="text-white/70 text-sm">{user.email}</p>
                  </div>
                </div>

                {/* Membership days remaining for mobile */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 mt-4">
                  <div className="flex items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Còn {remainingDays} ngày tập</span>
                  </div>
                </div>

                {/* Message notifications for mobile */}
                <div className="flex justify-center mt-3">
                  <Link
                    href="/account/messages"
                    className="inline-block"
                    onClick={toggleMenu}
                  >
                    <MessageNotificationBadge className="text-white hover:bg-white/20" />
                  </Link>
                </div>

                <div className="space-y-2 mt-4">
                  {user.role === 'trainer' ? (
                    <Link
                      href="/account/trainer/dashboard"
                      className="block w-full px-6 py-3 bg-white/10 text-white text-center rounded-md hover:bg-white/20 transition-colors duration-300 font-medium"
                      onClick={toggleMenu}
                    >
                      <TextFlip text="Dashboard Huấn luyện viên" />
                    </Link>
                  ) : (
                    <Link
                      href="/account/dashboard"
                      className="block w-full px-6 py-3 bg-white/10 text-white text-center rounded-md hover:bg-white/20 transition-colors duration-300 font-medium"
                      onClick={toggleMenu}
                    >
                      <TextFlip text="Bảng điều khiển" />
                    </Link>
                  )}

                  {user.role === 'trainer' ? (
                    <>
                      <Link
                        href="/account/trainer/schedule"
                        className="block w-full px-6 py-3 bg-white/10 text-white text-center rounded-md hover:bg-white/20 transition-colors duration-300 font-medium"
                        onClick={toggleMenu}
                      >
                        <TextFlip text="Lịch PT" />
                      </Link>

                      <Link
                        href="/account/trainer/clients"
                        className="block w-full px-6 py-3 bg-white/10 text-white text-center rounded-md hover:bg-white/20 transition-colors duration-300 font-medium"
                        onClick={toggleMenu}
                      >
                        <TextFlip text="Khách hàng" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/account/membership"
                        className="block w-full px-6 py-3 bg-white/10 text-white text-center rounded-md hover:bg-white/20 transition-colors duration-300 font-medium"
                        onClick={toggleMenu}
                      >
                        <TextFlip text="Gói tập của tôi" />
                      </Link>
                    </>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-primary/90 text-white text-center rounded-md hover:bg-primary transition-colors duration-300 font-medium"
                  >
                    <TextFlip text="Đăng xuất" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-8 mt-10 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="overflow-hidden"
                >
                  <Link
                    href="/login"
                    className="block w-full px-6 py-3 border border-white text-white text-center rounded-md hover:bg-white hover:text-secondary transition-colors duration-300 font-medium"
                    onClick={toggleMenu}
                  >
                    <TextFlip text="Đăng nhập" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="overflow-hidden"
                >
                  <Link
                    href="/register"
                    className="block w-full px-6 py-3 bg-primary text-white text-center rounded-md hover:bg-primary-dark transition-colors duration-300 font-medium"
                    onClick={toggleMenu}
                  >
                    <TextFlip text="Đăng ký ngay" />
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Social media icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-auto mb-6 px-8"
            >
              <p className="text-white/60 text-center mb-4">
                <TextFlip text="Kết nối với chúng tôi" />
              </p>
              <div className="flex justify-center space-x-6">
                {[
                  { href: "#", icon: <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /> },
                  { href: "#", icon: <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /> },
                  { href: "#", icon: <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /> }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="px-8 mb-8 text-center"
            >
              <p className="text-white/50 text-sm">
                <TextFlip text={`© ${new Date().getFullYear()} GYMMASTER`} />
                <br />
                <span className="text-xs">
                  <TextFlip text="Tất cả quyền được bảo lưu" />
                </span>
              </p>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
