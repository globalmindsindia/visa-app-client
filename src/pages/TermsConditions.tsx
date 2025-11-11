import { motion } from "framer-motion";
import { FileText, Users, CreditCard, Clock, Shield, Phone, Mail } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import countriesBackground from "@/assets/countries_requirement_background.jpg";

const TermsConditions = () => {
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
          className="bg-gradient-to-br from-secondary/10 to-primary/10 py-16"
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
              <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Terms & Conditions
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Please review our terms carefully before using our services
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Welcome to Global Minds India ("we," "us," or "our"). By using our visa application assistance services, 
                  you agree to these Terms and Conditions. Please review them carefully before proceeding.
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="w-6 h-6 text-secondary mr-3" />
                  2. Scope of Services
                </h2>
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Our services include:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Visa application assistance and documentation guidance</li>
                    <li>• Country-specific checklist communication and follow-up</li>
                    <li>• Counseling and advisory support related to visa documentation</li>
                    <li>• Payment collection for consultancy and processing support</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium">
                    We do not represent or act on behalf of any embassy, government, or immigration authority. 
                    Our role is strictly limited to consultation, document guidance, and administrative support.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Responsibility</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Users are responsible for:</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Providing accurate personal, academic, and travel details</li>
                      <li>• Uploading genuine and valid documents only</li>
                      <li>• Reviewing information before final submission</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Note:</h3>
                    <p className="text-gray-700">
                      Global Minds India is not responsible for rejections or delays caused by incomplete, 
                      false, or misleading information provided by the user.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 text-secondary mr-3" />
                  4. Fees and Payments
                </h2>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• All services are payable in advance before the initiation of processing</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Payment once made is non-refundable after service commencement, except as defined in the Refund Policy</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Payments are processed securely through approved gateways (Razorpay/Stripe)</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700">• Applicable taxes and transaction fees will be clearly displayed during checkout</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Post-Payment Process</h2>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">After payment confirmation:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <p className="text-gray-700">The user will receive a payment success email</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <p className="text-gray-700">The system will automatically send a country-specific document checklist email</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <p className="text-gray-700">Upload access or document collection instructions will follow</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-6 h-6 text-secondary mr-3" />
                  6. Service Delivery & Timelines
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>• Estimated processing timelines will be informed during registration or onboarding</li>
                  <li>• Delays caused by incomplete user inputs or external embassy factors are beyond our control</li>
                  <li>• Global Minds India is not liable for embassy schedule changes or system downtime</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 text-secondary mr-3" />
                  7. Limitation of Liability
                </h2>
                <div className="bg-orange-50 rounded-lg p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Our liability is limited to the total amount paid for the service</li>
                    <li>• We are not liable for visa refusals, embassy decisions, or appointment unavailability</li>
                    <li>• Global Minds India shall not be held responsible for any losses arising due to third-party platforms or delays</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Amendments</h2>
                <p className="text-gray-700 leading-relaxed">
                  Global Minds India reserves the right to modify or update these Terms and Conditions without prior notice. 
                  Users will be notified of significant changes via email or website announcement.
                </p>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Support</h2>
                <p className="text-center mb-6">For support or clarification regarding our services:</p>
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

export default TermsConditions;