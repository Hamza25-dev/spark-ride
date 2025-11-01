"use client";

import React, { useState, useEffect } from "react";
import {
  serviceTypes,
  timeSlots,
  promoCodes,
  mainServices,
} from "../../data/booking-service";
import { allCities } from "../../data/stateMapping";
import { format } from "date-fns";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Plus,
  Trash2,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Generate unique booking ID
const generateBookingId = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `HTD-${randomNum}`;
};

// Shuffle array utility
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Phone number formatting utility
const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");

  let formatted = cleaned;
  if (!formatted.startsWith("1") && formatted.length > 0) {
    formatted = "1" + formatted;
  }

  if (formatted.length > 1) {
    const countryCode = formatted.substring(0, 1);
    const areaCode = formatted.substring(1, 4);
    const firstPart = formatted.substring(4, 7);
    const secondPart = formatted.substring(7, 11);

    let result = `+${countryCode}`;
    if (areaCode) result += ` (${areaCode}`;
    if (firstPart) result += `) ${firstPart}`;
    if (secondPart) result += `-${secondPart}`;

    return result;
  }

  return formatted ? `+${formatted}` : "+1";
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: "", // ✅ Yeh line add ki hai
    vehicleBookings: [
      {
        id: "vehicle-1",
        serviceType: "",
        variant: "",
        mainService: "",
        package: "",
        additionalServices: [],
        vehicleType: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        vehicleColor: "",
        vehicleLength: "",
        packageConfirmed: false,
        randomizedPackages: [],
      },
    ],
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1 ",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    timeSlot: "",
    notes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [isManualState, setIsManualState] = useState(false);

  // Website name - Hardcoded as requested
  const WEBSITE_NAME = "Home Town Detailing";

  // Auto-detect state from city
  const autoDetectState = (city) => {
    if (!city) return "";
    const normalizedCity = city.toLowerCase().trim();
    return allCities[normalizedCity] || "";
  };

  // Handle phone number input with formatting
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+1")) {
      if (value.startsWith("1")) {
        value = "+" + value;
      } else {
        value = "+1 " + value.replace(/^\+?1?\s?/, "");
      }
    }

    const formatted = formatPhoneNumber(value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  // Remove whitespace from promo code and apply
  const applyPromoCode = () => {
    const cleanedPromoCode = promoCode.replace(/\s/g, "");

    if (!cleanedPromoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    const foundPromo = promoCodes.find(
      (promo) =>
        promo.code.toLowerCase() === cleanedPromoCode.trim().toLowerCase()
    );

    if (foundPromo) {
      setAppliedPromo(foundPromo);
      setPromoError("");
      setPromoCode(cleanedPromoCode);
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  // Update promo code input with whitespace removal
  const handlePromoCodeChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setPromoCode(value);
  };

  // Add new vehicle booking
  const addVehicleBooking = () => {
    const newVehicle = {
      id: `vehicle-${Date.now()}`,
      serviceType: "",
      variant: "",
      mainService: "",
      package: "",
      additionalServices: [],
      vehicleType: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      vehicleColor: "",
      vehicleLength: "",
      packageConfirmed: false,
    };
    setFormData((prev) => ({
      ...prev,
      vehicleBookings: [...prev.vehicleBookings, newVehicle],
    }));
  };

  // Remove vehicle booking
  const removeVehicleBooking = (vehicleId) => {
    if (formData.vehicleBookings.length <= 1) {
      toast.error("At least one vehicle is required");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      vehicleBookings: prev.vehicleBookings.filter((v) => v.id !== vehicleId),
    }));
  };

  // Update specific vehicle booking
  const updateVehicleBooking = (vehicleId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      vehicleBookings: prev.vehicleBookings.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, [field]: value } : vehicle
      ),
    }));
  };

  // Reset dependent fields when service type changes
  const handleServiceTypeChange = (vehicleId, serviceTypeId) => {
    updateVehicleBooking(vehicleId, "serviceType", serviceTypeId);
    updateVehicleBooking(vehicleId, "variant", "");
    updateVehicleBooking(vehicleId, "package", "");
    updateVehicleBooking(vehicleId, "additionalServices", []);
    updateVehicleBooking(vehicleId, "packageConfirmed", false);

    // Automatically set vehicleType based on service type
    const serviceType = serviceTypes.find((st) => st.id === serviceTypeId);
    if (serviceType) {
      updateVehicleBooking(vehicleId, "vehicleType", serviceType.name);
    } else {
      updateVehicleBooking(vehicleId, "vehicleType", "");
    }

    updateVehicleBooking(vehicleId, "vehicleMake", "");
    updateVehicleBooking(vehicleId, "vehicleModel", "");
    updateVehicleBooking(vehicleId, "vehicleYear", "");
    updateVehicleBooking(vehicleId, "vehicleColor", "");
    updateVehicleBooking(vehicleId, "vehicleLength", "");
  };

  // Reset dependent fields when variant changes
  const handleVariantChange = (vehicleId, variantId) => {
    updateVehicleBooking(vehicleId, "variant", variantId);
    updateVehicleBooking(vehicleId, "mainService", "");
    updateVehicleBooking(vehicleId, "package", "");
    updateVehicleBooking(vehicleId, "additionalServices", []);
    updateVehicleBooking(vehicleId, "packageConfirmed", false);

    // Automatically set vehicleType based on variant
    const vehicle = formData.vehicleBookings.find((v) => v.id === vehicleId);
    if (vehicle) {
      const serviceType = serviceTypes.find(
        (st) => st.id === vehicle.serviceType
      );
      if (serviceType?.variants) {
        const variant = serviceType.variants.find((v) => v.id === variantId);
        if (variant) {
          updateVehicleBooking(vehicleId, "vehicleType", variant.name);
        }
      }
    }
  };

  // Reset dependent fields when main service changes
  const handleMainServiceChange = (vehicleId, mainServiceId) => {
    updateVehicleBooking(vehicleId, "mainService", mainServiceId);
    updateVehicleBooking(vehicleId, "package", "");
    updateVehicleBooking(vehicleId, "additionalServices", []);
    updateVehicleBooking(vehicleId, "packageConfirmed", false);
  };

  // Confirm package for a vehicle in step 2
  const confirmPackage = (vehicleId) => {
    updateVehicleBooking(vehicleId, "packageConfirmed", true);
  };

  // Calculate total price for all vehicles
  const calculateTotalPrice = () => {
    let total = 0;

    formData.vehicleBookings.forEach((vehicle) => {
      // Find the service type
      const serviceType = serviceTypes.find(
        (st) => st.id === vehicle.serviceType
      );

      // Find main service
      const mainService = mainServices.find(
        (ms) => ms.id === vehicle.mainService
      );

      let pkg;

      if (mainService) {
        // Main Service Package
        pkg = mainService.packages.find((p) => p.id === vehicle.package);
      } else if (serviceType?.variants && vehicle.variant) {
        // Variant Package
        const variant = serviceType.variants.find(
          (v) => v.id === vehicle.variant
        );
        pkg = variant?.packages.find((p) => p.id === vehicle.package);
      } else {
        // Regular Service Package
        pkg = serviceType?.packages?.find((p) => p.id === vehicle.package);
      }

      // Add package price
      if (pkg) {
        let packagePrice =
          typeof pkg.price === "string" ? Number(pkg.price) || 0 : pkg.price;
        const pricingType = pkg.pricingType || "fixed";

        if (pricingType === "perFoot" && vehicle.vehicleLength) {
          packagePrice *= parseFloat(vehicle.vehicleLength);
        }
        total += packagePrice;
      }

      // Add additional services prices
      if (vehicle.additionalServices.length > 0) {
        let additionalServicesList = [];

        if (serviceType?.variants && vehicle.variant) {
          const variant = serviceType.variants.find(
            (v) => v.id === vehicle.variant
          );
          additionalServicesList = variant?.additionalServices || [];
        } else if (serviceType?.additionalServices) {
          additionalServicesList = serviceType.additionalServices || [];
        }

        vehicle.additionalServices.forEach((addId) => {
          const addService = additionalServicesList.find((a) => a.id === addId);
          if (addService) {
            const price =
              typeof addService.price === "string"
                ? Number(addService.price) || 0
                : addService.price;
            total += price;
          }
        });
      }
    });

    return total;
  };

  // Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const totalPrice = calculateTotalPrice();
    return (totalPrice * appliedPromo.discount) / 100;
  };

  // Calculate final price after discount
  const calculateFinalPrice = () => {
    const totalPrice = calculateTotalPrice();
    const discount = calculateDiscount();
    return totalPrice - discount;
  };

  // Remove applied promo
  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      handlePhoneChange(e);
    } else if (name === "state") {
      setIsManualState(true);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (name === "city") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (!value.trim() && !isManualState) {
        setFormData((prev) => ({ ...prev, state: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString() : "",
    }));
  };

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, timeSlot: time }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBookingId = generateBookingId();
    setBookingId(newBookingId);

    try {
      const totalPrice = calculateTotalPrice();
      const discountedPrice = calculateFinalPrice();

      const bookingData = {
        bookingId: newBookingId,
        webName: WEBSITE_NAME,
        formData: formData,
        totalPrice: totalPrice,
        discountedPrice: discountedPrice,
        discountApplied: !!appliedPromo,
        discountPercent: appliedPromo?.discount || 0,
        promoCode: appliedPromo?.code || null,
        submittedAt: new Date().toISOString(),
        vehicleCount: formData.vehicleBookings.length,
        status: "pending",
      };

      console.log("Booking data:", bookingData);

      const bookingRes = await fetch(
        "https://car-detailling-dashboard.vercel.app/api/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      // Check if response is JSON
      const contentType = bookingRes.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await bookingRes.json();

      if (bookingRes.ok) {
        toast.success("Booking Confirmed Successfully");
        setShowConfirmation(true);
      } else {
        toast.error(data.error || "Booking failed");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.message.includes("JSON")) {
        toast.error("Server error - please contact support");
      } else {
        toast.error("Network error - please try again");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setFormData({
      vehicleType: "", // ✅ Yeh line add ki hai
      vehicleBookings: [
        {
          id: "vehicle-1",
          serviceType: "",
          variant: "",
          mainService: "",
          package: "",
          additionalServices: [],
          vehicleType: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleYear: "",
          vehicleColor: "",
          vehicleLength: "",
          packageConfirmed: false,
        },
      ],
      firstName: "",
      lastName: "",
      email: "",
      phone: "+1 ",
      address: "",
      city: "",
      state: "",
      zip: "",
      date: "",
      timeSlot: "",
      notes: "",
    });
    setCurrentStep(1);
    setPromoCode("");
    setAppliedPromo(null);
    setPromoError("");
    setBookingId("");
    setIsManualState(false);
  };

  // Validation functions for each step
  const isStep1Valid = formData.vehicleBookings.every((vehicle) => {
    const serviceType = serviceTypes.find(
      (st) => st.id === vehicle.serviceType
    );
    return (
      vehicle.serviceType &&
      vehicle.package &&
      (!serviceType?.variants || vehicle.variant)
    );
  });

  const isStep2Valid = formData.vehicleBookings.every(
    (vehicle) => vehicle.packageConfirmed
  );

  const isStep3Valid =
    formData.date &&
    formData.timeSlot &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.phone &&
    formData.address &&
    formData.city &&
    formData.state &&
    formData.zip;

  // Auto-detect state when city changes
  useEffect(() => {
    if (formData.city.trim() && !isManualState) {
      const detectedState = autoDetectState(formData.city);
      if (detectedState && detectedState !== formData.state) {
        setFormData((prev) => ({ ...prev, state: detectedState }));
      }
    }
  }, [formData.city, formData.state, isManualState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center p-4 pt-20">
  <div className="bg-[#1A1A1A] border border-[#00CFFF]/10 shadow-2xl rounded-2xl w-full max-w-4xl mx-auto text-[#00CFFF] overflow-hidden">
    {/* Header with gradient accent */}
    <div className="bg-gradient-to-r from-[#00CFFF]/20 to-transparent p-1">
      <div className="bg-[#1A1A1A] p-6">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/70 bg-clip-text text-transparent">
          Book Your Service
        </h1>
        <p className="text-center text-[#00CFFF]/60">Complete your booking in just 3 simple steps</p>
      </div>
    </div>

    <div className="p-8">
      {/* Modern step indicators */}
      <div className="flex justify-between mb-12 relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#00CFFF]/10 -z-10"></div>
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-300 ${
                currentStep >= n
                  ? "bg-[#00CFFF] border-[#00CFFF] text-[#1A1A1A] shadow-lg shadow-[#00CFFF]/30"
                  : "border-[#00CFFF]/40 text-[#00CFFF]/60 bg-[#1A1A1A]"
              }`}
            >
              {n}
            </div>
            <span className="mt-2 text-sm text-[#00CFFF]/60">
              {n === 1 ? "Services" : n === 2 ? "Details" : "Confirm"}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/70 bg-clip-text text-transparent">
          {currentStep === 1
            ? "Select Your Services"
            : currentStep === 2
            ? "Confirm Your Package"
            : "Finalize Your Booking"}
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/50 mx-auto rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* --- Step 1: Service Selection --- */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#00CFFF]">
                Vehicle Services <span className="text-[#00CFFF]/60">({formData.vehicleBookings.length})</span>
              </h3>
              <Button
                type="button"
                onClick={addVehicleBooking}
                className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            {/* Vehicle Booking Sections */}
            {formData.vehicleBookings.map((vehicle, index) => {
              const serviceType = serviceTypes.find(
                (st) => st.id === vehicle.serviceType
              );
              const mainService = mainServices.find(
                (ms) => ms.id === vehicle.mainService
              );
              let selectedPackage;
              let additionalServicesList = [];

              if (mainService) {
                selectedPackage = mainService.packages.find(
                  (p) => p.id === vehicle.package
                );
              } else if (serviceType?.variants && vehicle.variant) {
                const variant = serviceType.variants.find(
                  (v) => v.id === vehicle.variant
                );
                selectedPackage = variant?.packages.find(
                  (p) => p.id === vehicle.package
                );
                additionalServicesList = variant?.additionalServices || [];
              } else {
                selectedPackage = serviceType?.packages?.find(
                  (p) => p.id === vehicle.package
                );
                additionalServicesList = serviceType?.additionalServices || [];
              }

              return (
                <div
                  key={vehicle.id}
                  className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80 backdrop-blur-sm relative transition-all duration-300 hover:border-[#00CFFF]/20"
                >
                  {/* Remove Vehicle Button */}
                  {formData.vehicleBookings.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeVehicleBooking(vehicle.id)}
                      variant="destructive"
                      size="sm"
                      className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00CFFF]/10 text-[#00CFFF] mr-3">
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-medium bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/70 bg-clip-text text-transparent">
                      Vehicle {index + 1}
                    </h4>
                  </div>

                  <div className="space-y-6">
                    {/* Service Type Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-3 text-[#00CFFF]">
                        Service Type
                      </label>
                      <select
                        value={vehicle.serviceType}
                        onChange={(e) =>
                          handleServiceTypeChange(
                            vehicle.id,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                      >
                        <option value="" disabled className="bg-[#1A1A1A]">
                          Select a service type
                        </option>
                        {serviceTypes.map((service) => (
                          <option
                            key={service.id}
                            value={service.id}
                            className="bg-[#1A1A1A]"
                          >
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Variant Selection for Car Detailing */}
                    {serviceType?.variants && (
                      <div>
                        <label className="block text-sm font-medium mb-3 text-[#00CFFF]">
                          Vehicle Type
                        </label>
                        <select
                          value={vehicle.variant}
                          onChange={(e) =>
                            handleVariantChange(
                              vehicle.id,
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                        >
                          <option
                            value=""
                            disabled
                            className="bg-[#1A1A1A]"
                          >
                            Select vehicle type
                          </option>
                          {serviceType.variants.map((variant) => (
                            <option
                              key={variant.id}
                              value={variant.id}
                              className="bg-[#1A1A1A]"
                            >
                              {variant.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Main Service Selection */}
                    {serviceType && !vehicle.mainService && (
                      <div>
                        <label className="block text-sm font-medium mb-3 text-[#00CFFF]">
                          Premium Service Type
                        </label>
                        <select
                          value={vehicle.mainService}
                          onChange={(e) =>
                            handleMainServiceChange(
                              vehicle.id,
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                        >
                          <option
                            value=""
                            disabled
                            className="bg-[#1A1A1A]"
                          >
                            Select a premium service
                          </option>
                          {mainServices.map((service) => (
                            <option
                              key={service.id}
                              value={service.id}
                              className="bg-[#1A1A1A]"
                            >
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Package Selection */}
                    {vehicle.mainService && (
                      <div className="space-y-6">
                        <label className="block text-lg font-medium text-[#00CFFF]">
                          Select Package
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(
                            mainService?.packages ||
                            serviceType?.variants?.find(
                              (v) => v.id === vehicle.variant
                            )?.packages ||
                            serviceType?.packages ||
                            []
                          ).map((pkg) => {
                            const isSelected = vehicle.package === pkg.id;
                            return (
                              <div
                                key={pkg.id}
                                onClick={() =>
                                  updateVehicleBooking(
                                    vehicle.id,
                                    "package",
                                    pkg.id
                                  )
                                }
                                className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                                  isSelected
                                    ? "border-[#00CFFF] bg-gradient-to-br from-[#00CFFF]/10 to-[#00CFFF]/5 shadow-lg shadow-[#00CFFF]/20"
                                    : "border-[#00CFFF]/20 bg-[#1A1A1A] hover:border-[#00CFFF]/40 hover:shadow-md"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <span className="font-medium text-[#00CFFF]">
                                    {pkg.name}
                                  </span>
                                  <span className="font-bold text-[#00CFFF] text-lg">
                                    ${pkg.price}
                                    {pkg.pricingType === "perFoot" && "/ft"}
                                  </span>
                                </div>
                                {pkg.description && (
                                  <p className="text-[#00CFFF]/70 text-sm mb-3">
                                    {pkg.description}
                                  </p>
                                )}
                                {pkg.includes && pkg.includes.length > 0 && (
                                  <div className="mt-3">
                                    <span className="font-medium text-sm text-[#00CFFF]">
                                      Includes:
                                    </span>
                                    <ul className="list-disc list-inside mt-1 text-sm text-[#00CFFF]/70">
                                      {pkg.includes.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {isSelected && (
                                  <div className="mt-3 text-[#00CFFF] flex items-center text-sm">
                                    <Check className="w-4 h-4 mr-1" />{" "}
                                    Selected
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Additional Services */}
                        {additionalServicesList.length > 0 && (
                          <div className="space-y-4 pt-6 border-t border-[#00CFFF]/10">
                            <label className="block text-lg font-medium text-[#00CFFF]">
                              Add-on Services
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {additionalServicesList.map((svc) => (
                                <div
                                  key={svc.id}
                                  className="flex items-start space-x-3 p-4 border border-[#00CFFF]/10 rounded-lg bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#00CFFF]/20"
                                >
                                  <input
                                    type="checkbox"
                                    id={`${vehicle.id}-${svc.id}`}
                                    checked={vehicle.additionalServices.includes(
                                      svc.id
                                    )}
                                    onChange={() => {
                                      const newAdditionalServices =
                                        vehicle.additionalServices.includes(
                                          svc.id
                                        )
                                          ? vehicle.additionalServices.filter(
                                              (id) => id !== svc.id
                                            )
                                          : [
                                              ...vehicle.additionalServices,
                                              svc.id,
                                            ];
                                      updateVehicleBooking(
                                        vehicle.id,
                                        "additionalServices",
                                        newAdditionalServices
                                      );
                                    }}
                                    className="mt-1 h-5 w-5 accent-[#00CFFF] bg-transparent"
                                  />
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`${vehicle.id}-${svc.id}`}
                                      className="text-sm font-medium text-[#00CFFF] cursor-pointer"
                                    >
                                      {svc.name}
                                    </label>
                                    <p className="text-sm font-semibold text-[#00CFFF] mt-1">
                                      ${svc.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end pt-6">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
                disabled={!isStep1Valid}
              >
                Next Step →
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 2: Package Confirmation --- */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-[#00CFFF]">
              Confirm Package Details <span className="text-[#00CFFF]/60">({formData.vehicleBookings.length} vehicles)</span>
            </h3>

            {formData.vehicleBookings.map((vehicle, index) => {
              const serviceType = serviceTypes.find(
                (st) => st.id === vehicle.serviceType
              );
              const mainService = mainServices.find(
                (ms) => ms.id === vehicle.mainService
              );
              let selectedPackage;
              let additionalServicesList = [];

              if (mainService) {
                selectedPackage = mainService.packages.find(
                  (p) => p.id === vehicle.package
                );
              } else if (serviceType?.variants && vehicle.variant) {
                const variant = serviceType.variants.find(
                  (v) => v.id === vehicle.variant
                );
                selectedPackage = variant?.packages.find(
                  (p) => p.id === vehicle.package
                );
                additionalServicesList = variant?.additionalServices || [];
              } else {
                selectedPackage = serviceType?.packages?.find(
                  (p) => p.id === vehicle.package
                );
                additionalServicesList = serviceType?.additionalServices || [];
              }

              const requiresLength =
                selectedPackage?.pricingType === "perFoot";
              let packagePrice = selectedPackage
                ? typeof selectedPackage.price === "string"
                  ? Number(selectedPackage.price) || 0
                  : selectedPackage.price
                : 0;

              if (requiresLength && vehicle.vehicleLength) {
                packagePrice *= parseFloat(vehicle.vehicleLength);
              }

              return (
                <div
                  key={vehicle.id}
                  className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#00CFFF]/20"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00CFFF]/10 text-[#00CFFF] mr-3">
                        {index + 1}
                      </div>
                      <h4 className="text-xl font-medium bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/70 bg-clip-text text-transparent">
                        Vehicle {index + 1}
                      </h4>
                    </div>
                    {vehicle.packageConfirmed && (
                      <div className="flex items-center text-[#00CFFF] bg-[#00CFFF]/10 px-3 py-1 rounded-full">
                        <Check className="w-4 h-4 mr-1" />
                        Confirmed
                      </div>
                    )}
                  </div>

                  {/* Package Details Card */}
                  <div className="bg-gradient-to-br from-[#00CFFF]/5 to-transparent border border-[#00CFFF]/10 rounded-xl p-5 mb-6">
                    <h5 className="font-semibold text-lg mb-4 text-[#00CFFF]">
                      {mainService?.name || serviceType?.name}
                      {vehicle.variant &&
                        ` - ${
                          serviceType?.variants?.find(
                            (v) => v.id === vehicle.variant
                          )?.name
                        }`}
                    </h5>

                    {selectedPackage && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[#00CFFF]">
                            {selectedPackage.name}
                          </span>
                          <span className="font-bold text-[#00CFFF] text-xl">
                            ${packagePrice.toFixed(2)}
                            {requiresLength &&
                              vehicle.vehicleLength &&
                              ` (${vehicle.vehicleLength} ft)`}
                          </span>
                        </div>

                        {selectedPackage.description && (
                          <p className="text-[#00CFFF]/70 text-sm">
                            {selectedPackage.description}
                          </p>
                        )}

                        {selectedPackage.includes &&
                          selectedPackage.includes.length > 0 && (
                            <div>
                              <span className="font-medium text-sm text-[#00CFFF]">
                                Includes:
                              </span>
                              <ul className="list-disc list-inside mt-2 text-sm text-[#00CFFF]/70">
                                {selectedPackage.includes.map(
                                  (item, idx) => (
                                    <li key={idx}>{item}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Additional Services */}
                    {vehicle.additionalServices.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-[#00CFFF]/10">
                        <h6 className="font-medium text-[#00CFFF] mb-3">
                          Additional Services:
                        </h6>
                        <div className="space-y-3">
                          {vehicle.additionalServices.map((addId) => {
                            const addService = additionalServicesList.find(
                              (a) => a.id === addId
                            );
                            return addService ? (
                              <div
                                key={addService.id}
                                className="flex justify-between text-sm bg-[#1A1A1A] p-3 rounded-lg border border-[#00CFFF]/5"
                              >
                                <span className="text-[#00CFFF]">{addService.name}</span>
                                <span className="text-[#00CFFF] font-medium">
                                  ${addService.price}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Details */}
                  {!vehicle.packageConfirmed && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#00CFFF]/10">
                      {[
                        {
                          id: "vehicleYear",
                          label: "Year*",
                          placeholder: "e.g., 2023",
                        },
                        {
                          id: "vehicleMake",
                          label: "Make*",
                          placeholder: "e.g., Toyota",
                        },
                        {
                          id: "vehicleModel",
                          label: "Model*",
                          placeholder: "e.g., Camry",
                        },
                        {
                          id: "vehicleColor",
                          label: "Color*",
                          placeholder: "e.g., Red",
                        },
                      ].map((field) => (
                        <div key={field.id}>
                          <label
                            htmlFor={`${vehicle.id}-${field.id}`}
                            className="block text-[#00CFFF] mb-2 text-sm font-medium"
                          >
                            {field.label}
                          </label>
                          <input
                            type="text"
                            id={`${vehicle.id}-${field.id}`}
                            value={vehicle[field.id] || ""}
                            onChange={(e) =>
                              updateVehicleBooking(
                                vehicle.id,
                                field.id,
                                e.target.value
                              )
                            }
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Vehicle Length Input (for perFoot pricing) */}
                  {!vehicle.packageConfirmed && requiresLength && (
                    <div className="mt-4">
                      <label
                        htmlFor={`${vehicle.id}-vehicleLength`}
                        className="block text-[#00CFFF] mb-2 text-sm font-medium"
                      >
                        Vehicle Length (feet)*
                      </label>
                      <input
                        type="number"
                        id={`${vehicle.id}-vehicleLength`}
                        value={vehicle.vehicleLength || ""}
                        onChange={(e) =>
                          updateVehicleBooking(
                            vehicle.id,
                            "vehicleLength",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                        placeholder="Enter length in feet"
                        required
                        min="1"
                        step="0.1"
                      />
                    </div>
                  )}

                  {/* Confirmation Message and Button */}
                  {!vehicle.packageConfirmed && (
                    <div className="mt-6 flex justify-between items-center pt-6 border-t border-[#00CFFF]/10">
                      <p className="text-[#00CFFF] text-sm">
                        Click the button to confirm your package selection
                      </p>
                      <Button
                        type="button"
                        onClick={() => confirmPackage(vehicle.id)}
                        className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
                      >
                        Confirm Package
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Total Price Display */}
            <div className="bg-gradient-to-br from-[#00CFFF]/5 to-transparent backdrop-blur-sm border border-[#00CFFF]/10 p-5 rounded-xl">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span className="text-[#00CFFF]">
                  Estimated Total for {formData.vehicleBookings.length} vehicle(s):
                </span>
                <span className="text-[#00CFFF] text-xl">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                onClick={prevStep}
                className="border border-[#00CFFF]/30 bg-transparent text-[#00CFFF] hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] px-6 py-2 rounded-lg font-medium transition-all duration-300"
              >
                ← Previous Step
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-8 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
                disabled={!isStep2Valid}
              >
                Next Step →
              </Button>
            </div>
          </div>
        )}

        {/* --- Step 3: Date/Time & Personal Info --- */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Picker */}
              <div>
                <label className="block text-[#00CFFF] mb-3 font-medium">
                  Select a Date*
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-[#00CFFF]/20 bg-[#1A1A1A] text-[#00CFFF] hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] hover:border-[#00CFFF]/30 py-3 h-auto",
                        !formData.date && "text-[#00CFFF]/40"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date
                        ? format(new Date(formData.date), "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-[#1A1A1A] border-[#00CFFF]/20 z-50"
                    align="start"
                    sideOffset={5}
                  >
                    <Calendar
                      mode="single"
                      selected={
                        formData.date
                          ? new Date(formData.date)
                          : undefined
                      }
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0;
                      }}
                      initialFocus
                      className="bg-[#1A1A1A] text-[#00CFFF]"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-[#00CFFF] mb-3 font-medium">
                  Select a Time*
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={cn(
                        "py-2 px-3 text-sm border rounded-lg text-center transition-all duration-300",
                        formData.timeSlot === time
                          ? "bg-[#00CFFF] text-[#1A1A1A] border-[#00CFFF] shadow-lg shadow-[#00CFFF]/30"
                          : "bg-[#1A1A1A] text-[#00CFFF] border-[#00CFFF]/20 hover:border-[#00CFFF] hover:bg-[#00CFFF]/10"
                      )}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80">
              <h3 className="text-lg font-semibold mb-6 text-[#00CFFF] border-b border-[#00CFFF]/10 pb-3">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "firstName", label: "First Name*", type: "text" },
                  { id: "lastName", label: "Last Name*", type: "text" },
                  { id: "email", label: "Email*", type: "email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-[#00CFFF] mb-2 text-sm font-medium"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                      required
                    />
                  </div>
                ))}

                {/* Phone Input with USA Format */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[#00CFFF] mb-2 text-sm font-medium"
                  >
                    Mobile Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                    required
                    maxLength={17}
                  />
                </div>
              </div>
            </div>

            {/* Address Fields */}
            <div className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80">
              <h3 className="text-lg font-semibold mb-6 text-[#00CFFF] border-b border-[#00CFFF]/10 pb-3">
                Service Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-[#00CFFF] mb-2 font-medium"
                  >
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-[#00CFFF] mb-2 font-medium"
                  >
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-[#00CFFF] mb-2 font-medium"
                  >
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                    placeholder="State"
                    required
                  />
                  {formData.city && !formData.state && (
                    <p className="text-sm text-[#00CFFF]/60 mt-2">
                      State will be auto-detected when you enter city
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="zip"
                    className="block text-[#00CFFF] mb-2 font-medium"
                  >
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                    required
                    maxLength={5}
                    pattern="[0-9]{5}"
                    title="5-digit ZIP code"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80">
              <h3 className="font-semibold text-lg mb-4 text-[#00CFFF]">
                Promo Code
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                  disabled={!!appliedPromo}
                />
                {appliedPromo ? (
                  <Button
                    type="button"
                    onClick={removePromoCode}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={applyPromoCode}
                    className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
                    disabled={!promoCode.trim()}
                  >
                    Apply
                  </Button>
                )}
              </div>
              {promoError && (
                <p className="text-red-400 text-sm mt-3">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[#00CFFF] text-sm mt-3 bg-[#00CFFF]/10 p-3 rounded-lg">
                  ✅ Promo code applied! {appliedPromo.discount}% discount
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="border border-[#00CFFF]/10 rounded-xl p-6 bg-gradient-to-b from-[#1A1A1A] to-[#1A1A1A]/80">
              <label
                htmlFor="notes"
                className="block text-[#00CFFF] mb-3 text-sm font-medium"
              >
                Special Instructions (optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-[#00CFFF]/20 rounded-lg bg-[#1A1A1A] text-[#00CFFF] placeholder-[#00CFFF]/40 focus:outline-none focus:ring-2 focus:ring-[#00CFFF]/50 focus:border-[#00CFFF]/30 transition-all duration-300"
                placeholder="Any special requests or information we should know"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-br from-[#00CFFF]/5 to-transparent backdrop-blur-sm border border-[#00CFFF]/10 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-6 text-[#00CFFF] border-b border-[#00CFFF]/10 pb-3">
                Booking Summary
              </h3>
              <div className="space-y-6">
                {formData.vehicleBookings.map((vehicle, index) => {
                  const serviceType = serviceTypes.find(
                    (st) => st.id === vehicle.serviceType
                  );
                  const mainService = mainServices.find(
                    (ms) => ms.id === vehicle.mainService
                  );
                  let selectedPackage;
                  let vehicleTotal = 0;

                  if (mainService) {
                    selectedPackage = mainService.packages.find(
                      (p) => p.id === vehicle.package
                    );
                  } else if (serviceType?.variants && vehicle.variant) {
                    const variant = serviceType.variants.find(
                      (v) => v.id === vehicle.variant
                    );
                    selectedPackage = variant?.packages.find(
                      (p) => p.id === vehicle.package
                    );
                  } else {
                    selectedPackage = serviceType?.packages?.find(
                      (p) => p.id === vehicle.package
                    );
                  }

                  if (selectedPackage) {
                    let packagePrice =
                      typeof selectedPackage.price === "string"
                        ? Number(selectedPackage.price) || 0
                        : selectedPackage.price;
                    if (
                      selectedPackage.pricingType === "perFoot" &&
                      vehicle.vehicleLength
                    ) {
                      packagePrice *= parseFloat(vehicle.vehicleLength);
                    }
                    vehicleTotal += packagePrice;
                  }

                  return (
                    <div
                      key={vehicle.id}
                      className="border-b border-[#00CFFF]/10 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00CFFF]/10 text-[#00CFFF] text-sm mr-3">
                          {index + 1}
                        </div>
                        <h4 className="font-medium text-[#00CFFF]">
                          Vehicle {index + 1}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="text-[#00CFFF]">
                          <span className="font-medium">Service:</span>{" "}
                          {mainService?.name || serviceType?.name}
                          {vehicle.variant &&
                            ` (${
                              serviceType?.variants?.find(
                                (v) => v.id === vehicle.variant
                              )?.name
                            })`}
                        </div>
                        <div className="text-[#00CFFF]">
                          <span className="font-medium">Package:</span>{" "}
                          {selectedPackage?.name}
                        </div>
                        <div className="text-[#00CFFF]">
                          <span className="font-medium">Vehicle:</span>{" "}
                          {vehicle.vehicleYear} {vehicle.vehicleMake}{" "}
                          {vehicle.vehicleModel}
                        </div>
                        <div className="text-[#00CFFF]">
                          <span className="font-medium">Color:</span>{" "}
                          {vehicle.vehicleColor}
                        </div>
                        {vehicle.additionalServices.length > 0 && (
                          <div className="md:col-span-2 text-[#00CFFF]">
                            <span className="font-medium">Add-ons:</span>{" "}
                            {vehicle.additionalServices.length} service(s)
                          </div>
                        )}
                        <div className="md:col-span-2 text-right font-medium text-[#00CFFF] text-lg">
                          Vehicle Total: ${vehicleTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Promo Code Discount Display */}
                {appliedPromo && (
                  <>
                    <div className="flex justify-between text-[#00CFFF] border-t border-[#00CFFF]/10 pt-4">
                      <span>Promo Code ({appliedPromo.code}):</span>
                      <span>-{appliedPromo.discount}%</span>
                    </div>
                    <div className="flex justify-between text-[#00CFFF]">
                      <span>Discount Amount:</span>
                      <span>-${calculateDiscount().toFixed(2)}</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between font-semibold text-xl border-t border-[#00CFFF]/10 pt-4">
                  <span className="text-[#00CFFF]">
                    Total ({formData.vehicleBookings.length} vehicles):
                  </span>
                  <span className="text-[#00CFFF]">
                    ${calculateFinalPrice().toFixed(2)}
                  </span>
                </div>

                {appliedPromo && (
                  <p className="text-sm text-[#00CFFF]/60 mt-2">
                    * Original price: ${calculateTotalPrice().toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                onClick={prevStep}
                className="border border-[#00CFFF]/30 bg-transparent text-[#00CFFF] hover:bg-[#00CFFF]/10 hover:text-[#00CFFF] px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                ← Previous Step
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-8 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 shadow-lg shadow-[#00CFFF]/20"
                disabled={isSubmitting || !isStep3Valid}
              >
                {isSubmitting && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1A1A1A]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isSubmitting ? "Processing..." : "Complete Booking"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  </div>

  {/* Confirmation Dialog */}
  {showConfirmation && (
    <Dialog open={showConfirmation} onOpenChange={closeConfirmation}>
      <DialogContent className="sm:max-w-md bg-[#1A1A1A] border-[#00CFFF]/20 text-[#00CFFF]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/70 bg-clip-text text-transparent">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center text-[#00CFFF]/70">
            Thank you for booking with {WEBSITE_NAME}.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="bg-[#00CFFF]/10 border border-[#00CFFF]/30 rounded-xl p-5 text-center">
            <p className="text-lg font-semibold text-[#00CFFF]">
              Booking ID: {bookingId}
            </p>
            <p className="text-lg mt-3 text-[#00CFFF]">
              Your appointment details:
            </p>
            <p className="font-medium text-[#00CFFF] text-xl mt-2">
              {formData.date
                ? format(new Date(formData.date), "PPP")
                : ""}{" "}
              at {formData.timeSlot}
            </p>
            <p className="text-[#00CFFF] mt-2">
              {formData.vehicleBookings.length} vehicle(s) booked
            </p>
            {appliedPromo && (
              <p className="text-[#00CFFF] mt-2">
                Promo applied: {appliedPromo.code} (
                {appliedPromo.discount}% off)
              </p>
            )}
          </div>
          <p className="text-sm text-center text-[#00CFFF]/60">
            A confirmation email has been sent to {formData.email}.
          </p>
        </div>
        <DialogFooter className="flex justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-[#00CFFF] to-[#00CFFF]/80 hover:from-[#00CFFF]/90 hover:to-[#00CFFF] text-[#1A1A1A] px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-[#00CFFF]/20">
              Return To Home
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )}
</div>
      );
}

export default BookingForm;