import { getApi } from "@/api/api";
import axios from "axios";

export const visaService = {
  // =====================================================
  // STEP 1 - CREATE LEAD
  // =====================================================
  async createLead(payload: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    leadSource: string;
  }) {
    const { data } = await getApi().post("/v1/leads", payload);
    return { success: true, data };
  },

  // =====================================================
  // STEP 2 - CREATE VISA APPLICANT DETAILS
  // =====================================================
  async createApplicant(payload: {
    leadId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city?: string;
    country: string;
    universityName: string;
    courseName: string;
    intake: string;
  }) {
    const { data } = await getApi().post("/v1/visa-applicants", payload);
    return { success: true, data };
  },

  // =====================================================
  // STEP 3 - UPLOAD ADMISSION LETTER
  // =====================================================
  async uploadDocument(
    file: File,
    meta: {
      leadId: string;
      visaApplicantId: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      city: string;
      country: string;
      universityName: string;
      courseName: string;
      intake: string;
    }
  ) {
    const form = new FormData();
    form.append("file", file);

    // Append all metadata
    Object.entries(meta).forEach(([key, value]) => {
      form.append(key, value as string);
    });

    const { data } = await getApi().post(
      "/v1/document-uploads/upload-admission-letter",
      form,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return { success: true, data };
  },

  // =====================================================
  // STEP 4 - CREATE USER AFTER PAYMENT
  // =====================================================
  async completePayment(payload: { leadId: string; visaApplicantId: string }) {
    const { data } = await getApi().post(
      "/v1/visa-applicants/complete-payment",
      payload
    );
    return data;
  },

  // =====================================================
  // ALREADY EXISTING METHODS (UNCHANGED)
  // =====================================================
  async storeApsUser(payload: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    domainUrl: string;
  }) {
    const { data } = await getApi().post("/v1/users/student/register", payload);
    return data;
  },

  async storeInZoho(payload: {
    contact: {
      Last_Name: string;
      First_Name: string;
      Email: string;
      Phone: string;
    };
    userTypeId: string;
  }) {
    const { data } = await getApi().post("/v1/zoho/contacts/invite", payload);
    return data;
  },

  async payment(payload: {
    name: string;
    email: string;
    mobile: string;
    amount: string;
    application: string;
    redirectUri: string;
  }) {
    try {
      const { data } = await axios.post(
        "https://globalmindsindia.co.in/v1/auth/initiate-payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data; // { merchantTxnNo, paymentUrl }
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Payment initiation failed"
      );
    }
  },
};
