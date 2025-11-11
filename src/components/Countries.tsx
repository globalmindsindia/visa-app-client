import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";

// Utility to get SVG flag URL by ISO 2-letter country code
const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

interface CountryInfo {
  name: string;
  flagCode: string; // ISO 2-letter code
  visaType: string;
  requirements: string[];
  financialProof: string;
  processingTime: string;
  embassyLink: string;
  backgroundImage: string; // URL for transparent background image of famous place
}

const countries: CountryInfo[] = [
  {
    name: "USA",
    flagCode: "us",
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
    embassyLink: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    backgroundImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80" // Statue of Liberty
  },
  {
    name: "Canada",
    flagCode: "ca",
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
    embassyLink: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    backgroundImage: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80" // CN Tower
  },
  {
    name: "UK",
    flagCode: "gb",
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
    embassyLink: "https://www.gov.uk/student-visa",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1664303991463-36449a65d3d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VWslMjBCaWclMjBCZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500" // Big Ben
  },
  {
    name: "Australia",
    flagCode: "au",
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
    embassyLink: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
    backgroundImage: "https://images.unsplash.com/photo-1595740229246-cfdda61917c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3lkbmV5JTIwT3BlcmElMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500" // Sydney Opera House
  },
  {
    name: "Germany",
    flagCode: "de",
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
    embassyLink: "https://www.germany.info/us-en/service/visa",
    backgroundImage: "https://images.unsplash.com/photo-1587330979470-3595ac045ab0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJhbmRlbmJ1cmclMjBHYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" // Brandenburg Gate
  },
  {
    name: "France",
    flagCode: "fr",
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
    embassyLink: "https://france-visas.gouv.fr/en_US/web/france-visas",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1661963064037-cfcf2e10db2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8RWlmZmVsJTIwVG93ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500" // Eiffel Tower
  },
  {
    name: "New Zealand",
    flagCode: "nz",
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
    embassyLink: "https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/student-visa",
    backgroundImage: "data:image/jpeg;base64,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" // Milford Sound
  },
  {
    name: "Ireland",
    flagCode: "ie",
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
    embassyLink: "https://www.irishimmigration.ie/coming-to-study-in-ireland/",
    backgroundImage: "https://images.unsplash.com/photo-1644955529419-b4b6c54a1022?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SXJlbGFuZCUyMC0lMjBEdWJsaW4lMjBDYXN0bGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500" // Dublin Castle
  },
  {
    name: "Netherlands",
    flagCode: "nl",
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
    embassyLink: "https://www.government.nl/topics/immigration-to-the-netherlands/student-visa",
    backgroundImage: "https://plus.unsplash.com/premium_photo-1661931625680-cd916bc75340?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TmV0aGVybGFuZHMlMjAtJTIwQW1zdGVyZGFtJTIwV2luZG1pbGxzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" // Amsterdam Windmills
  },
  {
    name: "Italy",
    flagCode: "it",
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
    embassyLink: "https://vistoperitalia.esteri.it/home/en",
    backgroundImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80" // Colosseum
  },
  {
    name: "Singapore",
    flagCode: "sg",
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
    embassyLink: "https://www.ica.gov.sg/enter-depart/entry_requirements/student-pass",
    backgroundImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80" // Marina Bay Sands
  },
  {
    name: "UAE",
    flagCode: "ae",
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
    embassyLink: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visa/student-residence-visa",
    backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" // Burj Khalifa
  },
  {
    name: "South Korea",
    flagCode: "kr",
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
    embassyLink: "https://www.hikorea.go.kr/",
    backgroundImage: "https://images.unsplash.com/photo-1678649579235-95d84c92246e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U291dGglMjBLb3JlYSUyMC0lMjBHeWVvbmdib2tndW5nJTIwUGFsYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500" // Gyeongbokgung Palace
  },
  {
    name: "Japan",
    flagCode: "jp",
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
    embassyLink: "https://www.mofa.go.jp/j_info/visit/visa/",
    backgroundImage: "https://images.unsplash.com/photo-1599173705513-0880f530cd3d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEphcGFuJTIwLSUyME1vdW50JTIwRnVqaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500" // Mount Fuji
  }
];

// Motion variants for subtle zoom effect on cards
const cardMotion: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 8px 28px 0 rgba(31, 38, 135, 0.10)",
    transition: { duration: 0.2, type: "tween" }
  },
  hover: {
    scale: 1.08,
    boxShadow: "0 16px 32px 0 rgba(31, 38, 135, 0.18)",
    transition: { duration: 0.25, type: "spring", stiffness: 200 }
  }
};

