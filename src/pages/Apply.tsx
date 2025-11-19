import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  Home,
  AlertTriangle,
  Mail,
  Phone,
  X,
  HelpCircle,
  Clock,
  MessageCircle,
  Tag,
  Percent,
} from "lucide-react";
import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";
// import { countryData } from "@/data/countrydata";
import SearchableSelect from "@/components/SearchableSelect";
import { usePayment } from "@/hooks/usePayment";
import ApplicationStepsBackground from "@/assets/Application_steps_Background.jpg";
import { masterCourseService } from "@/services/masterscourse.service";
import { visaService } from "@/services/visa.service";
import { paymentService } from "@/services/paymentService";
import { loadRazorpayScript } from "@/services/razorpay";

const Apply = () => {
  const navigate = useNavigate();
  const { processPayment, isProcessing } = usePayment();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    university: "",
    course: "",
    intake: "",
    document: null as File | null,
  });

  const personalInfo = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phone,
    city: formData.city,
  };

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingUniversities, setLoadingUniversities] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [hasMoreCountries, setHasMoreCountries] = useState(true);
  const [countryPage, setCountryPage] = useState(1);
  const [uniPage, setUniPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const [hasMoreCourses, setHasMoreCourses] = useState(true);
  const [hasMoreUniversities, setHasMoreUniversities] = useState(true);
  const [leadId, setLeadId] = useState<string>("");
  const [visaApplicantId, setVisaApplicantId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const FEES = {
    application: 5000,
    verification: 2000,
    counselor: 3000,
  };

  const SUBTOTAL = FEES.application + FEES.verification + FEES.counselor;

  const COUPONS: Record<
    string,
    { type: "flat" | "percent"; value: number; description: string }
  > = {
    GMI10: {
      type: "percent",
      value: 10,
      description: "Get 10% OFF on your visa application",
    },

    FLAT500: {
      type: "flat",
      value: 500,
      description: "Get ₹500 OFF",
    },
  };

  const calculateDiscount = (couponCode: string) => {
    const coupon = COUPONS[couponCode];
    if (!coupon) return 0;

    if (coupon.type === "flat") {
      return coupon.value;
    }

    if (coupon.type === "percent") {
      // Example: 10% of ₹10,000 = ₹1,000
      return Math.round((SUBTOTAL * coupon.value) / 100);
    }

    return 0;
  };

  // APPLY COUPON
  const applyCoupon = (code: string) => {
    if (!COUPONS[code]) {
      toast.error("Invalid coupon code");
      return;
    }

    const disc = calculateDiscount(code);

    setAppliedCoupon(code);
    setCouponCode(code);
    setDiscount(disc);

    toast.success(`Coupon applied! You saved ₹${disc}`);
  };

  // CLEAR COUPON
  const clearCoupon = () => {
    setCouponCode("");
    setAppliedCoupon("");
    setDiscount(0);
    toast.success("Coupon removed");
  };

  // FINAL AMOUNT
  const getFinalAmount = () => SUBTOTAL - discount;

  function debounce<T extends (...args: any[]) => void>(func: T, delay = 400) {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedUniSearch = debounce((query: string) => {
    if (formData.country && query.length > 1) {
      loadUniversities(formData.country, 1, 25, query);
    } else if (query.length === 0 && formData.country) {
      loadUniversities(formData.country, 1); // reset list
    }
  }, 400);

  const debouncedCourseSearch = debounce((query: string) => {
    if (formData.country && query.length > 1) {
      loadCourses(formData.country, 1, 25, query);
    } else if (query.length === 0 && formData.country) {
      loadCourses(formData.country, 1); // reset list
    }
  }, 400);

  const loadCountries = async (page = 1, search = "") => {
    if (loadingCountries) return;
    setLoadingCountries(true);
    try {
      const res = await masterCourseService.getPaginated(page, 25, search);
      if (res.success) {
        const newCountries = res.data.map((d: any) => d.country);
        setCountries((prev) =>
          page === 1 ? newCountries : [...prev, ...newCountries]
        );
        setHasMoreCountries(page < res.pagination.totalPages);
        setCountryPage(page + 1);
      }
    } catch (err) {
      console.error("❌ Error loading countries:", err);
    } finally {
      setLoadingCountries(false);
    }
  };

  // initial load
  useEffect(() => {
    loadCountries(1);
  }, []);

  useEffect(() => {
    if (formData.country) {
      loadUniversities(formData.country, 1);
      loadCourses(formData.country, 1);
    } else {
      setUniversities([]);
      setCourses([]);
    }
  }, [formData.country]);

  const loadUniversities = async (
    country: string,
    page = 1,
    limit = 25,
    search = ""
  ) => {
    if (!country || loadingUniversities) return;
    setLoadingUniversities(true);

    try {
      const res = await masterCourseService.getUniversities(
        country,
        page,
        limit,
        search
      );
      const { data, pagination } = res;

      setUniversities((prev) => (page === 1 ? data : [...prev, ...data]));
      setUniPage(page + 1);
      setHasMoreUniversities(pagination.currentPage < pagination.totalPages);
    } catch (err) {
      console.error("❌ Failed to load universities:", err);
    } finally {
      setLoadingUniversities(false);
    }
  };

  const loadCourses = async (
    country: string,
    page = 1,
    limit = 25,
    search = ""
  ) => {
    if (!country || loadingCourses) return;
    setLoadingCourses(true);

    try {
      const res = await masterCourseService.getCourses(
        country,
        page,
        limit,
        search
      );
      const { data, pagination } = res;

      setCourses((prev) => (page === 1 ? data : [...prev, ...data]));
      setCoursePage(page + 1);
      setHasMoreCourses(pagination.currentPage < pagination.totalPages);
    } catch (err) {
      console.error("❌ Failed to load courses:", err);
    } finally {
      setLoadingCourses(false);
    }
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const validateName = (name: string) => {
    if (name.length < 3) return "Name must be minimum 3 letters";
    if (/\d/.test(name)) return "Name cannot contain numbers";
    if (/[^a-zA-Z\s]/.test(name))
      return "Name cannot contain special characters";
    return "";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/^\+?91\s?/, "");

    if (cleanPhone.length !== 10) {
      return "Phone number should have exactly 10 digits";
    }

    if (!/^[6-9]/.test(cleanPhone)) {
      return "Phone number should start with 6, 7, 8 or 9";
    }

    if (!/^\d+$/.test(cleanPhone)) {
      return "Phone number should contain only numbers";
    }

    // Check for 5 consecutive same numbers
    for (let i = 0; i <= cleanPhone.length - 5; i++) {
      const substring = cleanPhone.substring(i, i + 5);
      if (substring.split("").every((digit) => digit === substring[0])) {
        return "Phone number cannot have 5 consecutive same numbers";
      }
    }

    return "";
  };

  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;

    // Handle name field - only allow letters and spaces
    if (field === "name") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    // Handle phone field - prefix with +91 and only allow digits
    if (field === "phone") {
      // Remove any non-digit characters except +
      let cleanValue = value.replace(/[^\d+]/g, "");

      // If user starts typing without +91, add it
      if (cleanValue && !cleanValue.startsWith("+91")) {
        if (cleanValue.startsWith("91")) {
          cleanValue = "+" + cleanValue;
        } else {
          cleanValue = "+91" + cleanValue.replace(/^\+/, "");
        }
      }

      // Limit to +91 + 10 digits
      if (cleanValue.length > 13) {
        cleanValue = cleanValue.substring(0, 13);
      }

      processedValue = cleanValue;
    }

    setFormData({ ...formData, [field]: processedValue });

    // Validate and set errors
    let error = "";
    if (field === "name" && processedValue) {
      error = validateName(processedValue);
    } else if (field === "email" && processedValue) {
      error = validateEmail(processedValue);
    } else if (field === "phone" && processedValue) {
      error = validatePhone(processedValue);
    }

    setErrors((prev) => ({ ...prev, [field]: error }));

    // Reset dependent fields when country changes
    if (field === "country") {
      setFormData((prev) => ({ ...prev, university: "", course: "" }));
    }
  };

  const hasProgress = () => {
    return (
      formData.firstName ||
      formData.lastName ||
      formData.email ||
      formData.phone ||
      formData.city ||
      formData.country ||
      formData.university ||
      formData.course ||
      formData.intake ||
      formData.document
    );
  };

  const handleBackToHome = () => {
    if (hasProgress()) {
      setShowConfirmDialog(true);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
      ];

      if (allowedTypes.includes(file.type)) {
        setFormData({ ...formData, document: file });
        toast.success(`File "${file.name}" uploaded successfully!`);
      } else {
        toast.error("Please upload only PDF, JPG, or PNG files");
      }
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone ||
        !formData.city
      ) {
        toast.error("Please fill all personal details");
        return false;
      }

      const fnError = validateName(formData.firstName);
      const lnError = validateName(formData.lastName);
      const emailError = validateEmail(formData.email);
      const phoneError = validatePhone(formData.phone);

      if (fnError || lnError || emailError || phoneError) {
        setErrors({
          firstName: fnError,
          lastName: lnError,
          email: emailError,
          phone: phoneError,
        });
        toast.error("Please fix the validation errors");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.country ||
        !formData.university ||
        !formData.course ||
        !formData.intake
      ) {
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
    if (!validateStep()) return;

    // STEP 1 -> Create Lead (NON BLOCKING)
    if (step === 1) {
      visaService
        .createLead({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          city: formData.city,
          leadSource: "VISA_APPLICATION",
        })
        .then((res) => setLeadId(res.data.lead.id))
        .catch((err) =>
          console.error("Lead creation failed in background:", err)
        );

      // console.log("Lead ID ",leadId);

      setStep(2);
      window.scrollTo(0, 0);
      return;
    }

    // STEP 2 -> Save Applicant Details (NON BLOCKING)
    if (step === 2) {
      visaService
        .createApplicant({
          leadId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          city: formData.city,
          country: formData.country,
          universityName: formData.university,
          courseName: formData.course,
          intake: formData.intake,
        })
        .then((res) => setVisaApplicantId(res.data.id))
        .catch((err) =>
          console.error("Applicant save failed in background:", err)
        );

      setStep(3);
      window.scrollTo(0, 0);
      return;
    }

    // STEP 3 -> Upload Document (NON BLOCKING)
    if (step === 3) {
      visaService
        .uploadDocument(formData.document!, {
          leadId,
          visaApplicantId,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          city: formData.city,
          country: formData.country,
          universityName: formData.university,
          courseName: formData.course,
          intake: formData.intake,
        })
        .then(() => console.log("Document uploaded in background"))
        .catch((err) => console.error("Document upload failed:", err));

      toast.success("Document submitted! Uploading in background.");
      setStep(4);
      window.scrollTo(0, 0);
      return;
    }

    // STEP 4 -> Payment (Blocking)
    if (step === 4) {
      handleFinalSubmission();
    }
  };

  const handlePostPaymentOperations = async () => {
    const { firstName, lastName, email, phoneNumber } = personalInfo;

    try {
      // =====================================================
      // 1. Create APS USER (or ignore duplicate)
      // =====================================================
      try {
        await visaService.storeApsUser({
          firstName,
          lastName,
          email,
          phoneNumber,
          domainUrl: "visa.globalmindsindia.in",
        });
      } catch (err: any) {
        const msg = err?.response?.data?.message || "";

        if (msg.includes("User already exists")) {
          console.warn("APS user already exists ✔");
        } else {
          console.warn("APS user creation failed (continuing):", msg);
        }
      }

      // =====================================================
      // 2. SEND ZOHO INVITE
      // =====================================================
      try {
        const zohoResponse = await visaService.storeInZoho({
          contact: {
            First_Name: firstName,
            Last_Name: lastName,
            Email: email,
            Phone: phoneNumber,
          },
          userTypeId: "6689208000001267117", // VISA type inside Zoho
        });

        if (
          zohoResponse?.data?.error?.includes("DUPLICATE_DATA") ||
          zohoResponse?.error?.includes("DUPLICATE_DATA")
        ) {
          console.warn("Zoho duplicate detected ✔");
        }
      } catch (err: any) {
        const errMsg = err?.response?.data?.error || "";

        if (errMsg.includes("DUPLICATE_DATA")) {
          console.warn("Zoho duplicate detected ✔");
        } else {
          console.warn("Zoho invite failed:", errMsg);
        }
      }

      // =====================================================
      // 3. Call BACKEND to complete Visa Application
      // =====================================================
      await visaService.completePayment({
        leadId,
        visaApplicantId,
      });

      toast.success("Visa Application Completed!");
      navigate("/success");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "We could not complete your registration. Please contact support."
      );
    }
  };

  const handleFinalSubmission = async () => {
    setIsLoading(true);

    try {
      const { firstName, lastName, email, phoneNumber } = personalInfo;
      const fullName = `${firstName} ${lastName}`;
      const finalAmount = getFinalAmount(); // Discounted amount

      // Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        setIsLoading(false);
        return;
      }

      // Create Razorpay order
      const order = await paymentService.createOrder({
        name: fullName,
        email,
        phone: phoneNumber,
        amount: finalAmount,
        description: `Visa Application${
          appliedCoupon ? ` (Coupon: ${appliedCoupon})` : ""
        }`,
      });

      if (!order || !order.order_id) {
        toast.error("Unable to create payment order. Please try again.");
        setIsLoading(false);
        return;
      }

      // Razorpay Checkout
      const options = {
        key: order.razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Global Minds India",
        description: "Visa Application",
        order_id: order.order_id,

        prefill: {
          name: fullName,
          email,
          contact: phoneNumber,
        },

        theme: { color: "#3B82F6" },

        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verify = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              internal_receipt_id: order.internal_receipt_id,
            });

            if (verify?.success) {
              toast.success("Payment successful!");
              await handlePostPaymentOperations();
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err: any) {
            toast.error(
              err?.message || "Something went wrong during verification."
            );
          }
        },

        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      toast.error(err?.message || "Payment failed. Please try again.");
      setIsLoading(false);
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
                        {/* FIRST NAME */}
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            className={errors.firstName ? "border-red-500" : ""}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        {/* LAST NAME */}
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            className={errors.lastName ? "border-red-500" : ""}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>

                        {/* EMAIL */}
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* PHONE */}
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 1234567890"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className={errors.phone ? "border-red-500" : ""}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* CITY */}
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
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
                        {/* COUNTRY FROM DATABASE */}
                        <SearchableSelect
                          label="Country"
                          placeholder="Select country"
                          value={formData.country}
                          options={countries} // <-- DB Countries
                          onValueChange={(value) =>
                            handleInputChange("country", value)
                          }
                          required
                        />

                        {/* UNIVERSITIES FROM DATABASE */}
                        <SearchableSelect
                          label="University Name"
                          placeholder={
                            formData.country
                              ? "Select or search university"
                              : "Select country first"
                          }
                          value={formData.university}
                          options={universities} // <-- DB Universities
                          onValueChange={(value) =>
                            handleInputChange("university", value)
                          }
                          disabled={!formData.country}
                          required
                        />

                        {/* COURSES FROM DATABASE */}
                        <SearchableSelect
                          label="Course / Program"
                          placeholder={
                            formData.country
                              ? "Select or search course"
                              : "Select country first"
                          }
                          value={formData.course}
                          options={courses} // <-- DB Courses
                          onValueChange={(value) =>
                            handleInputChange("course", value)
                          }
                          disabled={!formData.country}
                          required
                        />

                        {/* INTAKE — REMAINS SAME */}
                        <div>
                          <Label htmlFor="intake">Intake *</Label>
                          <Select
                            value={formData.intake}
                            onValueChange={(value) =>
                              handleInputChange("intake", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select intake" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="summer">summer</SelectItem>
                              <SelectItem value="Winter/Fall">
                                Winter/Fall
                              </SelectItem>
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
                          <Label htmlFor="document">
                            Upload Admission / Acceptance Letter *
                          </Label>
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
                                {formData.document
                                  ? formData.document.name
                                  : "Drag and drop your file here"}
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
                                  onClick={() =>
                                    document
                                      .getElementById("file-upload")
                                      ?.click()
                                  }
                                  className="bg-primary text-white hover:bg-primary/90 border-primary"
                                >
                                  {formData.document
                                    ? "Change File"
                                    : "Choose File"}
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
                              <span className="font-body text-sm">
                                Document uploaded successfully
                              </span>
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
                        {/* PAYMENT SUMMARY */}
                        <div className="bg-muted p-6 rounded-lg">
                          <h3 className="font-heading font-semibold text-lg mb-4">
                            Payment Summary
                          </h3>

                          <div className="space-y-2 font-body">
                            <div className="flex justify-between">
                              <span>Application Processing Fee</span>
                              <span>₹{FEES.application.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>Document Verification</span>
                              <span>₹{FEES.verification.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between">
                              <span>Counselor Support</span>
                              <span>₹{FEES.counselor.toLocaleString()}</span>
                            </div>

                            <div className="border-t pt-2 mt-2">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{SUBTOTAL.toLocaleString()}</span>
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
                                  <span>-₹{discount.toLocaleString()}</span>
                                </motion.div>
                              )}

                              <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                                <span>Total Amount</span>
                                <span
                                  className={
                                    appliedCoupon
                                      ? "text-green-600"
                                      : "text-primary"
                                  }
                                >
                                  ₹{getFinalAmount().toLocaleString()}
                                </span>
                              </div>

                              {appliedCoupon && (
                                <motion.div
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="text-sm text-green-600 text-right mt-1"
                                >
                                  You saved ₹{discount.toLocaleString()}!
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* COUPON SECTION */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-orange-600" />
                            <h4 className="font-semibold text-gray-900">
                              Have a coupon code?
                            </h4>
                          </div>

                          <div className="space-y-4">
                            {/* COUPON INPUT */}
                            <div className="relative">
                              <Input
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) =>
                                  setCouponCode(e.target.value.toUpperCase())
                                }
                                className="pr-20"
                              />

                              {couponCode && (
                                <motion.button
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  onClick={clearCoupon}
                                  className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
                                >
                                  <X className="h-4 w-4" />
                                </motion.button>
                              )}
                            </div>

                            {/* COUPON CARD — GMI10 */}
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
                                    <span className="text-sm font-medium text-gray-700">
                                      {COUPONS["GMI10"].value}% OFF
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {COUPONS["GMI10"].description}
                                  </p>
                                </div>

                                <motion.button
                                  onClick={() => applyCoupon("GMI10")}
                                  disabled={appliedCoupon === "GMI10"}
                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    appliedCoupon === "GMI10"
                                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                                      : "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
                                  }`}
                                  whileHover={
                                    appliedCoupon !== "GMI10"
                                      ? { scale: 1.05 }
                                      : {}
                                  }
                                  whileTap={
                                    appliedCoupon !== "GMI10"
                                      ? { scale: 0.95 }
                                      : {}
                                  }
                                >
                                  {appliedCoupon === "GMI10"
                                    ? "Applied"
                                    : "Use This"}
                                </motion.button>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>

                        <p className="font-body text-sm text-muted-foreground text-center">
                          Secure payment gateway integration will be processed
                          here
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
                          window.scrollTo({ top: 0, behavior: "smooth" });
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
                      {isProcessing
                        ? "Processing..."
                        : step === totalSteps
                        ? `Submit & Pay ₹${10000 - discount}`
                        : "Next"}
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
                        <p className="text-blue-100 text-sm">
                          We're here to help you succeed!
                        </p>
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
                          <h4 className="font-semibold text-gray-900">
                            Email Support
                          </h4>
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
                          <h4 className="font-semibold text-gray-900">
                            Phone Support
                          </h4>
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
                      <h4 className="font-semibold text-gray-900">
                        Quick Tips
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>
                          <strong>Response time:</strong> Within 2-4 hours
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span>
                          <strong>Available:</strong> Monday to Saturday, 9 AM -
                          7 PM
                        </span>
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
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      >
                        <AlertTriangle className="h-8 w-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">
                          Application in Progress
                        </h3>
                        <p className="text-amber-100 text-sm">
                          Unsaved progress detected
                        </p>
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
                    You have unsaved progress in your visa application. Are you
                    sure you want to go back to the home page?
                    <span className="font-semibold text-red-600">
                      Your current progress will be lost.
                    </span>
                  </p>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm font-medium text-blue-900 mb-3">
                      For any queries, please reach out to us:
                    </p>
                    <div className="space-y-2">
                      <motion.div
                        className="flex items-center gap-2 text-sm text-blue-800"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">Email:</span>
                        <a
                          href="mailto:connect@globalmindsindia.com"
                          className="hover:underline"
                        >
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
