'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollProgressBarProps {
    color?: string;
    height?: number;
    position?: 'top' | 'bottom';
    showCompletionMessage?: boolean;
    completionThreshold?: number;
}

const ScrollProgressBar = ({
    color = '#FF4136', // Primary color (red) by default
    height = 4,
    position = 'top',
    showCompletionMessage = true,
    completionThreshold = 0.95
}: ScrollProgressBarProps) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);

    // Subscribe to scrollYProgress changes
    useEffect(() => {
        return scrollYProgress.onChange(v => {
            // Update scroll percentage
            setScrollPercentage(Math.round(v * 100));

            // Check if we've scrolled at least 5%
            setIsVisible(v > 0.05);

            // Check if we've reached the completion threshold
            setIsComplete(v >= completionThreshold);
        });
    }, [scrollYProgress, completionThreshold]);

    // Auto hide the completion message after 3 seconds
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isComplete && showCompletionMessage) {
            timer = setTimeout(() => {
                setIsComplete(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [isComplete, showCompletionMessage]);

    return (
        <>
            {/* Progress bar - Thêm mt-16 để đẩy xuống dưới header */}
            <motion.div
                className={`fixed left-0 right-0 z-[60] ${position === 'top' ? 'mt-16' : ''}`}
                style={{
                    top: position === 'top' ? 0 : 'auto',
                    bottom: position === 'bottom' ? 0 : 'auto',
                    height,
                    background: `linear-gradient(to right, ${color}, #32CD32)`, // Gradient để tạo hiệu ứng đẹp hơn
                    transformOrigin: 'left',
                    scaleX,
                    opacity: isVisible ? 1 : 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)' // Thêm bóng đổ nhẹ để nổi bật
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />



            {/* Completion notification */}
            <AnimatePresence>
                {isComplete && showCompletionMessage && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2.5 rounded-full shadow-xl z-[60]"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm font-medium">Bạn đã xem hết trang!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollProgressBar;
