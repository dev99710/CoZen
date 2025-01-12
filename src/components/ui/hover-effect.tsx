import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function HoverEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center
      mouseX.set((clientX - centerX) / 10);
      mouseY.set((clientY - centerY) / 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 transition duration-300">
      {/* Subtle gradient overlay that follows mouse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            600px circle at ${x.get() + window.innerWidth / 2}px ${
              y.get() + window.innerHeight / 2
            }px,
            rgba(147, 51, 234, 0.05),
            transparent 40%
          )`,
        }}
      />

      {/* Animated lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.02]">
        <motion.g style={{ x, y }}>
          <pattern
            id="pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="100%" height="100%" fill="none" />
            <path
              d="M 0,20 L 40,20"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M 20,0 L 20,40"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </motion.g>
      </svg>
    </div>
  );
}
