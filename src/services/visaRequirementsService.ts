import { getApi } from "@/api/api";

export const visaRequirementsService = {
  getAll() {
    return getApi().get("/v1/visa-requirements");
  },

  getBySlug(slug: string) {
    return getApi().get(`/v1/visa-requirements/${slug}`);
  },
};
