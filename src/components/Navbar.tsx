import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "./ui/use-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, loading, signOut } = useAuth();
  const { toast } = useToast();

  console.log("Navbar - User:", user);
  console.log("Navbar - Profile:", profile);
  console.log("Navbar - Loading:", loading);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
      });
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again",
      });
    }
  };

  if (loading) {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm"
      >
        <nav className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6"
          >
            <Link to="/" className="flex items-center gap-2">
              <span className="font-semibold text-xl">WorkUnite</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="animate-pulse w-32 h-6 bg-muted rounded"></div>
          </motion.div>
        </nav>
      </motion.header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="mx-auto flex items-center justify-between p-6 lg:px-8 backdrop-blur-sm bg-background/80 border-b"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex lg:flex-1"
        >
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl">WorkUnite</span>
          </Link>
        </motion.div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/features")}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/pricing")}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/about")}
          >
            About
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-600"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
          )}
        </div>
      </motion.nav>
    </header>
  );
}