"use client";

import { motion } from 'framer-motion';
import Link from "next/link";

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Colored circles for visual effect */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/30 filter blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-primary"></span>
              <span>New Features Available in our Mobile App</span>
            </div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8 } }}
            >
              Transform Your Body <span className="text-primary">Transform Your Life</span>
            </motion.h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Join our state-of-the-art gym facility with expert trainers, premium equipment, 
              and a supportive community to help you achieve your fitness goals.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/login" 
                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                Get Started
              </Link>
              
              <Link 
                href="#features" 
                className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
              >
                Learn More
              </Link>
            </div>
            
            {/* App store badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              <p className="w-full text-gray-300 mb-2">Download our mobile app:</p>
              <a href="#" className="flex items-center bg-black rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors">
                <svg className="h-6 w-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.5675 12.0084C17.5548 9.53113 19.6453 8.16442 19.7187 8.11879C18.4248 6.29453 16.3978 6.07488 15.6876 6.05363C13.9686 5.87488 12.3033 7.06038 11.4322 7.06038C10.5421 7.06038 9.18051 6.07488 7.71163 6.10238C5.83633 6.12988 4.08818 7.16442 3.12479 8.81038C1.12383 12.1709 2.64511 17.1032 4.56457 19.5242C5.51921 20.7101 6.63242 22.0493 8.08006 22.0009C9.48934 21.9459 10.0164 21.1147 11.7164 21.1147C13.399 21.1147 13.8987 22.0009 15.3728 21.9686C16.8899 21.9459 17.8627 20.7651 18.7891 19.5676C19.8841 18.1997 20.3203 16.8601 20.3394 16.8059C20.3008 16.7934 17.5839 15.7322 17.5675 12.0084Z"/>
                  <path d="M14.7406 4.32552C15.5146 3.37529 16.0337 2.08389 15.8861 0.774414C14.7867 0.818696 13.4396 1.52657 12.631 2.4509C11.9095 3.27227 11.2815 4.60896 11.4479 5.86722C12.6785 5.95825 13.932 5.26432 14.7406 4.32552Z"/>
                </svg>
                <div>
                  <div className="text-xs text-gray-300">Download on the</div>
                  <div className="text-white font-medium">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center bg-black rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors">
                <svg className="h-6 w-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.9236 8.23227C15.1356 6.67287 10.948 4.12422 3.39873 0.254297V23.7443L17.9236 8.23227Z" fill="#EA4335"/>
                  <path d="M3.39893 0.254297C3.17831 0.147287 2.93956 0.0677695 2.69001 0.0232422C2.33204 -0.0252363 1.96519 0.0106885 1.62522 0.128353C1.28526 0.246017 0.980813 0.441165 0.740783 0.697187C0.500753 0.953209 0.333002 1.26176 0.25217 1.59555C0.171338 1.92933 0.180249 2.27763 0.278202 2.60668C0.355908 2.86284 0.490437 3.09834 0.671928 3.29645L3.39893 0.254297Z" fill="#188038"/>
                  <path d="M17.9236 8.23242L23.5481 5.28867C24.4663 4.76055 24.4663 3.88242 23.5481 3.3543L17.9236 0.368047L12.6611 5.8043L17.9236 8.23242Z" fill="#FBBC04"/>
                  <path d="M3.39893 23.7441L12.2762 17.6399L17.9236 8.23242L3.39893 23.7441Z" fill="#4285F4"/>
                </svg>
                <div>
                  <div className="text-xs text-gray-300">GET IT ON</div>
                  <div className="text-white font-medium">Google Play</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="hidden lg:block relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-30 blur-xl"></div>
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="aspect-[9/16] bg-gray-800 w-full">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-primary/30 flex items-center justify-center">
                    <svg className="h-24 w-24 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile app UI mockup */}
            <div className="absolute -bottom-12 -right-12 w-2/3">
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="py-2 px-4">
                  <div className="flex items-center justify-between">
                    <div className="text-white text-xs font-medium">FitHub App</div>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-6">
                  <div className="space-y-3">
                    <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/20 rounded-full"></div>
                    <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="bg-primary/20 rounded-lg p-3 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xs font-bold mb-2">85%</div>
                      <div className="h-1 bg-white/20 rounded-full w-2/3"></div>
                      <div className="h-1 bg-white/10 rounded-full w-1/2 mt-1"></div>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold mb-2">12</div>
                      <div className="h-1 bg-white/20 rounded-full w-2/3"></div>
                      <div className="h-1 bg-white/10 rounded-full w-1/2 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;