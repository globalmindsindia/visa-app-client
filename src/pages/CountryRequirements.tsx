import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Award,
  CreditCard,
  Book,
  Globe,
  Heart,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountriesRequirementBackground from "@/assets/Countries_requirement_background.jpg";
import { visaRequirementsService } from "@/services/visaRequirementsService";

const stepIcons = [
  <FileText className="w-5 h-5" />,
  <Award className="w-5 h-5" />,
  <CreditCard className="w-5 h-5" />,
  <Book className="w-5 h-5" />,
  <Globe className="w-5 h-5" />,
  <Heart className="w-5 h-5" />,
  <Star className="w-5 h-5" />,
];

const gradients = [
  "from-blue-400 to-blue-600",
  "from-cyan-400 to-teal-500",
  "from-violet-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-amber-400 to-yellow-500",
  "from-sky-400 to-blue-400",
  "from-indigo-400 to-fuchsia-500",
  "from-teal-400 to-green-500",
];

const CountryRequirements = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    visaRequirementsService
      .getBySlug(countrySlug!)
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/not-found");
      });
  }, [countrySlug]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading requirements...
      </div>
    );
  }

  if (!country) return null;

  const requirements = country.detailedRequirements;

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${CountriesRequirementBackground})` }}
      />
      <div className="absolute inset-0 bg-slate-50/85 backdrop-blur-sm" />

      <div className="relative z-10">
        <Header />

        <main className="flex-grow py-12">
          <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-5xl">
            {/* TITLE */}
            <motion.div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                <img
                  src={`https://flagcdn.com/w80/${country.flagCode}.png`}
                  className="inline w-10 h-10 rounded-full mr-2"
                />
                {country.name} – {country.visaType}
              </h1>

              <p className="text-lg text-slate-500 mt-2">
                Complete visa requirement guide for studying in {country.name}
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* CATEGORY LIST */}
              <div className="md:w-1/3 w-full">
                <div className="rounded-xl bg-white/70 backdrop-blur-md shadow-xl p-4">
                  {requirements.map((cat: any, idx: number) => (
                    <motion.button
                      key={cat._id}
                      onClick={() => setSelectedCategory(idx)}
                      className={`w-full text-left p-3 rounded-lg mb-3 transition-all border 
                        ${
                          selectedCategory === idx
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white"
                        }`}
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${
                            gradients[idx % gradients.length]
                          } text-white shadow`}
                        >
                          {stepIcons[idx] || <FileText />}
                        </div>
                        <span className="font-medium text-slate-800">
                          {cat.category}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* DOCUMENTS SECTION */}
              <div className="md:w-2/3 w-full min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="bg-white/90 shadow-xl border border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold text-blue-700 flex items-center gap-3">
                          <span
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${
                              gradients[selectedCategory % gradients.length]
                            }`}
                          >
                            {selectedCategory + 1}
                          </span>
                          {requirements[selectedCategory].category}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {requirements[selectedCategory].documents.map(
                          (doc: any, i: number) => (
                            <div
                              key={doc._id}
                              className="p-4 border border-blue-100 bg-blue-50 rounded-xl"
                            >
                              <div className="font-semibold text-blue-900 mb-1 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-500" />
                                {doc.name}
                              </div>
                              <div className="text-sm text-slate-600">
                                {doc.details}
                              </div>
                            </div>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CountryRequirements;
