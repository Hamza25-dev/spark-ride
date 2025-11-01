"use client";

import React from "react";
import Image from "next/image";
import CarWashingAdvertisment from "@/app/images/CarWashingAdvertisment.jpg";

export default function AboutStory() {
  return (
    <section className="py-20 bg-[var(--dark-bg-1)] text-[var(--white-color)]">
      <div className="max-w-6xl mt-20 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
            Our Journey to Perfection
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed text-lg">
            At <span className="text-[var(--text-color)] font-semibold">Spark Ride</span>, 
            we bring unmatched care and shine to every car. Our experts combine modern 
            techniques, premium products, and years of experience to make your vehicle look brand new.
          </p>
          <p className="text-gray-400 leading-relaxed text-lg">
            From ceramic coatings and paint protection to full detailing services, 
            Spark Ride ensures your car receives the best treatment for longevity, gloss, 
            and customer satisfaction.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={CarWashingAdvertisment}
            alt="Spark Ride Car Detailing"
            width={550}
            height={400}
            className="rounded-2xl shadow-2xl border-4 border-[var(--text-color)] object-cover"
          />
        </div>

      </div>
    </section>
  );
}
