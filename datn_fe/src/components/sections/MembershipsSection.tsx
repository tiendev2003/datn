"use client";

import { motion } from 'framer-motion';
import Link from "next/link";

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const MembershipsSection = () => {
  const memberships = [
    {
      title: "Basic",
      price: "500k",
      period: "month",
      features: [
        "Access to gym facilities",
        "Standard equipment usage",
        "Locker room access",
        "Free fitness assessment",
      ],
      isPopular: false,
      ctaText: "Get Started",
    },
    {
      title: "Premium",
      price: "800k",
      period: "month",
      features: [
        "All Basic features",
        "Unlimited group classes",
        "1 personal training session/month",
        "Access to premium areas",
        "Nutritional consultation",
      ],
      isPopular: true,
      ctaText: "Join Now",
    },
    {
      title: "Elite",
      price: "1.2M",
      period: "month",
      features: [
        "All Premium features",
        "4 personal training sessions/month",
        "Full access to all facilities",
        "Advanced health monitoring",
        "Custom workout plans",
        "Premium merchandise",
      ],
      isPopular: false,
      ctaText: "Go Elite",
    },
  ];

  return (
    <motion.section
      id="memberships"
      className="py-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
          <p className="text-xl text-gray-600">
            Choose the perfect membership option that fits your fitness goals and budget
          </p>
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
          {memberships.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-2xl overflow-hidden ${
                plan.isPopular 
                  ? "bg-white shadow-xl transform md:-translate-y-4 border-2 border-primary" 
                  : "bg-white shadow-md"
              }`}
              variants={cardVariants}
            >
              {plan.isPopular && (
                <div className="bg-primary text-white text-center py-2">
                  <p className="font-medium">Most Popular</p>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">/ {plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/login" 
                  className={`w-full block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.isPopular 
                      ? "bg-primary text-white hover:bg-primary-dark" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            All memberships include a 7-day money-back guarantee. No contracts, cancel anytime.
          </p>
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            View detailed plan comparison
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default MembershipsSection;