import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is the typical visa processing time?",
    answer: "Processing times vary by country, ranging from 2-12 weeks. Canada typically takes 8-12 weeks, USA 2-8 weeks, UK 3 weeks, and Australia 4-6 weeks. We provide priority support to expedite the process wherever possible."
  },
  {
    question: "Is an admission letter required before applying for a visa?",
    answer: "Yes, most countries require a valid admission or acceptance letter from a recognized educational institution. This is a mandatory document for student visa applications across all major study destinations."
  },
  {
    question: "What happens if my visa application is refused?",
    answer: "In case of refusal, we provide detailed analysis of the rejection reasons and assist with reapplication. We also help identify areas of improvement and strengthen your application for better chances of approval."
  },
  {
    question: "What is your payment refund policy?",
    answer: "We offer a partial refund if your visa is refused due to errors on our part. However, visa fees paid to embassies are non-refundable. Our transparent pricing ensures no hidden charges throughout the process."
  },
  {
    question: "Do you provide support after visa approval?",
    answer: "Yes! We offer comprehensive pre-departure support including accommodation assistance, travel planning, forex guidance, and essential documentation help to ensure a smooth transition to your study destination."
  },
  {
    question: "How much financial proof do I need to show?",
    answer: "Financial requirements vary by country. For example, Canada requires CAD 10,000+ per year, USA requires proof of all expenses, Germany needs €11,208 in a blocked account, and UK requires tuition plus £1,334/month for 9 months."
  }
];

const FAQ = () => {
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
            {faqs.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default FAQ;
