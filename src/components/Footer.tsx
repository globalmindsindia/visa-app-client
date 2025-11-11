import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Linkedin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gmiLogo from "@/assets/gmi_logo.png";
import indiaFlag from "@/assets/india-flag.png";
import germanyFlag from "@/assets/German-Flag.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="contact" 
      className="bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={gmiLogo} alt="Global Minds India" className="h-16 w-auto" />
            </div>
            <p className="font-body text-sm text-primary-foreground/80">
              Your trusted partner for seamless visa application and study abroad support.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><button onClick={handleHomeClick} className="hover:text-accent transition-colors">Home</button></li>
              <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="#countries" className="hover:text-accent transition-colors">Countries</a></li>
              <li><a href="#why-us" className="hover:text-accent transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-accent transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 font-body text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:connect@globalmindsindia.com" className="hover:text-accent transition-colors">
                  connect@globalmindsindia.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+917353446655" className="hover:text-accent transition-colors">
                  +91 7353446655
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="flex items-center gap-2">
                  <img src={indiaFlag} alt="India" className="h-4 w-6 object-cover rounded" />
                  23, CJ VenkataDas road, Padmanabhanagar, Bangalore
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="flex items-center gap-2">
                  <img src={germanyFlag} alt="Germany" className="h-4 w-6 object-cover rounded" />
                  Overseas Office - Germany: Koenigsheideweg Berlin, Germany
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+4917645728219" className="hover:text-accent transition-colors">
                  +49 17645728219
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-sm text-primary-foreground/80">
              © 2024 <a href="https://globalmindsinidia.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors hover:underline">Global Minds India</a>. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Global-Minds-India/61573595922348/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@GlobalMindsIndia-1" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/globalminds_india/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/global-minds-india/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
