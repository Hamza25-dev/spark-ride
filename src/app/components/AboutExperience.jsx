"use client";

import Image from "next/image";
import { Car, ShieldCheck, Wrench, Star, Award, Users, Clock } from "lucide-react";
import ImagesCarWash from "@/app/images/ImagesCarWash.jpeg";

export default function AboutExperience() {
  const features = [
    {
      id: 1,
      icon: <Car className="w-8 h-8 text-[var(--text-color)]" />,
      title: "On-Demand Detailing",
      description: "Luxury car care at your doorstep, anytime.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 text-[var(--text-color)]" />,
      title: "Certified Experts",
      description: "Industry-trained professionals you can trust.",
    },
    {
      id: 3,
      icon: <Wrench className="w-8 h-8 text-[var(--text-color)]" />,
      title: "Premium Products",
      description: "Top-grade materials for lasting protection.",
    },
    {
      id: 4,
      icon: <Star className="w-8 h-8 text-[var(--text-color)]" />,
      title: "Satisfaction Guaranteed",
      description: "Perfection in every detail we deliver.",
    },
    {
      id: 5,
      icon: <Award className="w-8 h-8 text-[var(--text-color)]" />,
      title: "Award-Winning Service",
      description: "Recognized for excellence in auto care.",
    },
    {
      id: 6,
      icon: <Users className="w-8 h-8 text-[var(--text-color)]" />,
      title: "Customer Focused",
      description: "Your satisfaction is our top priority.",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center charcoal-bg py-16 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg-1)] via-[var(--charcoal-bg)] to-[var(--dark-bg-2)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--text-color)_0%,_transparent_50%)] opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_var(--primary)_0%,_transparent_50%)] opacity-5"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-extrabold text-[var(--text-color)] mb-6 leading-tight animate-pulse">
            Passion-Driven Excellence
          </h2>
          <p className="text-xl md:text-2xl text-[var(--white-color)] max-w-4xl mx-auto leading-relaxed">
            Transforming vehicles into masterpieces with years of expertise in ceramic coatings, detailing, and premium care. Every service is a testament to our commitment to perfection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group bg-[var(--dark-bg-2)] border border-[var(--dark-bg-3)] rounded-2xl p-6 hover:bg-[var(--dark-bg-3)] hover:border-[var(--text-color)]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--text-color)]/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-full bg-[var(--dark-bg-3)] group-hover:bg-[var(--text-color)]/10 transition duration-500 group-hover:rotate-12">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-[var(--text-color)] group-hover:text-[var(--text-color)] transition duration-300">
                  {feature.title}
                </h4>
                <p className="text-[var(--white-color)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image and Quote Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="relative group flex-1">
            <div className="absolute -inset-6 bg-gradient-to-r from-[var(--text-color)]/30 to-[var(--primary)]/30 blur-3xl rounded-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--dark-bg-3)]">
              <Image
                src={ImagesCarWash}
                alt="Luxury Car Detailing Showcase"
                className="w-full h-[400px] object-cover rounded-3xl transform group-hover:scale-110 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-bg)]/80 via-transparent to-transparent rounded-3xl"></div>
            </div>
          </div>

          <div className="flex-1 text-left lg:text-right">
            <blockquote className="text-2xl md:text-3xl text-[var(--white-color)] italic font-light mb-6 border-l-4 lg:border-l-0 lg:border-r-4 border-[var(--text-color)] pl-6 lg:pl-0 lg:pr-6">
              “We redefine automotive beauty, one vehicle at a time.”
            </blockquote>
            <div className="flex items-center justify-start lg:justify-end gap-4">
              <Clock className="w-6 h-6 text-[var(--text-color)]" />
              <span className="text-[var(--white-color)]">Years of Experience: 10+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
