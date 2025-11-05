import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
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
              Application Submitted Successfully!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-body text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Thank you for choosing our visa application services. Your payment was successful, and we've received your application.
            </motion.p>

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
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button 
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90"
              >
                Return to Home
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/track")}
              >
                Track Application Status
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
