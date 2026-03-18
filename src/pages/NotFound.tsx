
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground theme-transition p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="glass-panel p-12 rounded-xl max-w-md w-full text-center">
          <h1 className="text-8xl font-display font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild className="rounded-full px-8">
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
