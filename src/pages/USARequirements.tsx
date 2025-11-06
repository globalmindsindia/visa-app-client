import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Phone, Mail, MessageCircle, CheckCircle, Award, User, Heart, Globe, Star, Book, CreditCard, Loader, UserCheck, Camera, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountriesRequirementBackground from "@/assets/Countries_requirement_background.jpg";

function PassportIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M12 8a2 2 0 0 0 0 4 2 2 0 0 0 0-4ZM12 16v-2" />
    </svg>
  );
}

const stepIcons = [
  <FileText className="w-5 h-5" />,
  <Award className="w-5 h-5" />,
  <PassportIcon className="w-5 h-5" />,
  <CreditCard className="w-5 h-5" />,
  <Book className="w-5 h-5" />,
  <Globe className="w-5 h-5" />,
  <Heart className="w-5 h-5" />,
  <Star className="w-5 h-5" />,
  <Camera className="w-5 h-5" />,
];

const gradients = [
  "from-blue-400 to-blue-600",
  "from-cyan-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-amber-400 to-yellow-500",
  "from-sky-400 to-blue-400",
  "from-indigo-400 to-fuchsia-500",
  "from-teal-400 to-green-500",
];

const requirements = [
  {
    category: "Application Forms",
    documents: [
      { name: "DS-160 Form", details: "Online nonimmigrant visa application" },
      { name: "I-20 Form", details: "Certificate of Eligibility for Nonimmigrant Student Status" }
    ]
  },
  {
    category: "Acceptance Documents",
    documents: [
      { name: "University Acceptance Letter", details: "From SEVP-approved institution" },
      { name: "SEVIS Fee Receipt", details: "I-901 SEVIS fee payment confirmation" }
    ]
  },
  {
    category: "Identity Documents",
    documents: [
      { name: "Valid Passport", details: "Must be valid for at least 6 months beyond intended stay" },
      { name: "Passport Photos", details: "2x2 inches, recent color photographs" }
    ]
  },
  {
    category: "Financial Documents",
    documents: [
      { name: "Bank Statements", details: "Showing sufficient funds for tuition and living expenses" },
      { name: "Sponsor Affidavit of Support", details: "Form I-134 if sponsored by someone" },
      { name: "Scholarship Letters", details: "If receiving financial aid or scholarships" },
      { name: "Education Loan Documents", details: "Loan approval letters and terms" }
    ]
  },
  {
    category: "Academic Records",
    documents: [
      { name: "Academic Transcripts", details: "Official transcripts from all previous institutions" },
      { name: "Standardized Test Scores", details: "SAT, GRE, GMAT, TOEFL, IELTS as required" },
      { name: "Diplomas/Certificates", details: "All educational certificates and degrees" }
    ]
  },
  {
    category: "English Proficiency",
    documents: [
      { name: "TOEFL/IELTS Scores", details: "English language proficiency test results" },
      { name: "Duolingo English Test", details: "Alternative English proficiency proof" }
    ]
  },
  {
    category: "Intent & Ties",
    documents: [
      { name: "Statement of Purpose", details: "Academic and career goals explanation" },
      { name: "Resume/CV", details: "Academic and professional background" },
      { name: "Home Country Ties", details: "Property, employment, family ties documentation" }
    ]
  },
  {
    category: "Interview Preparation",
    documents: [
      { name: "Visa Interview Appointment", details: "Confirmation of scheduled interview" },
      { name: "Supporting Documents", details: "All original documents for interview" }
    ]
  },
  {
    category: "Additional Requirements",
    documents: [
      { name: "Visa Application Fee", details: "MRV fee payment receipt" },
      { name: "Medical Records", details: "Vaccination records if required" }
    ]
  }
];

