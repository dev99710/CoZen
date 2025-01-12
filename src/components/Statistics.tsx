import { Users, Brain, BarChart3, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  {
    title: "Active Users",
    value: 2500,
    icon: Users,
    description: "Trusted by companies worldwide",
  },
  {
    title: "Tasks Optimized",
    value: 15000,
    icon: Brain,
    description: "AI-powered task allocation",
  },
  {
    title: "Efficiency Increase",
    value: 35,
    icon: TrendingUp,
    description: "Average productivity boost",
  },
  {
    title: "Performance Insights",
    value: 1000,
    icon: BarChart3,
    description: "Daily analytics processed",
  },
];

export const Statistics = () => {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) =>
        prev.map((value, index) => {
          const target = stats[index].value;
          const increment = Math.ceil(target / 50);
          return value + increment >= target ? target : value + increment;
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                <stat.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                {typeof stat.value === "number" && stat.value > 100
                  ? `${Math.round(animatedStats[index] / 100) / 10}k+`
                  : `${animatedStats[index]}%`}
              </h3>
              <p className="text-xl font-semibold text-center mb-2">{stat.title}</p>
              <p className="text-gray-600 text-center">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};