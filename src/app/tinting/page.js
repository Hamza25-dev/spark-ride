import React from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import Link from 'next/link';
import bookingData from '@/data/bookingData.json';
import CarWindowTinting from '@/app/images/CarWindowTinting.jpg';
import TintedAutoGlass from '@/app/images/TintedAutoGlass.jpg';
import TintedAutoGlass2 from '@/app/images/TintedAutoGlass2.jpg';
import TintGlassWindow from '@/app/images/TintGlassWindow.jpeg';
import TintingFeatures from '@/app/images/TintingFeatures.jpg';

const TintingPage = () => {
  const benefits = [
    {
      title: "UV Protection",
      description: "Blocks up to 99% of harmful UV rays, protecting you and your vehicle's interior from sun damage.",
      icon: "☀️"
    },
    {
      title: "Heat Reduction",
      description: "Reduces interior temperature by up to 60%, keeping your car cooler and more comfortable.",
      icon: "🌡️"
    },
    {
      title: "Privacy & Security",
      description: "Enhances privacy while making it harder for thieves to see inside your vehicle.",
      icon: "🔒"
    },
    {
      title: "Glare Reduction",
      description: "Reduces glare from headlights and sunlight, improving driving safety and comfort.",
      icon: "👁️"
    }
  ];

  const packages = [
    {
      id: "centurion-tint",
      name: "Centurion Tint Package",
      price: "From $69/window",
      duration: "2-3 hours",
      features: [
        "Premium Centurion film",
        "UV protection",
        "Heat reduction",
        "5-year warranty",
        "Lifetime bubble warranty"
      ]
    },
    {
      id: "ceramic-centurion",
      name: "Ceramic Centurion Package",
      price: "From $89/window",
      duration: "3-4 hours",
      features: [
        "Ceramic Centurion film",
        "Enhanced UV protection",
        "Superior heat rejection",
        "7-year warranty",
        "Lifetime bubble warranty"
      ]
    },
    {
      id: "full-vehicle-tint",
      name: "Full Vehicle Tint",
      price: "Custom Quote",
      duration: "4-6 hours",
      features: [
        "All windows tinted",
        "Premium ceramic film",
        "Complete privacy package",
        "10-year warranty",
        "Professional installation"
      ]
    }
  ];

  const tintLevels = [
    { percentage: "5%", visibility: "Very Light", bestFor: "Maximum visibility, minimal tint" },
    { percentage: "20%", visibility: "Light", bestFor: "Balance of privacy and visibility" },
    { percentage: "35%", visibility: "Medium", bestFor: "Good privacy, heat reduction" },
    { percentage: "50%", visibility: "Dark", bestFor: "Maximum privacy, heat blocking" }
  ];

  return (
    <div className="min-h-screen bg-[var(--charcoal-bg)] text-[var(--white-color)]">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0">
          <Image
            src={CarWindowTinting}
            alt="Window Tinting Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-color)]">
            Window Tinting
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Professional window tinting services that provide privacy, protection, and style.
            Experience the perfect balance of comfort and sophistication.
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

      {/* What is Window Tinting */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-color)]">
                What is Window Tinting?
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Window tinting is the application of a thin film to your vehicle's windows that provides
                numerous benefits while maintaining visibility. Our professional installation ensures
                perfect adhesion and crystal-clear results.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Using premium ceramic films, we block harmful UV rays, reduce heat buildup, and provide
                enhanced privacy without compromising safety or legal requirements.
              </p>
              <div className="bg-[var(--dark-bg-2)] border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[var(--text-color)] mb-3">
                  Why Choose Professional Tinting?
                </h3>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Perfect, bubble-free installation</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Premium ceramic films for durability</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Legal compliance in all states</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-[var(--text-color)] mr-3">•</span>
                    <span>Lifetime warranty on installation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <Image
                src={TintGlassWindow}
                alt="Professional Window Tinting Application"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tint Levels */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Choose Your Tint Level
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tintLevels.map((level, index) => (
              <Card key={index} className="bg-[var(--dark-bg-2)] border border-gray-700 hover:border-[var(--text-color)] transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[var(--text-color)] mb-2">
                    {level.percentage}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                    {level.visibility}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {level.bestFor}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-6 bg-[var(--dark-bg-1)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Benefits of Window Tinting
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
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Window Tinting Packages
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

                  <Link href={`/bookingform?mainService=window-tinting&package=${pkg.id}`}>
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
      <section className="py-16 px-6 bg-[var(--dark-bg-1)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--text-color)]">
            Our Tinting Process
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
                      Consultation & Measurement
                    </h3>
                    <p className="text-gray-300">
                      Discuss your needs and precisely measure your windows for perfect fit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Surface Preparation
                    </h3>
                    <p className="text-gray-300">
                      Clean and prepare windows for optimal film adhesion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Professional Installation
                    </h3>
                    <p className="text-gray-300">
                      Expert application ensuring bubble-free, perfect results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[var(--text-color)] text-black rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--white-color)] mb-2">
                      Quality Inspection
                    </h3>
                    <p className="text-gray-300">
                      Final check and care instructions provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src={TintingFeatures}
                alt="Window Tinting Process"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]">
            Ready to Enhance Your Vehicle?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Don't wait for the sun to damage your interior. Protect your vehicle today with our professional window tinting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 px-8 py-3 text-lg">
              Book Window Tinting
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

export default TintingPage;
