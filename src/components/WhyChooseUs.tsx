import { Check } from "lucide-react";
import { motion } from "framer-motion";

const comparisons = [
  {
    feature: "Real-time Support",
    we: "A dedicated counselor who stays connected with you throughout your journey. ",
  },
  {
    feature: "Transparent Pricing",
    we: "Clear, upfront pricing with absolutely no hidden charges. ",
  },
  {
    feature: "Fast Processing",
    we: " Priority handling, quick turnaround, and real-time tracking of your application. ",
  },
  {
    feature: "Success Rate",
    we: " A strong 98% visa approval rate backed by expert guidance and consistent support. ",
  },
  {
    feature: "Document Review",
    we: "Thorough multi-level document checks by experienced professionals to ensure accuracy and completeness.",
    
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we stand out from the competition with superior service and results
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border">
            <div className="grid grid-cols-1 md:grid-cols-2 bg-primary text-primary-foreground p-4 sm:p-6 rounded-t-2xl">
              <div className="font-heading font-bold text-lg sm:text-xl text-center flex items-center justify-center">Feature</div>
              <div className="font-heading font-bold text-lg sm:text-xl text-center flex items-center justify-center">We Offer</div>
            </div>

            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <div className="font-body font-semibold text-foreground text-center flex items-center justify-center">
                  {item.feature}
                </div>
                <div className="flex items-start gap-3 text-primary">
                  <Check className="h-6 w-6 mt-1 flex-shrink-0" />
                  <span className="font-body text-left leading-relaxed">{item.we}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12"
        >
          {[
            { value: "500+", label: "Happy Students" },
            { value: "15+", label: "Countries" },
            { value: "99%", label: "Success Rate" },
            { value: "5+", label: "Years Experience" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-card p-4 sm:p-6 rounded-xl shadow-lg min-w-[120px] sm:min-w-[150px]"
            >
              <div className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-accent mb-2">{stat.value}</div>
              <div className="font-body text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
