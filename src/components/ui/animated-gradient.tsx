import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AnimatedGradient() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const moveX = useSpring(cursorX, springConfig);
  const moveY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX - window.innerWidth / 2);
      cursorY.set(clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      {/* Animated gradient orbs that follow cursor */}
      <motion.div
        style={{
          x: moveX,
          y: moveY,
        }}
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-gradient-to-l from-blue-500/30 to-purple-500/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-gradient-to-t from-purple-500/30 to-pink-500/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black, transparent)",
        }}
      />
    </div>
  );
}
