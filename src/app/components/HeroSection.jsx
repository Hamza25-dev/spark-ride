"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import SedanCarDetailing from "@/app/images/SedanCarDetailing.jpeg";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden text-[var(--foreground)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={SedanCarDetailing}
          alt="Car Wash"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Subtle overlay for readability */}
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-6">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg mb-6"
        >
          <span className="text-[var(--white-color)]">Sparkle Your Ride with</span>{" "}
          <span className="text-[var(--text-color)]">Perfection</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-[var(--muted-foreground)] max-w-4xl leading-relaxed"
        >
          Transform your vehicle into a showroom masterpiece with our comprehensive car wash, detailing, and ceramic coating services.
          Experience the ultimate in automotive care with eco-friendly products and certified professionals.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link href="/bookingform">
          <Button size="lg" className="bg-[var(--text-color)] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--text-color)]">
            Book Now
          </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-full transition-all duration-300 hover:scale-105 text-[var(--charcoal-bg)]">
            View Our Services
          </Button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-[var(--text-color)]/20 rounded-full blur-xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-[var(--primary)]/20 rounded-full blur-xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      ></motion.div>
    </section>
  );
}
