import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mainServices } from "@/data/booking-service";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--charcoal-bg)] text-[var(--white-color)]">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--text-color)]">
          Our Services
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Professional car detailing services with premium quality and
          eco-friendly products. Choose from our comprehensive range of
          detailing packages.
        </p>
      </section>

      {/* Services Sections */}
      {mainServices.map((service) => (
        <section key={service.id} className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-[var(--text-color)]">
                {service.name}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {service.description}
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className="bg-[var(--dark-bg-2)] border border-gray-700 hover:border-[var(--text-color)] transition-all duration-300 hover:scale-105 h-full"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-[var(--white-color)]">
                        {pkg.name}
                      </h3>
                      <span className="text-[var(--text-color)] font-bold text-2xl">
                        ${pkg.price}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{pkg.description}</p>

                    <ul className="text-sm text-gray-400 space-y-2 mb-6">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[var(--text-color)] mr-2 mt-1">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      <Button className="w-full bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="py-16 px-6 bg-[var(--dark-bg-1)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us today to schedule your detailing service and experience
            the Spark Ride difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--text-color)] text-black hover:bg-[var(--text-color)]/80 px-8 py-3">
              Book Appointment
            </Button>
            <Button
              variant="outline"
              className="border-[var(--text-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-black px-8 py-3"
            >
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
