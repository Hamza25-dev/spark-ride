"use client";

import React from "react";

export default function ExperienceStats() {
  const stats = [
    { value: "10+", label: "Years of Experience" },
    { value: "2.5K+", label: "Cars Detailed" },
    { value: "50+", label: "Corporate Clients" },
    { value: "100%", label: "Customer Satisfaction" },
  ];

  return (
    <section className="py-20 bg-[var(--charcoal-bg)] text-[var(--white-color)] text-center">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--dark-bg-1)] hover:bg-[var(--dark-bg-2)] transition-all duration-300 rounded-2xl shadow-lg border border-gray-700 hover:border-[var(--text-color)] p-8 flex flex-col items-center justify-center"
          >
            <h3 className="text-5xl font-extrabold text-[var(--text-color)] drop-shadow-md">
              {stat.value}
            </h3>
            <p className="text-gray-300 mt-3 text-lg font-medium tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
