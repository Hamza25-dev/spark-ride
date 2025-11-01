"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PexelsMikebirdy from "@/app/images/PexelsMikebirdy.jpg";
import LightGreen from "@/app/images/LightGreen.jpg";
import Audi from "@/app/images/Audi.jpg";

export default function ServiceSection() {
  const services = [
    {
      id: 1,
      title: "Ceramic Coating",
      description:
        "Protect your car's paint with advanced ceramic coating that enhances gloss, durability, and weather resistance. Our professional application ensures long-lasting protection against scratches, UV rays, and environmental contaminants.",
      image: PexelsMikebirdy,
      features: ["Hydrophobic properties", "UV protection", "Scratch resistance", "Long-lasting shine"],
    },
    {
      id: 2,
      title: "Full Detailing",
      description:
        "Experience the ultimate transformation with our comprehensive full detailing service. From exterior paint correction and ceramic coating to deep interior cleaning and protection, we restore your vehicle to showroom condition. Every surface, every detail, every inch gets our expert attention.",
      image: LightGreen,
      features: ["Interior & exterior detailing", "Paint correction included", "Ceramic coating application", "Complete vehicle restoration"],
    },
    {
      id: 3,
      title: "Tinting Package",
      description:
        "Stylish, UV-protective window tints to keep your car cool and elegant under all conditions. Our professional tinting service provides privacy, heat reduction, and protection from harmful UV rays.",
      image: Audi,
      features: ["99% UV protection", "Heat reduction", "Privacy enhancement", "Fade prevention"],
    },
  ];

  return (
    <section className="bg-[var(--dark-bg-2)] text-[var(--white-color)] py-24 px-6 md:px-12">
      {/* Heading */}
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-[var(--text-color)] mb-6"
        >
          Our Premium Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[var(--muted-foreground)] mt-4 max-w-3xl mx-auto leading-relaxed text-lg"
        >
          Drive with confidence — our expert detailing, protection, and tinting
          solutions redefine automotive care and perfection.
        </motion.p>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto space-y-24">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-1 relative h-96 w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 lg:w-1/2 text-center lg:text-left">
              <motion.h3
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-6"
              >
                {service.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[var(--muted-foreground)] mb-8 leading-relaxed text-lg"
              >
                {service.description}
              </motion.p>

              {/* Features */}
              <motion.ul
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8 space-y-2"
              >
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center lg:justify-start text-[var(--muted-foreground)]">
                    <span className="text-[var(--text-color)] mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href={
                    service.id === 1 ? "/cermaiccoating" :
                    service.id === 2 ? "/fulldetailing" :
                    service.id === 3 ? "/tinting" :
                    "/services"
                  }
                  className="inline-block bg-[var(--text-color)] text-[var(--dark-black)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--text-color)]/90 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  See More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
