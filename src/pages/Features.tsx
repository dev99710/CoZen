import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { HoverEffect } from "@/components/ui/hover-effect";
import { AdvancedAnimation } from "@/components/ui/advanced-animation";
import { Check, Zap, Shield, Clock, LineChart, Users } from "lucide-react";

const features = [
  {
    name: "Lightning Fast Performance",
    description: "Experience blazing fast load times and smooth interactions with our optimized platform.",
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and advanced threat protection.",
    icon: Shield,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Real-time Updates",
    description: "Stay synchronized with instant updates and real-time collaboration features.",
    icon: Clock,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    name: "Advanced Analytics",
    description: "Gain deep insights with our powerful analytics and reporting tools.",
    icon: LineChart,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Team Collaboration",
    description: "Work together seamlessly with integrated team features and shared workspaces.",
    icon: Users,
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "Premium Support",
    description: "Get 24/7 support from our dedicated team of experts.",
    icon: Check,
    color: "text-red-500",
    gradient: "from-red-500 to-pink-500",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative p-8 bg-card rounded-3xl overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${feature.gradient}`}
          initial={false}
          animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10">
          {/* Icon with glow effect */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`inline-flex p-3 rounded-2xl ${feature.color} bg-opacity-10 mb-6 relative`}
          >
            <feature.icon className="w-6 h-6" />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  `0 0 0 0px ${feature.color}`,
                  `0 0 0 10px transparent`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Text content */}
          <motion.h3
            className="text-xl font-semibold mb-3"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {feature.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Features() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <HoverEffect />

      {/* Hero section */}
      <motion.div
        style={{ y, opacity }}
        className="relative pt-24 pb-32 text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary mb-6"
        >
          Powerful Features
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground"
        >
          Discover the tools and features that make our platform stand out.
          Built for performance, security, and seamless collaboration.
        </motion.p>
      </motion.div>

      {/* Features grid */}
      <div className="relative px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Animated background lines */}
      <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
        <motion.g
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 50V.5H50" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
        </motion.g>
      </svg>
    </div>
  );
}
