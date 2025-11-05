import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface CountryInfo {
  name: string;
  flag: string;
  visaType: string;
  requirements: string[];
  financialProof: string;
  processingTime: string;
  embassyLink: string;
}

const countries: CountryInfo[] = [
  {
    name: "Canada",
    flag: "🇨🇦",
    visaType: "Study Permit",
    requirements: [
      "Acceptance letter from designated learning institution",
      "Valid passport",
      "Proof of financial support (CAD 10,000+)",
      "Medical examination",
      "Police certificate",
      "Biometrics"
    ],
    financialProof: "CAD 10,000 per year + tuition fees",
    processingTime: "8-12 weeks",
    embassyLink: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
  },
  {
    name: "USA",
    flag: "🇺🇸",
    visaType: "F-1 Student Visa",
    requirements: [
      "Form I-20 from SEVP-approved school",
      "Valid passport",
      "DS-160 confirmation",
      "SEVIS fee payment",
      "Financial documents",
      "Visa interview appointment"
    ],
    financialProof: "All tuition + living expenses proof required",
    processingTime: "2-8 weeks",
    embassyLink: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    visaType: "Student Visa",
    requirements: [
      "University admission letter",
      "Blocked account (€11,208)",
      "Health insurance proof",
      "Valid passport",
      "Academic certificates",
      "German language proficiency (if applicable)"
    ],
    financialProof: "€11,208 in blocked account",
    processingTime: "6-12 weeks",
    embassyLink: "https://www.germany.info/us-en/service/visa"
  },
  {
    name: "UK",
    flag: "🇬🇧",
    visaType: "Tier 4 Student Visa",
    requirements: [
      "CAS from licensed sponsor",
      "Valid passport",
      "Financial proof (tuition + £1,334/month)",
      "English proficiency test",
      "TB test certificate",
      "Academic qualifications"
    ],
    financialProof: "Tuition + £1,334/month for 9 months",
    processingTime: "3 weeks",
    embassyLink: "https://www.gov.uk/student-visa"
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    visaType: "Subclass 500",
    requirements: [
      "CoE from registered institution",
      "Genuine Temporary Entrant (GTE)",
      "Financial capacity proof",
      "English proficiency",
      "Health insurance (OSHC)",
      "Health examination"
    ],
    financialProof: "AUD 21,041 per year + tuition",
    processingTime: "4-6 weeks",
    embassyLink: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"
  },
  {
    name: "France",
    flag: "🇫🇷",
    visaType: "Long Stay Study Visa",
    requirements: [
      "Admission letter from French institution",
      "Campus France authorization",
      "Financial resources proof",
      "Accommodation proof",
      "Valid passport",
      "Health insurance"
    ],
    financialProof: "€615 per month (minimum)",
    processingTime: "2-4 weeks",
    embassyLink: "https://france-visas.gouv.fr/en_US/web/france-visas"
  },
];

const Countries = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);

  return (
    <section id="countries" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Country-Wise <span className="text-primary">Visa Information</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your destination country to view detailed visa requirements and processing information
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card
                className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 h-full"
                onClick={() => setSelectedCountry(country)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {country.flag}
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-2 text-foreground">
                    {country.name}
                  </h3>
                  <p className="font-body text-primary font-semibold mb-1">
                    {country.visaType}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    Click for details
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCountry && (
          <Dialog open={!!selectedCountry} onOpenChange={() => setSelectedCountry(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-3xl flex items-center gap-3">
                  <span className="text-4xl">{selectedCountry?.flag}</span>
                  {selectedCountry?.name} - {selectedCountry?.visaType}
                </DialogTitle>
              </DialogHeader>
              
              {selectedCountry && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-heading font-semibold text-lg mb-3 text-primary">Requirements:</h4>
                    <ul className="space-y-2">
                      {selectedCountry.requirements.map((req, idx) => (
                        <li key={idx} className="font-body flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-heading font-semibold mb-2 text-primary">Financial Proof</h4>
                      <p className="font-body text-sm">{selectedCountry.financialProof}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-heading font-semibold mb-2 text-primary">Processing Time</h4>
                      <p className="font-body text-sm">{selectedCountry.processingTime}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    onClick={() => window.open(selectedCountry.embassyLink, '_blank')}
                  >
                    Visit Embassy Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Countries;
