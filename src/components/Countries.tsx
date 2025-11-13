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
    backgroundImage:"https://images.unsplash.com/photo-1685059269737-25d9b7cef218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TmV3JTIwWmVhbGFuZCUyMC0lMjBNaWxmb3JkJTIwU291bmR8ZW58MHx8MHx8fDA%3D"
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
