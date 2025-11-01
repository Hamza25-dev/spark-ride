import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import Link from 'next/link';
import { mainServices } from '@/data/booking-service';
import CarDetailing from '@/app/images/CarDetailing.jpg';
import SedanDetailingWash from '@/app/images/SedanDetailingWash.jpeg';
import SUVDetailing from '@/app/images/SUVDetailing.jpeg';


const FullDetailingPage = () => {
  const benefits = [
    {
      title: "Complete Restoration",
      description: "From paint correction to interior deep cleaning, we restore your vehicle to showroom condition.",
      icon: "🔄"
    },
    {
      title: "Protection & Shine",
      description: "Apply protective coatings and sealants for long-lasting shine and protection.",
      icon: "✨"
    },
    {
      title: "Interior & Exterior",
      description: "Comprehensive cleaning and detailing for both interior and exterior surfaces.",
      icon: "🧼"
    },
    {
      title: "Expert Techniques",
      description: "Professional detailing using industry-leading products and techniques.",
      icon: "🛠️"
    }
  ];

  const fullDetailingService = mainServices.find(service => service.id === 'full-detailing');
  const packages = fullDetailingService ? fullDetailingService.packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    price: `$${pkg.price}`,
    duration: pkg.id.includes('basic') ? "3-4 hours" : "4-5 hours",
    features: pkg.includes
  })) : [];

  return (
    <div className="min-h-screen bg-[var(--charcoal-bg)] text-[var(--white-color)]">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0">
          <Image
            src={CarDetailing}
            alt="Full Detailing Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-color)]">
            Full Detailing
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Transform your vehicle with our comprehensive full detailing services.
            Experience unmatched care and restoration that brings back the showroom shine.
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

      {/* What is Full Detailing */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-color)]">
                What is Full Detailing?
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Full detailing is a comprehensive service that restores and protects your vehicle from top to bottom.
                Our expert technicians use professional-grade products and techniques to bring your car back to its original glory.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                From exterior paint correction and ceramic coating to deep interior cleaning and protection,
                we ensure every inch of your vehicle receives the attention it deserves.
              </p>
              <div className="bg-[var(--dark-bg-2)] border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">
                  Key Benefits
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Restores showroom condition</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Protects against environmental damage</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Increases resale value</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Long-lasting shine and protection</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <Image
                src={SedanDetailingWash}
                alt="Professional Full Detailing"
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
            Why Choose Full Detailing?
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
            Full Detailing Packages
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

                  <Link href={`/bookingform?mainService=full-detailing&package=${pkg.id}`}>
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
            Our Full Detailing Process
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
                      Initial Assessment
                    </h3>
                    <p className="text-gray-300">
                      Thorough inspection of your vehicle to plan the detailing process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Exterior Detailing
                    </h3>
                    <p className="text-gray-300">
                      Wash, clay bar, paint correction, and protective coatings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Interior Detailing
                    </h3>
                    <p className="text-gray-300">
                      Deep cleaning of all interior surfaces and materials.
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
                      Quality check and delivery with maintenance recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={SUVDetailing}
                alt="Full Detailing Process"
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
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Experience the ultimate in vehicle care with our professional full detailing services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 px-8 py-3 text-lg">
              Book Full Detailing
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

export default FullDetailingPage;