const USARequirements = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCategoryChange = (idx: number) => {
    setSelectedCategory(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${CountriesRequirementBackground})` }}
      />
      <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-sm" />
      <div className="relative z-10">
        <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                🇺🇸 USA Student Visa Requirements (F-1)
              </h1>
              <p className="text-lg text-slate-500">
                Complete document checklist for US F-1 student visa application
              </p>
            </div>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 w-full">
              <div className="relative h-full">
                <div className="rounded-2xl shadow-xl border-2 border-blue-200/60 bg-white/70 backdrop-blur-md h-full flex flex-col justify-center px-2 py-6">
                  <div className="absolute left-0 top-9 bottom-9 w-2 rounded-full bg-gradient-to-b from-blue-400/70 via-cyan-400/30 to-sky-200/30" />
                  <div className="flex md:flex-col flex-row gap-4 md:gap-0 justify-center md:items-stretch items-center relative z-10">
                    <div className="relative flex md:flex-col flex-row md:gap-0 gap-4 w-full">
                      <div className="hidden md:block absolute left-6 top-7 bottom-7 w-1 pointer-events-none z-0">
                        <motion.div
                          className="w-full h-full rounded bg-gradient-to-b from-blue-200 to-sky-300"
                          layoutId="checklist-bar"
                        />
                      </div>
                      {requirements.map((cat, idx) => {
                        const gradient = gradients[idx % gradients.length];
                        return (
                          <motion.button
                            layout
                            key={cat.category}
                            onClick={() => handleCategoryChange(idx)}
                            className={`group relative z-10 flex items-center md:items-start gap-4 md:gap-2 mb-4 md:mb-0 md:px-0 px-1 focus:outline-none transition-all`}
                            whileHover={{ scale: selectedCategory === idx ? 1.06 : 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            aria-current={selectedCategory === idx ? "step" : undefined}
                          >
                            <div className="relative flex-shrink-0">
                              <motion.div
                                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md border-4 border-white transition-all
                                  ${selectedCategory === idx
                                    ? `bg-gradient-to-br ${gradient} shadow-xl`
                                    : "bg-white"
                                  }
                                `}
                                animate={{
                                  boxShadow:
                                    selectedCategory === idx
                                      ? "0 4px 18px 0 rgba(56,189,248,0.15)"
                                      : "0 1px 3px 0 rgba(0,0,0,0.06)"
                                }}
                                transition={{ type: "spring", stiffness: 120, damping: 11 }}
                              >
                                <span className={`text-slate-600 ${selectedCategory === idx ? "text-white" : "text-blue-500"}`}>
                                  {stepIcons[idx] || <CheckCircle className="w-5 h-5" />}
                                </span>
                              </motion.div>
                              {idx !== requirements.length - 1 && (
                                <span className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-1 h-7 bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl z-[-1]" />
                              )}
                            </div>
                            <div className={`px-2 py-2 transition-all rounded-xl group-hover:bg-blue-50
                              ${selectedCategory === idx
                                ? `bg-white shadow-md border-l-4 border-blue-400 font-semibold text-blue-800`
                                : "text-slate-700"
                              }
                            `}>
                              <div className="truncate text-sm md:text-base">{cat.category}</div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 w-full min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, x: 40, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -40, scale: 0.96 }}
                  transition={{ duration: 0.36, type: "spring" }}
                  className="h-full"
                >
                  <div className={`relative rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border-2 p-1 overflow-hidden border-blue-200 h-full`}>
                    <div
                      className={`absolute inset-x-0 top-0 h-2 rounded-t-2xl bg-gradient-to-r ${gradients[selectedCategory % gradients.length]} opacity-60`}
                    />
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold text-blue-800">
                        <span className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${gradients[selectedCategory % gradients.length]} text-white font-bold shadow`}>
                          {selectedCategory + 1}
                        </span>
                        {requirements[selectedCategory].category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 mt-2 pb-4">
                      {requirements[selectedCategory].documents.map((doc, docIdx) => (
                        <motion.div
                          key={docIdx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: docIdx * 0.08 }}
                          className="p-5 rounded-xl bg-blue-50/80 border border-blue-100 shadow group hover:bg-blue-100 transition-all"
                        >
                          <div className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            {doc.name}
                          </div>
                          <div className="text-sm text-slate-600">{doc.details}</div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <section className="my-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-slate-900">
              Expert Support Channels
            </h2>
            <p className="text-center text-slate-600 max-w-2xl mx-auto mb-10">
              Multiple ways to get help and stay updated throughout your visa journey.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-md p-8 flex-1 min-w-[260px] flex flex-col items-center text-center">
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <Phone className="w-8 h-8 text-blue-500" />
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1 text-slate-900">Phone Support</h3>
                <div className="mb-2 text-slate-600">Direct call with our visa experts</div>
                <a href="tel:+917353446655" className="font-medium text-blue-700 mb-1 hover:underline">+91 7353446655</a>
                <div className="text-sm text-slate-400 mb-4">Mon-Sat, 9 AM - 7 PM</div>
                <Button variant="outline" className="bg-slate-50 text-slate-700 shadow-sm px-6 mt-auto" onClick={() => window.open('tel:+917353446655')}>Call Now</Button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white shadow-md p-8 flex-1 min-w-[260px] flex flex-col items-center text-center">
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <Mail className="w-8 h-8 text-blue-500" />
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1 text-slate-900">Email Support</h3>
                <div className="mb-2 text-slate-600">Detailed queries and document support</div>
                <a href="mailto:connect@globalmindsindia.com" className="font-medium text-blue-700 mb-1 hover:underline">connect@globalmindsindia.com</a>
                <div className="text-sm text-slate-400 mb-4">24/7 Response</div>
                <Button variant="outline" className="bg-slate-50 text-slate-700 shadow-sm px-6 mt-auto" onClick={() => window.open('mailto:connect@globalmindsindia.com')}>Send Email</Button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white shadow-md p-8 flex-1 min-w-[260px] flex flex-col items-center text-center">
                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1 text-slate-900">WhatsApp Support</h3>
                <div className="mb-2 text-slate-600">Quick updates and instant messaging</div>
                <a href="https://wa.me/919071331230" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 mb-1 hover:underline">+91 90713 31230</a>
                <div className="text-sm text-slate-400 mb-4">Real-time Support</div>
                <Button variant="outline" className="bg-slate-50 text-slate-700 shadow-sm px-6 mt-auto" onClick={() => window.open('https://wa.me/919071331230', '_blank')}>Chat Now</Button>
              </div>
            </div>
          </section>
          <section className="flex justify-center items-center my-12">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-x-0 top-0 h-2 rounded-t-2xl bg-gradient-to-r from-blue-100 to-amber-100 opacity-70" />
              <div className="rounded-2xl shadow-xl border border-slate-100 bg-gradient-to-br from-blue-50 via-white to-amber-50 p-8 flex flex-col items-center text-center space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900">
                  Ready to Start Your Visa Journey?
                </h2>
                <p className="max-w-lg text-slate-600 mb-2">
                  Join our students who have obtained their visa certificate through our expert guidance. Let's get started today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow text-white px-6 text-base font-semibold flex items-center gap-2 min-w-[220px]" onClick={() => navigate('/apply')}>
                    Start your Application
                    <span aria-hidden="true">→</span>
                  </Button>
                  <Button variant="outline" className="bg-white shadow px-6 text-base font-semibold flex items-center gap-2 border min-w-[180px]" onClick={() => window.open('tel:+917353446655')}>
                    <span role="img" aria-label="expert" className="text-lg">💡</span>
                    Talk to Expert
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
        <Footer />
      </div>
    </div>
  );
};

export default USARequirements;