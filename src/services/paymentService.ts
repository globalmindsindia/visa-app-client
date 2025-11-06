import axios from "axios";

const BASE_URL = "https://services.globalmindsindia.in/api/payment";

export const paymentService = {
  createOrder: async (data: {
    name: string;
    email: string;
    phone: string;
    amount: number;
    description: string;
  }) => {
    try {
      console.log("Starting payment...");
      console.log("User data:", data);
      console.log("API URL:", `${BASE_URL}/create_order`);
      
      const response = await axios.post(`${BASE_URL}/create_order`, data);
      console.log("Order created:", response.data);
      
      // Map response to expected format
      return {
        razorpay_key_id: response.data.key,
        amount: response.data.amount,
        order_id: response.data.id,
        internal_receipt_id: response.data.internal_receipt_id,
        currency: response.data.currency || "INR"
      };
    } catch (error: any) {
      console.error("Create order error:", error);
      console.error("Error response:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to create order"
      );
    }
  },

  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    internal_receipt_id: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify`, data);
      return response.data;
    } catch (error: any) {
      console.error("Verify payment error:", error);
      throw new Error(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  },
};