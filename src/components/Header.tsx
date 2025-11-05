import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "#countries" },
    { name: "Services", path: "#services" },
    { name: "Why Choose Us", path: "#why-us" },
    { name: "Contact", path: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith("#")) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
            <div className="relative">
              <Globe className="h-8 w-8" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full" />
            </div>
            <span>VisaPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.path)}
                className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
            <Button onClick={() => navigate("/apply")} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Apply Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <Button onClick={() => { navigate("/apply"); setMobileMenuOpen(false); }} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
