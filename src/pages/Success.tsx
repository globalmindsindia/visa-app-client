import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import CountriesRequirementImage from "@/assets/Countries_requirement_background.jpg";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email } = location.state || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CountriesRequirementImage})` }}
      />
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      <div className="relative z-10">
        <main className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1 
              }}
              className="inline-flex p-4 bg-primary/10 rounded-full"
            >
              <CheckCircle className="h-24 w-24 text-primary" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground"
            >
              Thank you{name ? `, ${name}` : ''}!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-body text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Your visa application has been submitted successfully! Your payment was processed and we've received your application.
            </motion.p>

            {email && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <Mail className="h-5 w-5" />
                  <p className="font-body text-sm">
                    You will receive an email at <strong>{email}</strong> regarding the further steps.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-muted p-6 rounded-lg max-w-md mx-auto"
            >
              <h3 className="font-heading font-semibold text-lg mb-2">What's Next?</h3>
              <ul className="font-body text-sm text-muted-foreground space-y-2 text-left">
                <li>✓ Confirmation email sent to your registered email</li>
                <li>✓ Our counselor will contact you within 24 hours</li>
                <li>✓ Document verification will begin shortly</li>
                <li>✓ You can track your application status online</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center pt-4"
            >
              <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
            </motion.div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default Success;
