import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const comparisons = [
  {
    feature: "Real-time Support",
    we: "Dedicated counselor assigned",
    others: "Automated responses only",
  },
  {
    feature: "Transparent Pricing",
    we: "No hidden charges",
    others: "Surprise fees later",
  },
  {
    feature: "Fast Processing",
    we: "Priority support & tracking",
    others: "Standard delays",
  },
  {
    feature: "Success Rate",
    we: "98% visa approval rate",
    others: "No guarantee provided",
  },
  {
    feature: "Document Review",
    we: "Multiple expert reviews",
    others: "Single automated check",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
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
            <div className="grid md:grid-cols-3 bg-primary text-primary-foreground p-4">
              <div className="font-heading font-semibold text-lg">Feature</div>
              <div className="font-heading font-semibold text-lg">We Offer</div>
              <div className="font-heading font-semibold text-lg">Others Provide</div>
            </div>

            {comparisons.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid md:grid-cols-3 gap-4 p-6 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <div className="font-body font-semibold text-foreground">
                  {item.feature}
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span className="font-body">{item.we}</span>
                </div>
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-5 w-5 flex-shrink-0" />
                  <span className="font-body text-muted-foreground">{item.others}</span>
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
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: "10K+", label: "Happy Students" },
            { value: "15+", label: "Countries" },
            { value: "98%", label: "Success Rate" },
            { value: "5+", label: "Years Experience" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-card p-6 rounded-xl shadow-lg min-w-[150px]"
            >
              <div className="font-heading font-bold text-4xl text-accent mb-2">{stat.value}</div>
              <div className="font-body text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
