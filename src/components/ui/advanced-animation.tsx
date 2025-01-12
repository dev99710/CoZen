import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AdvancedAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring animation for smooth cursor following
  const springConfig = { damping: 15, stiffness: 150 };
  const moveX = useSpring(cursorX, springConfig);
  const moveY = useSpring(cursorY, springConfig);

  // Transform values for parallax effect
  const rotateX = useTransform(moveY, [-300, 300], [10, -10]);
  const rotateY = useTransform(moveX, [-300, 300], [-10, 10]);
  const translateZ = useTransform(moveY, [-300, 300], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      cursorX.set(clientX - centerX);
      cursorY.set(clientY - centerY);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
          translateZ,
        }}
        className="absolute inset-0"
      >
        {/* Floating orbs */}
        <motion.div
          className="absolute h-[800px] w-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"
          style={{
            x: moveX,
            y: moveY,
            scale: 1.2,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />

        {/* Interactive grid */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            return (
              <motion.div
                key={i}
                className="relative"
                style={{
                  opacity: useTransform(
                    [moveX, moveY],
                    ([latestX, latestY]) => {
                      const distance = Math.sqrt(
                        Math.pow((col - 4) * 100 - latestX, 2) +
                        Math.pow((row - 4) * 100 - latestY, 2)
                      );
                      return Math.max(0, 1 - distance / 500);
                    }
                  ),
                }}
              >
                <div className="absolute inset-1 rounded-lg bg-primary/5 backdrop-blur-sm" />
              </motion.div>
            );
          })}
        </div>

        {/* Glowing cursor trail */}
        <motion.div
          className="pointer-events-none absolute -inset-px"
          style={{
            background: useTransform(
              [moveX, moveY],
              ([latestX, latestY]) =>
                `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.15), transparent 80%)`
            ),
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 h-full w-full">
          <motion.path
            d="M0 100 Q 250 50 500 100 T 1000 100"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M0 100 Q 250 50 500 100 T 1000 100",
                "M0 100 Q 250 150 500 100 T 1000 100",
                "M0 100 Q 250 50 500 100 T 1000 100",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.2)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
    </div>
  );
}
