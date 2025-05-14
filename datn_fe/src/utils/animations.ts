// Variants de animaciones reutilizables para Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 15, 
      stiffness: 300 
    }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 } 
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 } 
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" 
  }
};

// Animaciones de transición de página
export const pageTransition = {
  hidden: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// Text reveal animation
export const textRevealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    }
  }
};

export const textRevealCharacter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

// Text flip hover animation
export const textFlipHover = {
  initial: { rotateX: 0, y: 0 },
  hover: (custom: number) => ({
    rotateX: [0, -90, 0],
    y: [0, -5, 0],
    color: "#FF4136",
    transition: {
      duration: 0.6,
      delay: custom * 0.05, // Stagger effect on hover
      ease: "easeInOut"
    }
  })
};

// Text rotation animation 360 degrees
export const textRotate = {
  initial: { rotate: 0, scale: 1 },
  hover: (custom: number) => ({
    rotate: 360,
    scale: 1.1,
    color: "#FF4136", // Primary red color
    transition: {
      rotate: { duration: 0.4, delay: custom * 0.03 },
      scale: { duration: 0.2, delay: custom * 0.03 },
      color: { duration: 0.3, delay: custom * 0.03 }
    }
  })
};
