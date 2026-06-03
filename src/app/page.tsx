import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Templates from "@/components/Templates";
import WhyZorviq from "@/components/WhyZorviq";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Animated loader (matches final.html exactly) */}
      <Loader />

      {/* Main site content */}
      <div id="main-content">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Templates />
          <WhyZorviq />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
