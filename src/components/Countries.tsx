import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { visaRequirementsService } from "@/services/visaRequirementsService";

// Utility to get SVG flag URL by ISO 2-letter country code
const getFlagUrl = (code: string) =>
  `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

interface CountryInfo {
  name: string;
  slug: string;
  flagCode: string;
  visaType: string;
  shortRequirements: string[];
  financialProof: string;
  processingTime: string;
  embassyLink: string;
  backgroundImage: string;
}

// Motion variants for subtle zoom effect on cards
const cardMotion: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 8px 28px 0 rgba(31, 38, 135, 0.10)",
    transition: { duration: 0.2, type: "tween" },
  },
  hover: {
    scale: 1.08,
    boxShadow: "0 16px 32px 0 rgba(31, 38, 135, 0.18)",
    transition: { duration: 0.25, type: "spring", stiffness: 200 },
  },
};

const Countries = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<CountryInfo[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(
    null
  );

  // Fetch countries dynamically from backend
  useEffect(() => {
    visaRequirementsService
      .getAll()
      .then((res) => {
        setCountries(res.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCountryClick = (country: CountryInfo) => {
    const slug = country.name
      .replace(/\s+/g, "")
      .replace(/[^\w]/gi, "")
      .toLowerCase();

    navigate(`/requirements/${slug}`);
  };

  // Split countries evenly into 2 rows
  const halfway = Math.ceil(countries.length / 2);
  const row1 = countries.slice(0, halfway);
  const row2 = countries.slice(halfway);

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
            Select your destination country to view detailed visa requirements
            and processing information
          </p>
        </motion.div>

        {countries.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            Loading countries...
          </p>
        ) : (
          <>
            {/* First Row - Moving Right */}
            <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
              <motion.div
                className="flex gap-3 sm:gap-4 md:gap-6"
                animate={{ x: ["-100%", "0%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...row1, ...row1].map((country, index) => (
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
                          zIndex: 0,
                        }}
                      />
                      <CardContent className="relative p-6 text-center flex flex-col items-center z-10">
                        <motion.div
                          className="rounded-full shadow-md border-4 border-white group-hover:border-primary transition-all duration-300 overflow-hidden w-16 h-16 flex items-center justify-center mb-3"
                          whileHover={{
                            scale: 1.13,
                            boxShadow: "0 2px 32px 0 rgba(96, 165, 251, 0.18)",
                          }}
                        >
                          <img
                            src={getFlagUrl(country.flagCode)}
                            alt={`${country.name} flag`}
                            className="w-full h-full object-cover"
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
                        <p className="font-body text-xs text-muted-foreground">
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
                className="flex gap-3 sm:gap-4 md:gap-6"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...row2, ...row2].map((country, index) => (
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
                          zIndex: 0,
                        }}
                      />
                      <CardContent className="relative p-6 text-center flex flex-col items-center z-10">
                        <motion.div
                          className="rounded-full shadow-md border-4 border-white group-hover:border-primary transition-all duration-300 overflow-hidden w-16 h-16 flex items-center justify-center mb-3"
                          whileHover={{
                            scale: 1.13,
                            boxShadow: "0 2px 32px 0 rgba(96, 165, 251, 0.18)",
                          }}
                        >
                          <img
                            src={getFlagUrl(country.flagCode)}
                            alt={`${country.name} flag`}
                            className="w-full h-full object-cover"
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
                        <p className="font-body text-xs text-muted-foreground">
                          Click for details
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* COUNTRY MODAL */}
      <AnimatePresence>
        {selectedCountry && (
          <Dialog
            open={!!selectedCountry}
            onOpenChange={() => setSelectedCountry(null)}
          >
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
                  <h4 className="font-heading font-semibold text-lg mb-3 text-primary">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {selectedCountry.shortRequirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="font-body flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-heading font-semibold mb-2 text-primary">
                      Financial Proof
                    </h4>
                    <p className="font-body text-sm">
                      {selectedCountry.financialProof}
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-heading font-semibold mb-2 text-primary">
                      Processing Time
                    </h4>
                    <p className="font-body text-sm">
                      {selectedCountry.processingTime}
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() =>
                    window.open(selectedCountry.embassyLink, "_blank")
                  }
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
