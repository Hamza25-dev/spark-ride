"use client";

import React from "react";

export default function MissionVision() {
  return (
    <section className="py-20 bg-[var(--dark-bg-1)] text-[var(--white-color)]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
          Our Mission & Vision
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-12">
          We aim to bring innovation and excellence to every car we touch — ensuring protection, shine, and satisfaction that lasts.
        </p>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {/* Mission Card */}
          <div className="bg-[var(--dark-bg-2)] rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <h3 className="text-2xl font-semibold text-[var(--text-color)] mb-3">
              Mission
            </h3>
            <p className="text-gray-400">
              To deliver high-end detailing experiences using advanced technology and premium products that keep cars looking flawless.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[var(--dark-bg-2)] rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <h3 className="text-2xl font-semibold text-[var(--text-color)] mb-3">
              Vision
            </h3>
            <p className="text-gray-400">
              To become Pakistan’s #1 trusted brand for luxury car detailing, coating, and tinting services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
