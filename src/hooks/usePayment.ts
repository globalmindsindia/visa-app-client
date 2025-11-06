
import { useState } from "react";
import { toast } from "sonner";
import { paymentService } from "@/services/paymentService";
import { loadRazorpayScript } from "@/services/razorpay";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (formData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setIsProcessing(true);
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway");
      }
      
      // Check if Razorpay is available
      if (!window.Razorpay) {
        console.error("Razorpay not loaded");
        throw new Error("Razorpay script not loaded properly");
      }

      // Create order via API
      const orderData = await paymentService.createOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: 10000, // Amount in rupees, backend should convert to paise
        description: "Visa Application Processing Fee"
      });
      
      console.log("Order data received:", orderData);

      return new Promise((resolve) => {
        const options = {
          key: orderData.razorpay_key_id,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "Global Minds India",
          description: "Visa Application Processing Fee",
          order_id: orderData.order_id,
          handler: async (response: any) => {
            try {
              console.log("Razorpay response:", response);
              
              await paymentService.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                internal_receipt_id: orderData.internal_receipt_id
              });
              
              toast.success("Payment successful! Application submitted.");
              resolve({ success: true });
            } catch (error) {
              console.error("Payment verification error:", error);
              toast.error("Payment verification failed");
              resolve({ success: false });
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: "#3B82F6"
          },
          modal: {
            ondismiss: () => {
              toast.error("Payment cancelled");
              resolve({ success: false });
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        
        razorpay.on('payment.failed', (response: any) => {
          toast.error("Payment failed. Please try again.");
          resolve({ success: false });
        });
        
        razorpay.open();
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed");
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return { processPayment, isProcessing };
};