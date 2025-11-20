import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Why is a visa important to travel abroad?",
    answer: "A visa is an official permission from a country that allows you to enter, stay, or study there legally."
  },
  {
    question: "What are the basic requirements for a visa application?",
    answer: "A valid passport, photos, financial proof, admission letter (for students), and completed application forms."
  },
  {
    question: "How early should I apply for my study visa?",
    answer: "It’s best to apply 2–3 months before your travel date to avoid delays."
  },
  {
    question: "Do I need financial proof for a study visa?",
    answer: "Yes, you must show you can afford tuition fees, living expenses, and travel costs."
  },
  {
    question: "What type of photos are required for a visa?",
    answer: "Passport-size photos that meet the specific size and background guidelines of the destination country."
  },
  {
    question: "Why is health insurance required for a visa?",
    answer: "Many countries want students to have medical coverage in case of emergencies."
  },
  {
    question: "Do all countries need biometric verification?",
    answer: "Most countries ask for fingerprints and a photo to verify your identity."
  },
  {
    question: "Why do visa applications get rejected?",
    answer: "Common reasons include incomplete documents, insufficient funds, wrong information, or failure to meet requirements."
  },
  {
    question: "What is a visa interview and why is it needed?",
    answer: "A visa interview helps officers confirm your genuine intention to study and your financial stability."
  },
  {
    question: "Why is a Statement of Purpose (SOP/LOM) required for a study visa?",
    answer: "It explains your academic background, reasons for studying abroad, and future goals."
  },
  {
    question: "How important is English proficiency for a visa?",
    answer: "Many countries require IELTS/PTE/TOEFL scores to ensure you can handle academic coursework."
  },
  {
    question: "Do I need to pay a visa fee?",
    answer: "Yes, every country charges a non-refundable fee for processing your application."
  },
  {
    question: "What happens after my visa gets approved?",
    answer: "You receive your visa stamp/letter and can book your travel and prepare for departure."
  },
  {
    question: "Can I track my visa application status?",
    answer: "Yes, almost all visa applications can be tracked online through official portals."
  },
  {
    question: "What should I do if my visa gets delayed?",
    answer: "Stay calm, keep checking updates, and contact the embassy or VFS center if needed. Sometimes delays are routine."
  }
];

const FAQ = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our visa application services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {displayedFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border-2 rounded-lg px-4 sm:px-6 hover:border-primary/50 transition-colors"
                >
                <AccordionTrigger className="font-heading font-semibold text-left hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="font-heading font-semibold"
            >
              {showAll ? "View Less" : "View More"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
