import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import bookingData from '@/data/bookingData.json';
import CeramicCoating from '@/app/images/CeramicCoating.jpg';
import CeramicCoatingAfter from '@/app/images/CeramicCoatingAfter.png';
import CeramicCoatingBefore from '@/app/images/CeramicCoatingBefore.png';
import CeramicCoatingCar from '@/app/images/CeramicCoatingCar.jpg';
import NanoCeramicCoating from '@/app/images/NanoCeramicCoating.jpeg';
import ProfessionalCeramicCoating from '@/app/images/ProfessionalCeramicCoating.jpg';

const CeramicCoatingPage = () => {
  const benefits = [
    {
      title: "Superior Protection",
      description: "Advanced ceramic coating provides long-lasting protection against UV rays, chemicals, and environmental contaminants.",
      icon: "🛡️"
    },
    {
      title: "Enhanced Gloss",
      description: "Achieve a deep, wet-look shine that makes your vehicle stand out and look brand new.",
      icon: "✨"
    },
    {
      title: "Hydrophobic Effect",
      description: "Water and dirt bead up and roll off easily, making maintenance much simpler.",
      icon: "💧"
    },
    {
      title: "Scratch Resistance",
      description: "Increased hardness helps protect against minor scratches and swirl marks.",
      icon: "🔒"
    }
  ];

  const packages = [
    {
      id: "basic-coating",
      name: "Ceramic Coating (1 Year)",
      price: `$${bookingData.extraServices.ceramiccoating.oneYear.price}`,
      duration: "2-3 hours",
      features: [
        "Single layer ceramic coating",
        "Surface preparation",
        "1 year warranty",
        "Basic maintenance guide"
      ]
    },
    {
      id: "premium-coating",
      name: "Ceramic Coating (5 Years)",
      price: `$${bookingData.extraServices.ceramiccoating.fiveYear.price}`,
      duration: "4-5 hours",
      features: [
        "Multi-layer ceramic coating",
        "Professional surface prep",
        "5 year warranty",
        "Maintenance kit included",
        "Interior ceramic protection"
      ]
    },
    {
      id: "signature-coating",
      name: "Ceramic Coating (10 Years)",
      price: `$${bookingData.extraServices.ceramiccoating.tenYear.price}`,
      duration: "6-8 hours",
      features: [
        "Professional grade ceramic coating",
        "Complete paint correction",
        "10 year warranty",
        "Full maintenance package",
        "Interior & exterior protection",
        "Paint protection film option"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--charcoal-bg)] text-[var(--white-color)]">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0">
          <Image
            src={CeramicCoating}
            alt="Ceramic Coating Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-color)]">
            Ceramic Coating
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transform your vehicle's appearance with our professional ceramic coating services.
            Experience unmatched protection and shine that lasts for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 px-8 py-3 text-lg">
              Book Now
            </Button>
            <Button variant="outline" className="border-[var(--text-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-black px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* What is Ceramic Coating */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-color)]">
                What is Ceramic Coating?
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Ceramic coating is a liquid polymer that is applied to the exterior of your vehicle.
                Once cured, it forms a chemical bond with the paint, creating a protective layer that
                is much harder than traditional wax or sealant.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                This advanced protection technology provides superior defense against UV rays, bird droppings,
                tree sap, road salt, and other environmental contaminants that can damage your vehicle's paint.
              </p>
              <div className="bg-[var(--dark-bg-2)] border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">
                  Key Benefits
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Lasts 2-5 years (vs 3-6 months for wax)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>9H hardness rating for scratch resistance</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Reduces washing frequency by 50%</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Enhances color depth and gloss</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <Image
                src={ProfessionalCeramicCoating}
                alt="Professional Ceramic Coating Application"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      
      {/* Benefits Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Why Choose Ceramic Coating?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-[var(--dark-bg-2)] border border-gray-700 hover:border-[var(--text-color)] transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-[var(--white-color)] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6 bg-[var(--dark-bg-1)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Ceramic Coating Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="bg-[var(--dark-bg-2)] border border-gray-700 hover:border-[var(--text-color)] transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[var(--white-color)] mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-[var(--text-color)] font-bold text-3xl mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-gray-400 text-sm">
                      Duration: {pkg.duration}
                    </p>
                  </div>

                  <ul className="text-gray-300 space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[var(--text-color)] mr-3 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/bookingform?mainService=ceramic-coating&package=${pkg.id}`}>
                    <Button className="w-full bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 mt-auto">
                      Choose Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Our Ceramic Coating Process
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Surface Preparation
                    </h3>
                    <p className="text-gray-300">
                      Thorough cleaning, clay bar treatment, and paint correction to ensure optimal bonding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Application
                    </h3>
                    <p className="text-gray-300">
                      Professional application of ceramic coating in a controlled environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Curing Process
                    </h3>
                    <p className="text-gray-300">
                      24-48 hour curing period for maximum hardness and protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Final Inspection
                    </h3>
                    <p className="text-gray-300">
                      Quality check and maintenance instructions provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={NanoCeramicCoating}
                alt="Ceramic Coating Process"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-[var(--dark-bg-1)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]">
            Ready to Protect Your Investment?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Don't wait for damage to occur. Protect your vehicle's paint today with our professional ceramic coating services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 px-8 py-3 text-lg">
              Book Ceramic Coating
            </Button>
            <Button
              variant="outline"
              className="border-[var(--text-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-black px-8 py-3 text-lg"
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CeramicCoatingPage;
