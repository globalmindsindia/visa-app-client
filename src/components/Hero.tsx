import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration.png";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full text-sm font-medium border shadow-sm"
            >
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Trusted by Students</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground"
            >
              Simplify Your Visa Journey with{" "}
              <span className="text-primary">Expert Assistance</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl"
            >
              Fast, reliable, and student-friendly visa application assistance for global study destinations. Your dream education abroad starts here.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                onClick={() => navigate("/apply")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => document.querySelector('#countries')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="lg"
                className="font-semibold text-lg px-8 py-6 border-2"
              >
                Explore Countries
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary">98%</div>
                <div className="font-body text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary">15+</div>
                <div className="font-body text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-3xl text-primary">24/7</div>
                <div className="font-body text-sm text-muted-foreground">Support</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" 
            />
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              src={heroIllustration} 
              alt="International students with passports ready for visa application" 
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
