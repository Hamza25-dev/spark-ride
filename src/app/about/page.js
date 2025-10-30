"use client";

import Image from "next/image";
import { ShieldCheck, Car, Wrench, Star } from "lucide-react";
import AboutStory from "@/components/AboutStory";
import MissionVision from "@/components/MissionVision";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      {/* 🔹 About Story Section */}
      <AboutStory />

      {/* 🔹 Mission & Vision Section */}
      <MissionVision />

      {/* 🔹 Why Choose Us Section */}
      <WhyChooseUs />
    </div>
  );
}
