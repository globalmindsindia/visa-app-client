import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    university: "",
    course: "",
    intake: "",
    document: null as File | null,
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, document: e.target.files[0] });
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.city) {
        toast.error("Please fill all personal details");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.country || !formData.university || !formData.course || !formData.intake) {
        toast.error("Please fill all academic details");
        return false;
      }
    }
    if (step === 3 && !formData.document) {
      toast.error("Please upload your admission letter");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    // Simulate payment and submission
    toast.success("Application submitted successfully!");
    setTimeout(() => {
      navigate("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
              Visa Application Form
            </h1>
            <p className="font-body text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
            <Progress value={progress} className="mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">
                {step === 1 && "Personal Details"}
                {step === 2 && "Academic Details"}
                {step === 3 && "Document Upload"}
                {step === 4 && "Payment"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="university">University Name *</Label>
                    <Input
                      id="university"
                      placeholder="Enter university name"
                      value={formData.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course / Program *</Label>
                    <Input
                      id="course"
                      placeholder="e.g., Master of Computer Science"
                      value={formData.course}
                      onChange={(e) => handleInputChange("course", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="intake">Intake *</Label>
                    <Select value={formData.intake} onValueChange={(value) => handleInputChange("intake", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan">January</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="sep">September</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                  <div>
                    <Label htmlFor="document">Upload Admission / Acceptance Letter *</Label>
                    <div className="mt-2">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="font-body text-sm text-muted-foreground mb-2">
                            {formData.document ? formData.document.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            PDF, JPG, PNG (max. 10MB)
                          </p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {formData.document && (
                      <div className="mt-4 p-4 bg-primary/10 rounded-lg flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="font-body text-sm">Document uploaded successfully</span>
                      </div>
                    )}
                  </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="font-heading font-semibold text-lg mb-4">Payment Summary</h3>
                    <div className="space-y-2 font-body">
                      <div className="flex justify-between">
                        <span>Application Processing Fee</span>
                        <span>₹5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Document Verification</span>
                        <span>₹2,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Counselor Support</span>
                        <span>₹3,000</span>
                      </div>
                      <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg">
                        <span>Total Amount</span>
                        <span className="text-primary">₹10,000</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground text-center">
                    Secure payment gateway integration will be processed here
                  </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {step === totalSteps ? "Submit & Pay" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
