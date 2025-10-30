"use client";

import React from "react";
import { Car, ShieldCheck, Wrench, Star } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Car className="w-10 h-10 text-[var(--text-color)] mb-3" />,
      title: "Mobile Service",
      desc: "We come to your location for hassle-free detailing.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-[var(--text-color)] mb-3" />,
      title: "Certified Experts",
      desc: "Trained professionals delivering perfection every time.",
    },
    {
      icon: <Wrench className="w-10 h-10 text-[var(--text-color)] mb-3" />,
      title: "Premium Products",
      desc: "We use only trusted brands for long-lasting protection.",
    },
    {
      icon: <Star className="w-10 h-10 text-[var(--text-color)] mb-3" />,
      title: "5-Star Quality",
      desc: "Our results speak for themselves — excellence guaranteed.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--dark-bg-1)] text-[var(--white-color)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[var(--text-color)] mb-12">
          Why Choose Spark Ride?
        </h2>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--dark-bg-2)] p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all text-center"
            >
              {item.icon}
              <h4 className="font-semibold text-lg text-[var(--text-color)] mb-2">
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
