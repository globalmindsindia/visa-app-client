import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, Check, Home, AlertTriangle, Mail, Phone, X, HelpCircle, Clock, MessageCircle, Tag, Percent } from "lucide-react";
import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";
import { countryData } from "@/data/countrydata";
import SearchableSelect from "@/components/SearchableSelect";
import { usePayment } from "@/hooks/usePayment";
import ApplicationStepsBackground from "@/assets/Application_steps_Background.jpg";

const Apply = () => {
  const navigate = useNavigate();
  const { processPayment, isProcessing } = usePayment();
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

  const [availableUniversities, setAvailableUniversities] = useState<string[]>([]);
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [customEntries, setCustomEntries] = useState({
    countries: [] as string[],
    universities: [] as string[],
    courses: [] as string[],
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Reset dependent fields when country changes
    if (field === "country") {
      setFormData(prev => ({ ...prev, university: "", course: "" }));
    }
  };

  const hasProgress = () => {
    return formData.name || formData.email || formData.phone || formData.city || 
           formData.country || formData.university || formData.course || formData.intake || 
           formData.document;
  };

  const handleBackToHome = () => {
    if (hasProgress()) {
      setShowConfirmDialog(true);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Initialize countries list
    const countries = [...Object.keys(countryData), ...customEntries.countries];
    setAllCountries(countries);
  }, [customEntries.countries]);

  useEffect(() => {
    if (formData.country && countryData[formData.country as keyof typeof countryData]) {
      const selectedCountryData = countryData[formData.country as keyof typeof countryData];
      setAvailableUniversities([...selectedCountryData.universities, ...customEntries.universities]);
      setAvailableCourses([...selectedCountryData.courses, ...customEntries.courses]);
    } else if (formData.country) {
      // Custom country selected
      setAvailableUniversities(customEntries.universities);
      setAvailableCourses(customEntries.courses);
    } else {
      setAvailableUniversities([]);
      setAvailableCourses([]);
    }
  }, [formData.country, customEntries]);

  const handleAddNewCountry = (newCountry: string) => {
    setCustomEntries(prev => ({
      ...prev,
      countries: [...prev.countries, newCountry]
    }));
    // Log to console for database tracking
    console.log('New country requested:', newCountry);
    toast.success(`"${newCountry}" added to countries list`);
  };

  const handleAddNewUniversity = (newUniversity: string) => {
    setCustomEntries(prev => ({
      ...prev,
      universities: [...prev.universities, newUniversity]
    }));
    // Log to console for database tracking
    console.log('New university requested:', newUniversity, 'for country:', formData.country);
    toast.success(`"${newUniversity}" added to universities list`);
  };

  const handleAddNewCourse = (newCourse: string) => {
    setCustomEntries(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
    // Log to console for database tracking
    console.log('New course requested:', newCourse, 'for country:', formData.country);
    toast.success(`"${newCourse}" added to courses list`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, document: e.target.files[0] });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      
      if (allowedTypes.includes(file.type)) {
        setFormData({ ...formData, document: file });
        toast.success(`File "${file.name}" uploaded successfully!`);
      } else {
        toast.error('Please upload only PDF, JPG, or PNG files');
      }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await processPayment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: 10000 - discount
      }) as { success: boolean } | undefined;
      
      if (result?.success) {
        setTimeout(() => {
          navigate("/success", { 
            state: { 
              name: formData.name, 
              email: formData.email 
            } 
          });
        }, 1500);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ApplicationStepsBackground})` }}
      />
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
      <div className="relative z-10">
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  variant="outline"
                  onClick={handleBackToHome}
                  className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>
              <div className="flex-1" />
            </div>
            
            <div className="text-center">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-2">
                Visa Application Form
              </h1>
              <p className="font-body text-muted-foreground">
                Step {step} of {totalSteps}
              </p>
            </div>
            <Progress value={progress} className="mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2">
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <CardTitle className="font-heading text-2xl text-primary">
                  {step === 1 && (
                    <motion.span
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Personal Details
                    </motion.span>
                  )}
                  {step === 2 && (
                    <motion.span
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Academic Details
                    </motion.span>
                  )}
                  {step === 3 && (
                    <motion.span
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Document Upload
                    </motion.span>
                  )}
                  {step === 4 && (
                    <motion.span
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Payment
                    </motion.span>
                  )}
                </CardTitle>
              </motion.div>
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
                  <SearchableSelect
                    label="Country"
                    placeholder="Select or search country"
                    value={formData.country}
                    options={allCountries}
                    onValueChange={(value) => handleInputChange("country", value)}
                    onAddNew={handleAddNewCountry}
                    required
                  />
                  <SearchableSelect
                    label="University Name"
                    placeholder={formData.country ? "Select or search university" : "Select country first"}
                    value={formData.university}
                    options={availableUniversities}
                    onValueChange={(value) => handleInputChange("university", value)}
                    onAddNew={handleAddNewUniversity}
                    disabled={!formData.country}
                    required
                  />
                  <SearchableSelect
                    label="Course / Program"
                    placeholder={formData.country ? "Select or search course" : "Select country first"}
                    value={formData.course}
                    options={availableCourses}
                    onValueChange={(value) => handleInputChange("course", value)}
                    onAddNew={handleAddNewCourse}
                    disabled={!formData.country}
                    required
                  />
                  <div>
                    <Label htmlFor="intake">Intake *</Label>
                    <Select value={formData.intake} onValueChange={(value) => handleInputChange("intake", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summer">summer</SelectItem>
                        <SelectItem value="Winter/Fall">Winter/Fall</SelectItem>
                        
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
                      <div 
                        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors"
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="font-body text-sm text-muted-foreground mb-2">
                          {formData.document ? formData.document.name : "Drag and drop your file here"}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mb-4">
                          PDF, JPG, PNG (max. 10MB)
                        </p>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className="bg-primary text-white hover:bg-primary/90 border-primary"
                          >
                            {formData.document ? "Change File" : "Choose File"}
                          </Button>
                        </motion.div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
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
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>₹10,000</span>
                        </div>
                        {appliedCoupon && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-between text-green-600 mt-1"
                          >
                            <span className="flex items-center gap-1">
                              <Percent className="h-4 w-4" />
                              Discount ({appliedCoupon})
                            </span>
                            <span>-₹{discount}</span>
                          </motion.div>
                        )}
                        <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                          <span>Total Amount</span>
                          <span className={appliedCoupon ? "text-green-600" : "text-primary"}>
                            ₹{10000 - discount}
                          </span>
                        </div>
                        {appliedCoupon && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-sm text-green-600 text-right mt-1"
                          >
                            You saved ₹{discount}!
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">Have a coupon code?</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="pr-20"
                        />
                        {couponCode && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => {
                              setCouponCode("");
                              setAppliedCoupon("");
                              setDiscount(0);
                            }}
                            className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </motion.button>
                        )}
                      </div>
                      

                      
                      <motion.div 
                        className="bg-white rounded-lg p-4 border border-orange-200"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                GMI10
                              </div>
                              <span className="text-sm font-medium text-gray-700">10% OFF</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Save ₹1,000 on your application</p>
                          </div>
                          <motion.button
                            onClick={() => {
                              setCouponCode("GMI10");
                              setAppliedCoupon("GMI10");
                              setDiscount(1000);
                              toast.success("Coupon applied! You saved ₹1,000");
                            }}
                            disabled={appliedCoupon === "GMI10"}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                              appliedCoupon === "GMI10" 
                                ? "bg-green-100 text-green-700 cursor-not-allowed" 
                                : "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
                            }`}
                            whileHover={appliedCoupon !== "GMI10" ? { scale: 1.05 } : {}}
                            whileTap={appliedCoupon !== "GMI10" ? { scale: 0.95 } : {}}
                          >
                            {appliedCoupon === "GMI10" ? "Applied" : "Use This"}
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

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
                    onClick={() => {
                      setStep(step - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isProcessing ? "Processing..." : step === totalSteps ? `Submit & Pay ₹${10000 - discount}` : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </main>
      </div>
      
      {/* Help Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <motion.button
          onClick={() => setShowHelpModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <HelpCircle className="h-5 w-5" />
          </motion.div>
          <span className="font-medium text-sm">Help</span>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap pointer-events-none"
          >
            Need Help?
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-white/20 p-2 rounded-full"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold">Customer Support</h3>
                        <p className="text-blue-100 text-sm">We're here to help you succeed!</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowHelpModal(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="text-center">
                    <p className="text-gray-700 text-lg font-medium mb-4">
                      Need assistance? Our support team is ready to help!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-600 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Email Support</h4>
                        </div>
                      </div>
                      <motion.a 
                        href="mailto:connect@globalmindsindia.com"
                        className="text-blue-600 font-medium hover:text-blue-800 transition-colors block"
                        whileHover={{ x: 5 }}
                      >
                        connect@globalmindsindia.com
                      </motion.a>
                    </motion.div>

                    <motion.div 
                      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border border-green-100"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-600 p-2 rounded-full">
                          <Phone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Phone Support</h4>
                        </div>
                      </div>
                      <motion.a 
                        href="tel:+917353446655"
                        className="text-green-600 font-medium hover:text-green-800 transition-colors block"
                        whileHover={{ x: 5 }}
                      >
                        +91 7353446655
                      </motion.a>
                    </motion.div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-amber-500 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900">Quick Tips</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span><strong>Response time:</strong> Within 2-4 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span><strong>Available:</strong> Monday to Saturday, 9 AM - 7 PM</span>
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setShowHelpModal(false)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Got it, Thanks!
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirmDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <AlertTriangle className="h-8 w-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">Application in Progress</h3>
                        <p className="text-amber-100 text-sm">Unsaved progress detected</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmDialog(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    You have unsaved progress in your visa application. Are you sure you want to go back to the home page? 
                    <span className="font-semibold text-red-600">Your current progress will be lost.</span>
                  </p>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-blue-900 mb-3">For any queries, please reach out to us:</p>
                    <div className="space-y-2">
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-blue-800"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">Email:</span>
                        <a href="mailto:connect@globalmindsindia.com" className="hover:underline">
                          connect@globalmindsindia.com
                        </a>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-2 text-sm text-blue-800"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">Phone:</span>
                        <a href="tel:7353446655" className="hover:underline">
                          7353446655
                        </a>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setShowConfirmDialog(false)}
                        className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Continue Application
                      </Button>
                    </motion.div>
                    <motion.div 
                      className="flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="destructive"
                        onClick={() => navigate("/")}
                        className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300"
                      >
                        Yes, Go Back
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Apply;
