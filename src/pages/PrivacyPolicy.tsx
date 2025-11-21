import { motion } from "framer-motion";
import { Shield, Lock, Eye, Phone, Mail } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import countriesBackground from "@/assets/Countries_requirement_background.jpg";


const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen font-body relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 pointer-events-none z-0"
        style={{ backgroundImage: `url(${countriesBackground})` }}
      />
      <Header />
      <main>
        <motion.div 
          className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your privacy and data security are our top priorities
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 py-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-4xl mx-auto">
            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 text-primary mr-3" />
                  1. Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Global Minds India  is committed to safeguarding your personal information and ensuring privacy in all visa application and study abroad services. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our visa assistance platform.
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information (Provided by You):</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Full Name, Email Address, and Mobile Number</li>
                      <li>• Country of Application, University, and Course Details</li>
                      <li>• Uploaded documents such as Admission/Acceptance Letters and Visa Supporting Documents</li>
                      <li>• Passport and travel information (where applicable)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Website usage data (via cookies and analytics tools)</li>
                      <li>• IP address, device, and browser information</li>
                      <li>• Communication and interaction logs (email, chat, or form submissions)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We collect and process your information for the following purposes:</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>• To facilitate visa application assistance and document guidance</li>
                  <li>• To verify eligibility and prepare country-specific checklists</li>
                  <li>• To send confirmation emails, payment receipts, and update notifications</li>
                  <li>• To improve our services and ensure quality support</li>
                  <li>• To comply with applicable legal or government requirements</li>
                </ul>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">
                    We do not sell, rent, or share your personal data with third parties, except when necessary for visa assistance or when required by law.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 text-primary mr-3" />
                  4. Data Protection & Security
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>• All personal data and uploaded files are stored on secure, encrypted servers with restricted internal access</li>
                  <li>• Payments are processed through PCI DSS–compliant gateways (Razorpay or Stripe) to ensure transaction safety</li>
                  <li>• Access to documents and personal information is strictly limited to authorized personnel</li>
                  <li>• We maintain administrative, technical, and physical safeguards to protect against unauthorized access, loss, or misuse</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Confidentiality of Documents</h2>
                <div className="bg-red-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    All uploaded admission letters, passport copies, and visa-related files are treated as confidential. 
                    Your documents are never shared or disclosed to universities, embassies, or third parties without your explicit consent.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Request access to your personal information</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Request correction or deletion of your data</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Withdraw consent for data processing</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Request clarification about data usage</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
                <p className="text-center mb-6">For any privacy or data-related concerns, please contact:</p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:connect@globalmindsindia.com" className="hover:underline">connect@globalmindsindia.com</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <a href="tel:+917353446655" className="hover:underline">+91-7353446655</a>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PrivacyPolicy;