import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Countries from "@/components/Countries";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-body">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Countries />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
