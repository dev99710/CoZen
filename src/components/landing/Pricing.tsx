import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    price: "$0",
    description: "Perfect for small teams just getting started.",
    features: [
      "Up to 5 team members",
      "Basic task management",
      "Time tracking",
      "Cost monitoring",
      "Email support",
    ],
    featured: false,
  },
  {
    name: "Professional",
    id: "tier-professional",
    href: "#",
    price: "$29",
    description: "Ideal for growing businesses with more needs.",
    features: [
      "Up to 25 team members",
      "Advanced task management",
      "Time tracking & reporting",
      "Cost analytics",
      "Priority support",
      "Custom fields",
      "API access",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: "$99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited team members",
      "Advanced task management",
      "Advanced analytics",
      "Custom integrations",
      "24/7 phone support",
      "SSO authentication",
      "Custom contract",
    ],
    featured: false,
  },
];

export function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Choose the right plan for&nbsp;you
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose an affordable plan that's packed with the best features for your needs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-3 px-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: tier.featured ? 1.05 : 1.02 }}
              className={`relative flex flex-col min-h-[700px] rounded-3xl p-2 ${
                tier.featured
                  ? "bg-primary text-primary-foreground shadow-xl ring-1 ring-primary scale-105 lg:scale-110"
                  : "bg-card ring-1 ring-muted"
              }`}
            >
              {tier.featured && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 left-0 right-0 mx-auto w-48"
                >
                  <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary-foreground to-primary-foreground/90 py-2.5 text-center text-sm font-medium text-primary shadow-lg">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                      animate={{
                        x: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 text-base font-semibold">Most Popular</span>
                  </div>
                </motion.div>
              )}

              <div className="p-8 flex-1 rounded-2xl bg-background/5">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="text-3xl font-bold leading-8"
                >
                  {tier.name}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  className="mt-4 text-base leading-6 text-muted-foreground"
                >
                  {tier.description}
                </motion.p>
                <div className="mt-8 flex items-baseline gap-x-2">
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-6xl font-bold tracking-tight"
                  >
                    {tier.price}
                  </motion.span>
                  <span className="text-base font-semibold">
                    /month
                  </span>
                </div>

                <Button
                  variant={tier.featured ? "secondary" : "default"}
                  size="lg"
                  className="mt-8 w-full py-6 text-lg font-semibold"
                  onClick={() => navigate("/signin")}
                >
                  Get Started
                </Button>
              </div>

              <div className="p-8">
                <ul className="space-y-5 text-base leading-6">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={feature} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.1 }}
                      className="flex gap-x-4 items-center"
                    >
                      <Check
                        className={`h-6 w-6 flex-none ${
                          tier.featured ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                      <span className="text-lg">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
