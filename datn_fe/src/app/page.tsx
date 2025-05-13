import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/ContactSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import MembershipsSection from "@/components/sections/MembershipsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrainersSection from "@/components/sections/TrainersSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <MembershipsSection />
      <TrainersSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
