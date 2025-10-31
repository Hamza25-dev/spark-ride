'use client';

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServiceSection from "../components/ServiceSection";
import AboutExperience from "@/components/AboutExperience";
import PackageServices from "@/components/PackageServices";
import {CustomerFeedback}  from "@/components/CustomerFeedback";
import ExperienceStats from "@/components/ExperienceStats";
import AboutStory from "@/components/AboutStory";
import MissionVision from "@/components/MissionVision";
import WhyChooseUs from "@/components/WhyChooseUs";
import BookingForm from "@/components/BookingForm";
import Cards from "@/components/Cards";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sample data for testing Cards component
  const sampleCardsData = [
    {
      title: "Ceramic Coating",
      description: "Protect your car's paint with our premium ceramic coating service.",
      image: "/images/ceramic-coating.jpg", // Placeholder image path
    },
    {
      title: "Window Tint",
      description: "Enhance privacy and reduce heat with professional window tinting.",
      image: "/images/window-tint.jpg",
    },
    {
      title: "Interior Detailing",
      description: "Deep clean and restore your car's interior to showroom condition.",
      image: "/images/interior-detailing.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <HeroSection />
        </section>
        <section id="services">
          <ServiceSection />
          <AboutExperience />
          <PackageServices />
          <CustomerFeedback />
          <ExperienceStats />
        </section>

        {/* Test Cards Component */}
        <section className="py-16 px-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Test Cards Component</h2>
            <Cards data={sampleCardsData} columns={3} />
          </div>
        </section>

        {/* About Page Sections */}
        <section id="about">
          <AboutStory />
          <MissionVision />
          <WhyChooseUs />
        </section>

        {/* Contact Page Section */}
        <section id="contact" className="min-h-screen mt-20 bg-[var(--charcoal-bg)] text-[var(--white-color)] py-20 px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-[var(--text-color)]">
              Contact <span className="text-[var(--text-color)]">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a question or want to book an appointment?
              We'd love to hear from you! Fill out the form below or reach us through our contact details.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="bg-[var(--dark-bg-2)] border border-gray-700 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-[var(--text-color)] mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-6">
                Our team is always ready to assist you with your car care needs. Whether you need detailing, ceramic coating, or window tinting, we're here to provide professional service with premium quality products.
              </p>

              <div className="space-y-4 mb-6">
                <p className="text-gray-300">
                  📍 <span className="font-medium text-[var(--white-color)]">Address:</span> Texas, USA
                </p>
                <p className="text-gray-300">
                  📞 <span className="font-medium text-[var(--white-color)]">Phone:</span> 817-210-3644
                </p>
                <p className="text-gray-300">
                  ✉️ <span className="font-medium text-[var(--white-color)]">Email:</span> hometownautodetailer@gmail.com
                </p>
              </div>

              <div className="border-t border-gray-600 pt-6 mt-6">
                <h3 className="text-lg font-semibold text-[var(--text-color)] mb-3">
                  Why Choose Spark Ride?
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[var(--text-color)] mr-2">•</span>
                    <span>Professional eco-friendly products</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--text-color)] mr-2">•</span>
                    <span>Mobile detailing services available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--text-color)] mr-2">•</span>
                    <span>Expert technicians with years of experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--text-color)] mr-2">•</span>
                    <span>Satisfaction guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <BookingForm />
          </div>
        </section>
      </main>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[var(--text-color)] text-black p-3 rounded-full shadow-lg hover:bg-[var(--text-color)]/80 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}


