import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AdvancedAnimation } from "@/components/ui/advanced-animation";
import { HoverEffect } from "@/components/ui/hover-effect";
import { motion, useScroll, useTransform } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Perfect for small teams just getting started.",
    features: [
      {
        text: "Up to 5 team members",
        tooltip: "Add up to 5 workers to your team"
      },
      {
        text: "Basic task management",
        tooltip: "Create and assign tasks with basic priority levels"
      },
      {
        text: "Time tracking",
        tooltip: "Track time spent on tasks"
      },
      {
        text: "Cost monitoring",
        tooltip: "Basic cost tracking for tasks and workers"
      },
      {
        text: "Email support",
        tooltip: "Get help via email within 24 hours"
      }
    ],
    popular: false
  },
  {
    name: "Professional",
    id: "tier-professional",
    priceMonthly: "$29",
    priceYearly: "$290",
    description: "Ideal for growing businesses with more needs.",
    features: [
      {
        text: "Up to 25 team members",
        tooltip: "Add up to 25 workers to your team"
      },
      {
        text: "Advanced task management",
        tooltip: "Advanced task features including dependencies and milestones"
      },
      {
        text: "Time tracking & reporting",
        tooltip: "Detailed time tracking with custom reports"
      },
      {
        text: "Cost analytics",
        tooltip: "Advanced cost tracking and forecasting"
      },
      {
        text: "Priority support",
        tooltip: "Get help via email within 4 hours"
      },
      {
        text: "Custom fields",
        tooltip: "Add custom fields to tasks and worker profiles"
      },
      {
        text: "API access",
        tooltip: "Access our API for custom integrations"
      }
    ],
    popular: true
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    priceMonthly: "$99",
    priceYearly: "$990",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      {
        text: "Unlimited team members",
        tooltip: "No limit on the number of workers"
      },
      {
        text: "Advanced task management",
        tooltip: "All professional features plus custom workflows"
      },
      {
        text: "Advanced analytics",
        tooltip: "Custom dashboards and advanced reporting"
      },
      {
        text: "Custom integrations",
        tooltip: "Custom integrations with your existing tools"
      },
      {
        text: "24/7 phone support",
        tooltip: "Round-the-clock phone and email support"
      },
      {
        text: "SSO authentication",
        tooltip: "Single sign-on with your identity provider"
      },
      {
        text: "Custom contract",
        tooltip: "Customized contract with SLA guarantees"
      }
    ],
    popular: false
  }
];

export default function Pricing() {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedAnimation />
      <HoverEffect />

      {/* Hero section */}
      <main className="py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            style={{ opacity, y }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </motion.div>

          {/* Pricing toggle */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-4">
              <span className={annual ? "text-muted-foreground" : "font-semibold"}>
                Monthly billing
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnnual(!annual)}
                className={`relative ${annual ? "bg-primary" : ""}`}
              >
                <span className={`absolute left-2 h-4 w-4 rounded-full bg-background transition-transform ${annual ? "translate-x-6" : ""}`} />
              </Button>
              <span className={annual ? "font-semibold" : "text-muted-foreground"}>
                Annual billing
                <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                  Save 20%
                </span>
              </span>
            </div>
          </div>

          {/* Pricing cards */}
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                key={tier.id}
                className={`rounded-3xl p-8 ring-1 ${
                  tier.popular
                    ? "bg-primary text-primary-foreground ring-primary"
                    : "bg-background ring-muted"
                }`}
              >
                <h3
                  className={`text-lg font-semibold leading-8 ${
                    tier.popular ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-4 text-sm leading-6 ${
                    tier.popular
                      ? "text-primary-foreground/90"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span
                    className={`text-4xl font-bold tracking-tight ${
                      tier.popular ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {annual ? tier.priceYearly : tier.priceMonthly}
                  </span>
                  <span
                    className={`text-sm font-semibold leading-6 ${
                      tier.popular
                        ? "text-primary-foreground/90"
                        : "text-muted-foreground"
                    }`}
                  >
                    /month
                  </span>
                </p>
                <Button
                  variant={tier.popular ? "secondary" : "default"}
                  className="mt-6 w-full"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
                <ul
                  className={`mt-8 space-y-3 text-sm leading-6 ${
                    tier.popular
                      ? "text-primary-foreground/90"
                      : "text-muted-foreground"
                  }`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      <Check
                        className={`h-6 w-5 flex-none ${
                          tier.popular ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                      <span>{feature.text}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* FAQ section */}
          <div className="mx-auto max-w-4xl mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Frequently asked questions
            </h2>
            <dl className="space-y-8">
              <div>
                <dt className="text-lg font-semibold">
                  Can I try before I buy?
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  Yes! We offer a 14-day free trial on all plans. No credit card required.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">
                  What payment methods do you accept?
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">
                  Can I change plans later?
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">
                  What happens after my trial?
                </dt>
                <dd className="mt-2 text-muted-foreground">
                  After your trial ends, you'll be prompted to choose a plan. Don't worry, we'll remind you before it ends.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t mt-20">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-muted-foreground">
              &copy; 2025 Cohandia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

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
