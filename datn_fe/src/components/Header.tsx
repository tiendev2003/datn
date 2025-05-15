'use client';

import { textRevealCharacter, textRevealContainer, textRotate } from '@/utils/animations';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Navigation link with hover animation
  const NavLink = ({ href, children, onClick = () => {} }: NavLinkProps) => (
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
  const MobileNavLink = ({ href, label, index, onClick = () => {} }: MobileNavLinkProps) => (
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed w-full top-0 z-50 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-secondary'
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
          <NavLink href="/#about">Giới thiệu</NavLink>
          <NavLink href="/#packages">Gói tập</NavLink>
          <NavLink href="/#trainers">Huấn luyện viên</NavLink>
          <NavLink href="/#facilities">Cơ sở vật chất</NavLink>
          <NavLink href="/#contact">Liên hệ</NavLink>
        </nav>

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

            {/* Action buttons */}
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
