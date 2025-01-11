import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Shield, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AdvancedAnimation } from "@/components/ui/advanced-animation";
import { HoverEffect } from "@/components/ui/hover-effect";

const values = [
  {
    name: "Customer First",
    description: "Our customers are at the heart of everything we do. We're committed to delivering exceptional value and service.",
    icon: Users,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Security & Trust",
    description: "We maintain the highest standards of security and privacy, ensuring your data is always protected.",
    icon: Shield,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Passionate Team",
    description: "Our diverse team brings together expertise and passion to create innovative solutions.",
    icon: Heart,
    color: "text-red-500",
    gradient: "from-red-500 to-orange-500",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    bio: "10+ years in tech leadership",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-founder",
    bio: "Former Google engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Award-winning UX designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Product visionary",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative p-8 bg-card rounded-3xl overflow-hidden"
      >
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${value.gradient}`}
          initial={false}
          animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`inline-flex p-3 rounded-2xl ${value.color} bg-opacity-10 mb-6`}
          >
            <value.icon className="w-6 h-6" />
          </motion.div>

          <motion.h3
            className="text-xl font-semibold mb-3"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {value.name}
          </motion.h3>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {value.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AdvancedAnimation />
      <HoverEffect />

      <div className="container mx-auto px-6 py-32">
        {/* Hero section */}
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary mb-6"
          >
            Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            We're on a mission to revolutionize team management by providing powerful, 
            intuitive tools that help businesses work smarter, not harder.
          </motion.p>
        </motion.div>

        {/* Story section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                Founded in 2023, Cohandia emerged from a simple observation: managing teams 
                and projects shouldn't be complicated. Our founders experienced firsthand 
                the challenges of coordinating teams, tracking tasks, and managing costs 
                across multiple tools and platforms.
              </p>
              <p className="text-lg text-muted-foreground">
                This inspired us to create a comprehensive solution that brings together 
                all essential team management tools in one intuitive platform. Today, 
                we're proud to help thousands of businesses streamline their operations 
                and achieve their goals.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <span className="font-bold">Founded:</span> 2023
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">Headquarters:</span> Silicon Valley, CA
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">Team Size:</span> 20+ employees
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-bold">Customers:</span> 1000+ businesses
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard key={value.name} value={value} index={index} />
            ))}
          </div>
        </div>

        {/* Team section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join us in shaping the future of team management
          </h2>
          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="rounded-full px-8"
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/contact")}
                className="rounded-full px-8"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t mt-20 py-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Cohandia. All rights reserved.
            </p>
          </div>
        </footer>
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
