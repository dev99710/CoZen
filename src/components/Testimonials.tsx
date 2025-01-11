import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "TechCorp Inc.",
    content:
      "Co-hand has revolutionized how we manage our workforce. The AI-powered task allocation has increased our efficiency by 40%.",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Michael Chen",
    role: "HR Director",
    company: "Global Solutions",
    content:
      "The performance tracking and analytics features have given us unprecedented insights into our team's productivity.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Emma Davis",
    role: "Team Lead",
    company: "Innovation Labs",
    content:
      "Implementation was smooth, and the results were immediate. Our team collaboration has improved significantly.",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-primary mb-4" />
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};