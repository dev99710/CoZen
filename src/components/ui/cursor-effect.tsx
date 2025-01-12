import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorEffect() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring animation for smooth cursor following
  const springConfig = { damping: 25, stiffness: 700 };
  const mainCursorX = useSpring(cursorX, springConfig);
  const mainCursorY = useSpring(cursorY, springConfig);

  // Slower following cursor for trail effect
  const trailConfig = { damping: 15, stiffness: 150 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          x: mainCursorX,
          y: mainCursorY,
        }}
      >
        <motion.div
          className="relative flex h-4 w-4 items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute h-full w-full rounded-full bg-white" />
          <motion.div
            className="absolute h-full w-full rounded-full bg-white"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ opacity: 0.2 }}
          />
        </motion.div>
      </motion.div>

      {/* Cursor trail */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none fixed z-50 h-1 w-1 rounded-full bg-white mix-blend-difference"
          style={{
            x: trailX,
            y: trailY,
            opacity: 0.2 - i * 0.05,
            scale: 1 - i * 0.1,
            filter: "blur(1px)",
          }}
          transition={{
            delay: i * 0.05,
          }}
        />
      ))}

      {/* Magnetic effect area */}
      <motion.div
        className="pointer-events-none fixed z-40 h-32 w-32 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
