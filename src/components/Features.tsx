import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, Clock, Users } from "lucide-react";

const features = [
  {
    title: "AI-Powered Task Allocation",
    description: "Optimize task distribution using advanced AI algorithms",
    icon: Brain,
  },
  {
    title: "Real-time Performance Tracking",
    description: "Monitor and analyze worker performance metrics instantly",
    icon: BarChart3,
  },
  {
    title: "Efficient Time Management",
    description: "Track and optimize time spent on various tasks",
    icon: Clock,
  },
  {
    title: "Team Collaboration",
    description: "Foster better communication and team coordination",
    icon: Users,
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};