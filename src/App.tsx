import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import USARequirements from "./pages/USARequirements";
import CanadaRequirements from "./pages/CanadaRequirements";
import UKRequirements from "./pages/UKRequirements";
import AustraliaRequirements from "./pages/AustraliaRequirements";
import GermanyRequirements from "./pages/GermanyRequirements";
import FranceRequirements from "./pages/FranceRequirements";
import NewZealandRequirements from "./pages/NewZealandRequirements";
import IrelandRequirements from "./pages/IrelandRequirements";
import NetherlandsRequirements from "./pages/NetherlandsRequirements";
import ItalyRequirements from "./pages/ItalyRequirements";
import SingaporeRequirements from "./pages/SingaporeRequirements";
import UAERequirements from "./pages/UAERequirements";
import SouthKoreaRequirements from "./pages/SouthKoreaRequirements";
import JapanRequirements from "./pages/JapanRequirements";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/success" element={<Success />} />
          <Route path="/usa-requirements" element={<USARequirements />} />
          <Route path="/canada-requirements" element={<CanadaRequirements />} />
          <Route path="/uk-requirements" element={<UKRequirements />} />
          <Route path="/australia-requirements" element={<AustraliaRequirements />} />
          <Route path="/germany-requirements" element={<GermanyRequirements />} />
          <Route path="/france-requirements" element={<FranceRequirements />} />
          <Route path="/newzealand-requirements" element={<NewZealandRequirements />} />
          <Route path="/ireland-requirements" element={<IrelandRequirements />} />
          <Route path="/netherlands-requirements" element={<NetherlandsRequirements />} />
          <Route path="/italy-requirements" element={<ItalyRequirements />} />
          <Route path="/singapore-requirements" element={<SingaporeRequirements />} />
          <Route path="/uae-requirements" element={<UAERequirements />} />
          <Route path="/southkorea-requirements" element={<SouthKoreaRequirements />} />
          <Route path="/japan-requirements" element={<JapanRequirements />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
