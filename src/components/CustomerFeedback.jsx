"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";

// ✅ Local images
import User1 from "@/../public/User1.jpeg";
import User2 from "@/../public/User2.jpeg";
import User3 from "@/../public/User3.jpeg";
import User4 from "@/../public/User4.jpeg";
import User5 from "@/../public/User5.jpeg";
import User6 from "@/../public/User6.jpeg";
import User7 from "@/../public/User7.jpeg";
import User8 from "@/../public/User8.jpeg";

// ✅ Feedback data
const feedbacks = [
  {
    name: "Ahmed Khan",
    service: "Ceramic Coating",
    feedback: "My car looks brand new! The shine is incredible and lasting.",
    avatar: User1,
    rating: 5,
  },
  {
    name: "Sara Malik",
    service: "Window Tint",
    feedback: "Excellent service! The tinting keeps my car cool and stylish.",
    avatar: User5,
    rating: 5,
  },
  {
    name: "Ali Raza",
    service: "Wax & Polish",
    feedback: "They did an amazing job. The polish really brings out the color.",
    avatar: User2,
    rating: 5,
  },
  {
    name: "Hina Shah",
    service: "Detailing",
    feedback:
      "Superb attention to detail. Highly recommended for premium car care!",
    avatar: User6,
    rating: 5,
  },
  {
    name: "Usman Tariq",
    service: "Full Detailing",
    feedback:
      "Hands down the best detailing service I've ever used. Worth every penny!",
    avatar: User3,
    rating: 5,
  },
  {
    name: "Nimra Fatima",
    service: "Interior Cleaning",
    feedback:
      "The interior feels brand new again. Fresh, spotless and comfortable!",
    avatar: User7,
    rating: 5,
  },
  {
    name: "Kamran Ali",
    service: "Engine Bay Cleaning",
    feedback:
      "They made my engine bay look showroom ready. Very professional service.",
    avatar: User4,
    rating: 5,
  },
  {
    name: "Mehwish Javed",
    service: "Paint Protection",
    feedback:
      "The paint protection really works. My car looks glossy even after weeks!",
    avatar: User8,
    rating: 5,
  },
];

export function CustomerFeedback() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center charcoal-bg py-16 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--dark-bg-1)] via-[var(--charcoal-bg)] to-[var(--dark-bg-2)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_var(--text-color)_0%,_transparent_60%)] opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,_var(--primary)_0%,_transparent_60%)] opacity-5"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-[var(--text-color)] mb-6 leading-tight animate-pulse">
            Customer Testimonials
          </h2>
          <p className="text-xl md:text-2xl text-[var(--white-color)] max-w-4xl mx-auto leading-relaxed">
            Hear what our satisfied customers have to say about our premium car care services.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            orientation="horizontal"
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {feedbacks.map((user, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="group relative bg-[var(--dark-bg-2)] border border-[var(--dark-bg-3)] rounded-3xl shadow-2xl hover:shadow-[0_0_40px_var(--text-color)]/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-20">
                        <Quote className="w-8 h-8 text-[var(--text-color)]" />
                      </div>

                      <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-\[var\(--text-color\)\] to-\[var\(--text-color\)\] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            className="relative rounded-full object-cover border-2 border-[var(--text-color)]"
                            width={80}
                            height={80}
                          />
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1">
                          {[...Array(user.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[var(--text-color)] text-[var(--text-color)]" />
                          ))}
                        </div>

                        {/* Name and Service */}
                        <div>
                          <h3 className="text-xl font-bold text-[var(--text-color)] mb-1">
                            {user.name}
                          </h3>
                          <p className="text-sm text-[var(--white-color)] font-medium">
                            {user.service}
                          </p>
                        </div>

                        {/* Feedback */}
                        <p className="text-[var(--white-color)] text-sm leading-relaxed italic">
                          "{user.feedback}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[var(--dark-bg-2)] border-[var(--dark-bg-3)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--charcoal-bg)] transition-all duration-300" />
            <CarouselNext className="bg-[var(--dark-bg-2)] border-[var(--dark-bg-3)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-[var(--charcoal-bg)] transition-all duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
