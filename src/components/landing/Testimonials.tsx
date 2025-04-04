import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TestimonialProps {
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

const testimonials: TestimonialProps[] = [
  {
    content:
      "WorkUnite has transformed how we manage our team. The task allocation is intuitive, and the cost tracking has saved us thousands.",
    author: {
      name: "Sarah Johnson",
      role: "Operations Manager",
      avatar: "SJ",
    },
  },
  {
    content:
      "The analytics dashboard gives me instant visibility into team performance. I can make data-driven decisions faster than ever before.",
    author: {
      name: "Michael Chen",
      role: "Project Director",
      avatar: "MC",
    },
  },
  {
    content:
      "As a small business owner, I needed something simple yet powerful. WorkUnite delivers exactly that - it's easy to use but has all the features we need.",
    author: {
      name: "Emma Rodriguez",
      role: "Business Owner",
      avatar: "ER",
    },
  },
];

function TestimonialCard({ content, author, index }: TestimonialProps & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-muted-foreground italic">{content}</p>
            <div className="flex items-center mt-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="" alt={author.name} />
                <AvatarFallback>{author.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{author.name}</p>
                <p className="text-sm text-muted-foreground">{author.role}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-8" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Teams Everywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about how WorkUnite has transformed their workflow and productivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}