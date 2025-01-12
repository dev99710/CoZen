import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Manage Your Team Efficiently
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Track workers, manage tasks, and monitor costs all in one place. 
            Perfect for small businesses and teams looking to streamline their operations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="rounded-full px-8"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/signin")}
              className="rounded-full px-8"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
