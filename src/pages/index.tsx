import Head from "next/head";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CompaniesSection } from "@/components/home/CompaniesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Head>
        <title>CareerCoach | Expert Career Counseling & Strategy</title>
        <meta name="description" content="Unlock your full potential with personalized coaching, expert CV reviews, and targeted interview preparation." />
      </Head>
      
      <HeroSection />
      <CompaniesSection />
      <AboutPreview />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
