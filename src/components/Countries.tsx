import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    name: "UK",
    flag: "🇬🇧",
    visaType: "Student Visa",
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
  {
    name: "New Zealand",
    flag: "🇳🇿",
    visaType: "Student Visa",
    requirements: [
      "Offer of place from approved institution",
      "Valid passport",
      "Financial proof (NZD 15,000/year)",
      "Health insurance",
      "Medical examination",
      "Character requirements"
    ],
    financialProof: "NZD 15,000 per year + tuition",
    processingTime: "4-6 weeks",
    embassyLink: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/student-visa"
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    visaType: "Study Visa",
    requirements: [
      "Letter of acceptance from institution",
      "Valid passport",
      "Financial proof (€7,000)",
      "Medical insurance",
      "Academic qualifications",
      "English proficiency"
    ],
    financialProof: "€7,000 minimum + tuition fees",
    processingTime: "4-8 weeks",
    embassyLink: "https://www.irishimmigration.ie/coming-to-study-in-ireland/"
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    visaType: "Student Visa",
    requirements: [
      "Admission letter from Dutch institution",
      "Valid passport",
      "Financial proof (€10,800/year)",
      "Health insurance",
      "Academic certificates",
      "TB test (if applicable)"
    ],
    financialProof: "€10,800 per year + tuition",
    processingTime: "2-4 weeks",
    embassyLink: "https://www.government.nl/topics/immigration-to-the-netherlands/student-visa"
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    visaType: "Student Visa",
    requirements: [
      "University enrollment certificate",
      "Valid passport",
      "Financial proof (€5,824.91/year)",
      "Accommodation proof",
      "Health insurance",
      "Academic qualifications"
    ],
    financialProof: "€5,824.91 per year minimum",
    processingTime: "3-6 weeks",
    embassyLink: "https://vistoperitalia.esteri.it/home/en"
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    visaType: "Student Pass",
    requirements: [
      "Letter of acceptance from institution",
      "Valid passport",
      "Financial proof (SGD 15,000/year)",
      "Medical examination",
      "Academic certificates",
      "Form 16 application"
    ],
    financialProof: "SGD 15,000 per year + tuition",
    processingTime: "2-4 weeks",
    embassyLink: "https://www.ica.gov.sg/enter-depart/entry_requirements/student-pass"
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    visaType: "Student Visa",
    requirements: [
      "University admission letter",
      "Valid passport",
      "Financial proof (AED 40,000/year)",
      "Medical fitness certificate",
      "Academic certificates",
      "No objection certificate"
    ],
    financialProof: "AED 40,000 per year + tuition",
    processingTime: "2-3 weeks",
    embassyLink: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visa/student-residence-visa"
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    visaType: "D-2 Student Visa",
    requirements: [
      "Certificate of admission",
      "Valid passport",
      "Financial proof (USD 18,000/year)",
      "Health certificate",
      "Academic transcripts",
      "Korean proficiency (if applicable)"
    ],
    financialProof: "USD 18,000 per year + tuition",
    processingTime: "1-2 weeks",
    embassyLink: "https://www.hikorea.go.kr/"
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    visaType: "Student Visa",
    requirements: [
      "Certificate of eligibility",
      "Valid passport",
      "Financial proof (¥2,000,000/year)",
      "Academic certificates",
      "Health certificate",
      "Japanese proficiency (if applicable)"
    ],
    financialProof: "¥2,000,000 per year + tuition",
    processingTime: "1-3 weeks",
    embassyLink: "https://www.mofa.go.jp/j_info/visit/visa/"
  },
];

const Countries = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  
  const handleCountryClick = (country: CountryInfo) => {
    if (country.name === "USA") {
      navigate("/usa-requirements");
    } else if (country.name === "Canada") {
      navigate("/canada-requirements");
    } else if (country.name === "UK") {
      navigate("/uk-requirements");
    } else if (country.name === "Australia") {
      navigate("/australia-requirements");
    } else if (country.name === "Germany") {
      navigate("/germany-requirements");
    } else if (country.name === "France") {
      navigate("/france-requirements");
    } else if (country.name === "New Zealand") {
      navigate("/newzealand-requirements");
    } else if (country.name === "Ireland") {
      navigate("/ireland-requirements");
    } else if (country.name === "Netherlands") {
      navigate("/netherlands-requirements");
    } else if (country.name === "Italy") {
      navigate("/italy-requirements");
    } else if (country.name === "Singapore") {
      navigate("/singapore-requirements");
    } else if (country.name === "UAE") {
      navigate("/uae-requirements");
    } else if (country.name === "South Korea") {
      navigate("/southkorea-requirements");
    } else if (country.name === "Japan") {
      navigate("/japan-requirements");
    } else {
      setSelectedCountry(country);
    }
  };

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

        {/* First Row - Moving Right */}
        <div className="overflow-hidden mb-8">
          <motion.div 
            className="flex gap-6"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...countries.slice(0, 7), ...countries.slice(0, 7)].map((country, index) => (
              <motion.div
                key={`row1-${index}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 h-full"
                  onClick={() => handleCountryClick(country)}
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
          </motion.div>
        </div>

        {/* Second Row - Moving Left */}
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...countries.slice(7), ...countries.slice(7)].map((country, index) => (
              <motion.div
                key={`row2-${index}`}
                className="flex-shrink-0 w-80"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 h-full"
                  onClick={() => handleCountryClick(country)}
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
          </motion.div>
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