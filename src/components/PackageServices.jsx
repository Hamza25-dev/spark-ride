"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Sparkles, Check } from "lucide-react";
import WindowTinting from "@/app/images/WindowTinting.jpg";
import ProfessionalCeramicCoating from "@/app/images/ProfessionalCeramicCoating.jpg";
import CarDetailing from "@/app/images/CarDetailing.jpg";

export default function PackageServices() {
  const packages = [
    {
      id: 1,
      title: "Luxury Car Detailing",
      price: "From $129",
      description: "Transform your ride with deep interior cleaning and a mirror-gloss exterior finish — right at your doorstep.",
      features: [
        "Full Interior Shampoo & Vacuum",
        "Engine Bay & Wheel Deep Clean",
        "Hand Wax & Paint Protection",
        "Door Jamb & Trim Restoration",
      ],
      image: CarDetailing,
      icon: <Star className="w-8 h-8 text-[var(--text-color)]" />,
      badge: "Most Popular",
      badgeColor: "bg-[var(--text-color)]",
    },
    {
      id: 2,
      title: "Premium Window Tinting",
      price: "From $249",
      description: "Stay cool and stylish with our high-performance tint films that offer UV defense and privacy protection.",
      features: [
        "99% UV & Heat Blockage",
        "Enhanced Night Visibility",
        "Scratch-Resistant Nano Film",
        "Factory Finish Guarantee",
      ],
      image: WindowTinting,
      icon: <Shield className="w-8 h-8 text-[var(--text-color)]" />,
      badge: "Best Seller",
      badgeColor: "bg-[var(--text-color)]",
    },
    {
      id: 3,
      title: "Elite Ceramic Coating",
      price: "From $699",
      description: "Shield your vehicle with advanced 9H ceramic technology that locks in a glossy, hydrophobic shine for years.",
      features: [
        "Long-Lasting 5-Year Protection",
        "Water & Dirt Repellent Coating",
        "UV Fade Resistance",
        "Gloss Enhancement Finish",
      ],
      image: ProfessionalCeramicCoating,
      icon: <Sparkles className="w-8 h-8 text-[var(--text-color)]" />,
      badge: "Premium",
      badgeColor: "bg-[var(--text-color)]",
    },
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center charcoal-bg py-16 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg-1)] via-[var(--charcoal-bg)] to-[var(--dark-bg-2)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,_var(--text-color)_0%,_transparent_70%)] opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,_var(--primary)_0%,_transparent_70%)] opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-[var(--text-color)] mb-6 leading-tight animate-pulse">
            Premium Packages
          </h2>
          <p className="text-xl md:text-2xl text-[var(--white-color)] max-w-4xl mx-auto leading-relaxed">
            Choose the perfect package to give your car the luxury care it deserves — with our expert team and professional-grade products.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group relative bg-[var(--dark-bg-2)] border border-[var(--dark-bg-3)] rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_50px_var(--text-color)]/20 transition-all duration-700 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Badge */}
              <div className={`absolute top-4 right-4 z-20 ${pkg.badgeColor} text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                {pkg.badge}
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-bg)]/90 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 z-10 p-3 rounded-full bg-[var(--dark-bg-2)]/80 backdrop-blur-sm border border-[var(--dark-bg-3)]">
                  {pkg.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-[var(--text-color)] ">
                    {pkg.title}
                  </h3>
                  <p className="text-[var(--white-color)] mb-6 leading-relaxed">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[var(--text-color)] rounded-full flex-shrink-0"></div>
                        <span className="text-[var(--white-color)] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[var(--primary)] font-extrabold text-2xl">
                    {pkg.price}
                  </span>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[var(--text-color)] text-[var(--charcoal-bg)] rounded-xl font-bold hover:bg-[var(--primary)] hover:text-black transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[var(--text-color)]/50"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
