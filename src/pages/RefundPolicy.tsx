import { motion } from "framer-motion";
import { RefreshCw, CheckCircle,IndianRupee, XCircle, AlertTriangle, Phone, Mail, } from "lucide-react";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import countriesBackground from "@/assets/Countries_requirement_background.jpg";

const RefundPolicy = () => {
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
          className="bg-gradient-to-br from-green-100 to-blue-100 py-16"
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
              <RefreshCw className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Refund Policy
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Clear and transparent refund guidelines for our services
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  1. Before Service Initiation
                </h2>
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Full Refund Available</h3>
                  <p className="text-gray-700 mb-4">A full refund is available if:</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">The cancellation request is made within 7 days of payment, and</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">The visa service or communication process has not yet started</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Refunds will be processed within 30 working days after approval.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <XCircle className="w-6 h-6 text-red-600 mr-3" />
                  2. After Service Initiation
                </h2>
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-4">Partial or No Refund</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Once our team has initiated the visa process — including checklist preparation, admission verification, 
                    or document communication — the service is considered started, and refunds will not be applicable. 
                    This is because the service involves personalized effort, document handling, and administrative resources.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                  3. Exceptional Circumstances
                </h2>
                <p className="text-gray-700 mb-4">Refunds may be considered in the following cases:</p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <IndianRupee className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-2">Duplicate Payment</h4>
                    <p className="text-sm text-gray-600">Accidental or duplicate payment</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Errors</h4>
                    <p className="text-sm text-gray-600">Payment issues due to technical problems</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-2">Medical Emergency</h4>
                    <p className="text-sm text-gray-600">Verified medical or emergency situations</p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-orange-800 font-medium">
                    Each request will be individually assessed by management.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Service Modifications (Instead of Refund)</h2>
                <p className="text-gray-700 mb-4">Users may request:</p>
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <RefreshCw className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Transferring the payment to another visa type or intake session</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Holding the service for a future intake</span>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                    <IndianRupee className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Converting payment towards another advisory service (e.g., counseling, SOP review)</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 text-sm">
                    Additional charges may apply depending on service changes.
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Refund Request Process</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Submit Request</h3>
                    <p className="text-gray-700 mb-3">Submit a written request to connect@globalmindsindia.com with:</p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Full Name and Contact Details</li>
                      <li>• Payment Transaction ID and Date</li>
                      <li>• Reason for refund or modification request</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Review and Processing</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• Refund requests will be reviewed within 10–15 working days</p>
                      <p>• Approved refunds will be processed within 30 working days to the original payment method</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <XCircle className="w-6 h-6 text-red-600 mr-3" />
                  6. Non-Refundable Situations
                </h2>
                <div className="bg-red-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4 font-medium">Refunds will not be provided if:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• The visa service has already commenced (communication or checklist sent)</li>
                    <li>• The user fails to submit required documents or stops responding</li>
                    <li>• The visa application is rejected by the embassy or consulate</li>
                    <li>• The user changes their mind or withdraws voluntarily after service initiation</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section variants={fadeInUp}>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact for Refund Queries</h2>
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

export default RefundPolicy;