const Countries = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);

  const handleCountryClick = (country: CountryInfo) => {
    const slug = country.name.replace(/\s+/g, "").replace(/[^\w]/gi, "").toLowerCase();
    navigate(`/${slug}-requirements`);
  };

  return (
    <section id="countries" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-center">
            Find the Right Study Visa for Your
            <br />
            <span className="text-primary block mt-2">Dream Destination</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your destination country to view detailed visa requirements and processing information
          </p>
        </motion.div>

        {/* First Row - Moving Right */}
        <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
          <motion.div
            className="flex gap-3 sm:gap-4 md:gap-6"
            animate={{ x: ["-100%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...countries.slice(0, 7), ...countries.slice(0, 7)].map((country, index) => (
              <motion.div
                key={`row1-${index}`}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80"
                variants={cardMotion}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Card
                  onClick={() => handleCountryClick(country)}
                  className="cursor-pointer relative border-2 border-muted hover:border-primary/60 h-full bg-card backdrop-blur-2xl rounded-lg overflow-hidden"
                >
                  <div
                    style={{
                      backgroundImage: `url(${country.backgroundImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      opacity: 0.15,
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      zIndex: 0
                    }}
                  />
                  <CardContent className="relative p-6 text-center flex flex-col items-center z-10">
                    <motion.div
                      className="rounded-full shadow-md border-4 border-white group-hover:border-primary transition-all duration-300 overflow-hidden w-16 h-16 flex items-center justify-center mb-3"
                      whileHover={{ scale: 1.13, boxShadow: "0 2px 32px 0 rgba(96, 165, 251, 0.18)" }}
                    >
                      <img
                        src={getFlagUrl(country.flagCode)}
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover transition-transform duration-300"
                        draggable={false}
                        loading="lazy"
                      />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl mb-1 text-foreground">
                      {country.name}
                    </h3>
                    <p className="font-body bg-primary/10 text-primary font-semibold rounded-lg px-2 py-1 mb-2 text-sm">
                      {country.visaType}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">Click for details</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Row - Moving Left */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-3 sm:gap-4 md:gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...countries.slice(7), ...countries.slice(7)].map((country, index) => (
              <motion.div
                key={`row2-${index}`}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-80"
                variants={cardMotion}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Card
                  onClick={() => handleCountryClick(country)}
                  className="cursor-pointer relative border-2 border-muted hover:border-primary/60 h-full bg-card backdrop-blur-2xl rounded-lg overflow-hidden"
                >
                  <div
                    style={{
                      backgroundImage: `url(${country.backgroundImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      opacity: 0.15,
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      zIndex: 0
                    }}
                  />
                  <CardContent className="relative p-6 text-center flex flex-col items-center z-10">
                    <motion.div
                      className="rounded-full shadow-md border-4 border-white group-hover:border-primary transition-all duration-300 overflow-hidden w-16 h-16 flex items-center justify-center mb-3"
                      whileHover={{ scale: 1.13, boxShadow: "0 2px 32px 0 rgba(96, 165, 251, 0.18)" }}
                    >
                      <img
                        src={getFlagUrl(country.flagCode)}
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover transition-transform duration-300"
                        draggable={false}
                        loading="lazy"
                      />
                    </motion.div>
                    <h3 className="font-heading font-bold text-2xl mb-1 text-foreground">
                      {country.name}
                    </h3>
                    <p className="font-body bg-primary/10 text-primary font-semibold rounded-lg px-2 py-1 mb-2 text-sm">
                      {country.visaType}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">Click for details</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* COUNTRY MODAL */}
      <AnimatePresence>
        {selectedCountry && (
          <Dialog open={!!selectedCountry} onOpenChange={() => setSelectedCountry(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-3xl flex items-center gap-3">
                  <img
                    src={getFlagUrl(selectedCountry.flagCode)}
                    alt={`${selectedCountry.name} flag`}
                    className="w-10 h-10 rounded-full border-2 border-primary"
                  />
                  {selectedCountry.name} - {selectedCountry.visaType}
                </DialogTitle>
              </DialogHeader>
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
                  onClick={() => window.open(selectedCountry.embassyLink, "_blank")}
                >
                  Visit Embassy Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Countries;
