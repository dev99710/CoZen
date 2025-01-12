import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-secondary/90 text-white">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-8" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
            WorkUnite
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Intelligent Labor Management Platform powered by AI
          </p>
          <p className="text-lg mb-12 text-gray-200">
            Optimize workforce efficiency through AI-powered task allocation, cost tracking,
            and performance monitoring
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white"
              onClick={() => navigate("/demo")}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};