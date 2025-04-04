import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Stats } from "@/components/landing/Stats";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdvancedAnimation } from "@/components/ui/advanced-animation";
import { HoverEffect } from "@/components/ui/hover-effect";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

// Magnetic button component
function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const x = clientX - centerX;
    const y = clientY - centerY;

    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        reset();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      animate={{
        x: isHovered ? x / 3 : 0,
        y: isHovered ? y / 3 : 0,
      }}
      {...props}
    >
      <motion.div
        animate={{
          x: isHovered ? x / 4 : 0,
          y: isHovered ? y / 4 : 0,
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AdvancedAnimation />
      <HoverEffect />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <motion.div 
          style={{ opacity, scale }}
          className="px-6 pt-14 lg:px-8"
        >
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 animate-gradient relative cursor-default"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                Welcome to Cohandia
                <motion.span
                  className="absolute -inset-x-2 inset-y-4 bg-primary/10 blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg leading-8 text-muted-foreground cursor-default"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                Empower your business with our innovative solutions. 
                Experience the next generation of task management and collaboration.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <MagneticButton
                  onClick={() => navigate("/signin")}
                  className="relative px-8 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg overflow-hidden hover:bg-purple-700 transition-colors"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-purple-600/50"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Get Started</span>
                </MagneticButton>
                <MagneticButton
                  onClick={() => navigate("/features")}
                  className="relative px-8 py-3 text-lg font-semibold text-purple-600 border-2 border-purple-600/20 rounded-lg overflow-hidden hover:bg-purple-50 transition-colors"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-400/10"
                    animate={{
                      x: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Learn More</span>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features and other sections */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <Features />
          <Stats />
          <Testimonials />
          <Pricing />
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative bg-background/80 backdrop-blur-sm border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; 2025 Cohandia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
