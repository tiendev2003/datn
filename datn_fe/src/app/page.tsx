'use client';
import About from "@/components/About";
import BackToTop from "@/components/BackToTop";
import ClientScrollProgressBar from "@/components/ClientScrollProgressBar";
import Contact from "@/components/Contact";
import Facilities from "@/components/Facilities";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import SpecialOffer from "@/components/SpecialOffer";
import Testimonials from "@/components/Testimonials";
import Trainers from "@/components/Trainers";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ClientScrollProgressBar />
      <Header />
      <FloatingWhatsApp />
      <BackToTop />
      <main className="pt-16">
        <Hero />
        <About />
        <Packages />
        <Trainers />
        <Facilities />
        <Testimonials />
        <SpecialOffer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
