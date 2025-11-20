import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, FileCheck, Plane, BookOpen, Users, HeadphonesIcon } from "lucide-react";
import { CalendarDays, CalendarPlus, Clock } from "lucide-react";

import { motion } from "framer-motion";

const services = [
  {
    icon: GraduationCap,
    title: "Student Visa Application Support",
    description: "Personalized assistance from start to finish, ensuring smooth progress from application to approval.",
  },
  {
    icon: CalendarDays, CalendarPlus, Clock,
    title: "Visa Slot Booking",
    description: " Your file submission appointment will be booked at the appropriate VFS center.",
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    description: "Complete review of SOP, financial documents, and admission requirements",
  },
  {
    icon: Plane,
    title: "Pre-Departure Support",
    description: "Accommodation assistance, travel planning, and essential documentation guidance",
  },
  
  {
    icon: Users,
    title: "Visa Interview",
    description: " Easy mock interviews and simple guidance to help you feel confident for your visa interview.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "We’re here anytime to help with your questions and concerns.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            What We <span className="text-primary">Offer</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive visa application support services designed for international students
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
