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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, Trash2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

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
        packageConfirmed: false, // New field for step 2 confirmation
        randomizedPackages: [], // Shuffled packages for display
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
  const WEBSITE_NAME = "Spark Ride";

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

  const searchParams = useSearchParams();

  // Auto-detect state when city changes
  useEffect(() => {
    if (formData.city.trim() && !isManualState) {
      const detectedState = autoDetectState(formData.city);
      if (detectedState && detectedState !== formData.state) {
        setFormData((prev) => ({ ...prev, state: detectedState }));
      }
    }
  }, [formData.city, formData.state, isManualState]);

  // Pre-fill form from URL parameters
  useEffect(() => {
    const serviceType = searchParams.get("serviceType");
    const variant = searchParams.get("variant");
    const mainService = searchParams.get("mainService");
    const packageId = searchParams.get("package");
    const additional = searchParams
      .get("additional")
      ?.split(",")
      .filter(Boolean);

    if (serviceType) {
      updateVehicleBooking("vehicle-1", "serviceType", serviceType);
    }
    if (variant) {
      updateVehicleBooking("vehicle-1", "variant", variant);
    }
    if (mainService) {
      updateVehicleBooking("vehicle-1", "mainService", mainService);
    }
    if (packageId) {
      updateVehicleBooking("vehicle-1", "package", packageId);
    }
    if (additional && additional.length > 0) {
      updateVehicleBooking("vehicle-1", "additionalServices", additional);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--charcoal-bg)] pt-16">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl w-full max-w-7xl mx-auto overflow-hidden bg-[var(--charcoal-bg)]">
          <div className="bg-[var(--charcoal-bg)] p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--text-color)]/5 via-[var(--text-color)]/5 to-[var(--text-color)]/5"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-[var(--text-color)]/5 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h1 className="text-7xl font-black bg-gradient-to-r from-[var(--text-color)] via-[var(--text-color)] to-[var(--text-color)] bg-clip-text text-transparent mb-6 animate-pulse drop-shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  Book Your Service
                </h1>
                <p className="text-[var(--white-color)] text-xl font-semibold tracking-wide">
                  Premium Professional Detailing Services
                </p>
                <div className="flex items-center justify-center mt-6 space-x-2">
                  <div className="w-32 h-1 bg-gradient-to-r from-[var(--text-color)] to-[var(--text-color)] rounded-full"></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-[var(--text-color)] to-[var(--text-color)] rounded-full animate-ping"></div>
                  <div className="w-32 h-1 bg-gradient-to-r from-[var(--text-color)] to-[var(--text-color)] rounded-full"></div>
                </div>
                <p className="text-[var(--muted-foreground)] text-sm mt-4 font-medium">
                  ✨ At Your Doorstep • Professional Quality • Competitive
                  Pricing
                </p>
              </div>
            </div>

            {/* Enhanced Step indicators */}
            <div className="flex justify-center mb-16">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center">
                  <div
                    className={`w-20 h-20 flex items-center justify-center rounded-full border-2 text-xl font-bold transition-all duration-700 transform relative overflow-hidden ${
                      currentStep >= n
                        ? "border-transparent text-white shadow-2xl scale-110 bg-gradient-to-r from-[#00CFFF] via-[#00B5E2] to-[#0077FF] animate-pulse"
                        : "border-slate-600/50 text-slate-400 hover:border-yellow-400/50 hover:scale-105 bg-slate-800/50 hover:bg-slate-700/50"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-700 ${
                        currentStep >= n
                          ? "bg-gradient-to-r from-[#00CFFF]/20 via-[#00B5E2]/20 to-[#0077FF]/20 animate-pulse"
                          : ""
                      }`}
                    ></div>
                    <span className="relative z-10">{n}</span>
                    {currentStep >= n && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00CFFF]/10 via-[#00B5E2]/10 to-[#0077FF]/10 animate-ping"></div>
                    )}
                  </div>
                  {n < 3 && (
                    <div className="relative w-24 h-1 mx-8 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-0 transition-all duration-700 ${
                          currentStep > n
                            ? "bg-gradient-to-r from-[#00CFFF] via-[#00B5E2] to-[#0077FF] animate-pulse"
                            : "bg-slate-600/30"
                        }`}
                      ></div>
                      {currentStep > n && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00CFFF]/50 via-[#00B5E2]/50 to-[#0077FF]/50 animate-pulse"></div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-10">
              <h2
                className="text-4xl font-semibold mb-2 animate-fade-in"
                style={{ color: "var(--text-color)" }}
              >
                Step {currentStep}:{" "}
                <span className="bg-gradient-to-r from-[#00CFFF] via-[#00B5E2] to-[#0077FF] bg-clip-text text-transparent">
                  {currentStep === 1
                    ? "Select Your Services"
                    : currentStep === 2
                    ? "Confirm Package Details"
                    : "Schedule & Personal Info"}
                </span>
              </h2>
              <p className="text-slate-400">
                {currentStep === 1
                  ? "Choose the services that best fit your vehicle"
                  : currentStep === 2
                  ? "Review and confirm your package selections"
                  : "Set your appointment and provide contact details"}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* --- Step 1: Service Selection (Simplified) --- */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <h3 className="text-lg font-semibold">
                    Vehicle Services ({formData.vehicleBookings.length})
                  </h3>

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
                      additionalServicesList =
                        variant?.additionalServices || [];
                    } else {
                      selectedPackage = serviceType?.packages?.find(
                        (p) => p.id === vehicle.package
                      );
                      additionalServicesList =
                        serviceType?.additionalServices || [];
                    }

                    return (
                      <div
                        key={vehicle.id}
                        className="border border-white/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm relative"
                      >
                        {/* Remove Vehicle Button */}
                        {formData.vehicleBookings.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeVehicleBooking(vehicle.id)}
                            variant="destructive"
                            size="sm"
                            className="absolute top-4 right-4 bg-gradient-to-r from-[#00CFFF] to-[#0077FF] hover:from-[#0077FF] hover:to-[#00CFFF] transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}

                        <h4
                          className="text-lg font-medium mb-4"
                          style={{ color: "var(--text-color)" }}
                        >
                          Vehicle {index + 1}
                        </h4>

                        <div className="space-y-4">
                          {/* Service Type Selection */}
                          <div>
                            <label className="block text-sm font-medium mb-2">
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
                              className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                            >
                              <option
                                value=""
                                disabled
                                className="bg-[var(--charcoal-bg)] text-[var(--muted-foreground)]"
                              >
                                Select a service type
                              </option>
                              {serviceTypes.map((service) => (
                                <option
                                  key={service.id}
                                  value={service.id}
                                  className="bg-[var(--charcoal-bg)] text-[var(--text-color)] hover:bg-[var(--text-color)]"
                                >
                                  {service.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Variant Selection for Car Detailing */}
                          {serviceType?.variants && (
                            <div>
                              <label className="block text-sm font-medium mb-2">
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
                                className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                              >
                                <option
                                  value=""
                                  disabled
                                  className="bg-[var(--charcoal-bg)] text-[var(--muted-foreground)]"
                                >
                                  Select vehicle type
                                </option>
                                {serviceType.variants.map((variant) => (
                                  <option
                                    key={variant.id}
                                    value={variant.id}
                                    className="bg-[var(--charcoal-bg)] text-[var(--text-color)]"
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
                              <label className="block text-sm font-medium mb-2">
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
                                className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                              >
                                <option
                                  value=""
                                  disabled
                                  className="bg-[var(--charcoal-bg)] text-[var(--muted-foreground)]"
                                >
                                  Select a premium service
                                </option>
                                {mainServices.map((service) => (
                                  <option
                                    key={service.id}
                                    value={service.id}
                                    className="bg-[var(--charcoal-bg)] text-[var(--text-color)]"
                                  >
                                    {service.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Package Selection (Simplified - Name and Price Only) */}
                          {vehicle.mainService && (
                            <div className="space-y-4">
                              <label
                                className="block text-sm font-medium"
                                style={{ color: "var(--text-color)" }}
                              >
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
                                      className={`border rounded-lg p-4 cursor-pointer transition-all backdrop-blur-sm ${
                                        isSelected
                                          ? "border-[var(--text-color)] bg-white/5 shadow-lg"
                                          : "border-white/30 bg-white/5 hover:border-[var(--text-color)] hover:shadow-md"
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="font-medium text-white">
                                          {pkg.name}
                                        </span>
                                        <span className="font-bold"
                                        style={{ color: "var(--text-color)" }}
                                        >
                                          ${pkg.price}
                                          {pkg.pricingType === "perFoot" &&
                                            "/ft"}
                                        </span>
                                      </div>
                                      {pkg.description && (
                                        <p className="text-gray-300 text-sm mt-2">
                                          {pkg.description}
                                        </p>
                                      )}
                                      {pkg.includes &&
                                        pkg.includes.length > 0 && (
                                          <div className="mt-2">
                                            <span className="font-medium text-sm"
                                            style={{ color: "var(--text-color)" }}
                                            >
                                              Includes:
                                            </span>
                                            <ul className="list-disc list-inside mt-1 text-sm text-gray-300">
                                              {pkg.includes.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                      {isSelected && (
                                        <div className="mt-2 text-[var(--text-color)] flex items-center text-sm">
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
                                <div className="space-y-4 pt-6 border-t border-white/20">
                                  <label className="block text-lg font-medium"
                                  style={{ color: "var(--text-color)" }}
                                  >
                                    Add-on Services
                                  </label>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {additionalServicesList.map((svc) => (
                                      <div
                                        key={svc.id}
                                        className="flex items-start space-x-3 p-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm"
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
                                          className="mt-1 h-5 w-5 accent-[var(--text-color)] bg-transparent"

                                        />
                                        <div className="flex-1">
                                          <label
                                            htmlFor={`${vehicle.id}-${svc.id}`}
                                            className="text-sm font-medium text-white cursor-pointer"
                                          >
                                            {svc.name}
                                          </label>
                                          <p className="text-sm font-semibold mt-1"
                                            style={{ color: "var(--text-color)" }}
                                          >
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

                  <div className="flex justify-between pt-4 gap-4">
                    <Button
                      type="button"
                      onClick={addVehicleBooking}
                      className="hover:bg-[var(--text-color)]/5 bg-[var(--text-color)] text-primary-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Another Vehicle
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-[var(--text-color)] hover:bg-[var(--text-color)]/80 text-gray-900 px-8 py-2 rounded-lg font-semibold"

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
                  <h3 className="text-lg font-semibold">
                    Confirm Package Details ({formData.vehicleBookings.length}{" "}
                    vehicles)
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
                      additionalServicesList =
                        variant?.additionalServices || [];
                    } else {
                      selectedPackage = serviceType?.packages?.find(
                        (p) => p.id === vehicle.package
                      );
                      additionalServicesList =
                        serviceType?.additionalServices || [];
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
                        className="border border-white/20 rounded-lg p-6 bg-white/5 backdrop-blur-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-medium"
                          
                          style={{ color: "var(--text-color)" }}>
                            Vehicle {index + 1}
                          </h4>
                          {vehicle.packageConfirmed && (
                            <div className="flex items-center text-green-400">
                              <Check className="w-5 h-5 mr-1" />
                              Confirmed
                            </div>
                          )}
                        </div>

                        {/* Package Details Card */}
                        <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-4">
                          <h5 className="font-semibold text-lg mb-3"
                          style={{ color: "var(--text-color)" }}
                          >
                            {mainService?.name || serviceType?.name}
                            {vehicle.variant &&
                              ` - ${
                                serviceType?.variants?.find(
                                  (v) => v.id === vehicle.variant
                                )?.name
                              }`}
                          </h5>

                          {selectedPackage && (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">
                                  {selectedPackage.name}
                                </span>
                                <span className="font-bold text-lg"
                                style={{ color: "var(--text-color)" }}
                                >
                                  ${packagePrice.toFixed(2)}
                                  {requiresLength &&
                                    vehicle.vehicleLength &&
                                    ` (${vehicle.vehicleLength} ft)`}
                                </span>
                              </div>

                              {selectedPackage.description && (
                                <p className="text-gray-300 text-sm">
                                  {selectedPackage.description}
                                </p>
                              )}

                              {selectedPackage.includes &&
                                selectedPackage.includes.length > 0 && (
                                  <div>
                                    <span className="font-medium text-sm"
                                    style={{ color: "var(--text-color)" }}>
                                      Includes:
                                    </span>
                                    <ul className="list-disc list-inside mt-1 text-sm text-gray-300">
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
                            <div className="mt-4 pt-4 border-t border-white/20">
                              <h6 className="font-medium text-yellow-400 mb-2">
                                Additional Services:
                              </h6>
                              <div className="space-y-2">
                                {vehicle.additionalServices.map((addId) => {
                                  const addService =
                                    additionalServicesList.find(
                                      (a) => a.id === addId
                                    );
                                  return addService ? (
                                    <div
                                      key={addService.id}
                                      className="flex justify-between text-sm"
                                    >
                                      <span>{addService.name}</span>
                                      <span style={{ color: "var(--text-color)" }}>
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
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/20">
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
                                  className="block text-white mb-1 text-sm"
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
                                  className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
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
                              className="block text-white mb-1 text-sm"
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
                              className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                              placeholder="Enter length in feet"
                              required
                              min="1"
                              step="0.1"
                            />
                          </div>
                        )}

                        {/* Confirmation Message and Button */}
                        {!vehicle.packageConfirmed && (
                          <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/20">
                            <p className="text-sm"
                            style={{ color: "var(--text-color)" }}
                            >
                              Click the button to confirm your package selection
                            </p>
                            <Button
                              type="button"
                              onClick={() => confirmPackage(vehicle.id)}
                              className="bg-[var(--text-color)] hover:bg-[var(--text-color)/5] text-white"
                            >
                              Confirm Package
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Total Price Display */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span className="text-white">
                        Estimated Total for {formData.vehicleBookings.length}{" "}
                        vehicle(s):
                      </span>
                      <span style={{color : "var(--text-color)"}}>
                        ${calculateTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      ← Previous Step
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-[var(--text-color)] hover:bg-[var(--text-color)/5] text-white px-8 py-2 rounded-lg font-semibold"
                      disabled={!isStep2Valid}
                    >
                      Next Step →
                    </Button>
                  </div>
                </div>
              )}

              {/* --- Step 3: Date/Time & Personal Info --- */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  {/* Date & Time Selection */}
                  <div className="mb-8">
                    {/* Time Picker */}
                    <div className="mb-8">
                      <label className="block text-white mb-2 font-medium">
                        Select a Time*
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={cn(
                              "py-2 px-3 text-sm border rounded-md text-center transition-all",
                              formData.timeSlot === time
                                ? "bg-[var(--text-color)] text-white border-[var(--text-color)] shadow-lg"
                                : "bg-white/10 text-white border-white/30 hover:border-[var(--text-color)] hover:bg-white/20"
                            )}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Picker */}
                    <div className="w-full">
                      <label className="block text-white mb-2 font-medium">
                        Select a Date*
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
                              !formData.date && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.date
                              ? format(new Date(formData.date), "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-gray-800 border-white/20 z-50"
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
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "firstName", label: "First Name*", type: "text" },
                      { id: "lastName", label: "Last Name*", type: "text" },
                      { id: "email", label: "Email*", type: "email" },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-white mb-1 text-sm font-medium"
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                          required
                        />
                      </div>
                    ))}

                    {/* Phone Input with USA Format */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-white mb-1 text-sm font-medium"
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
                        className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        required
                        maxLength={17}
                      />
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-white mb-1 font-medium"
                      >
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-white/30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-white mb-1 font-medium"
                      >
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-white/30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-white mb-1 font-medium"
                      >
                        State*
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-white/30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        placeholder="State"
                        required
                      />
                      {formData.city && !formData.state && (
                        <p className="text-sm text-gray-400 mt-1">
                          State will be auto-detected when you enter city
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="zip"
                        className="block text-white mb-1 font-medium"
                      >
                        ZIP Code*
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-white/30 rounded-md bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        required
                        maxLength={5}
                        pattern="[0-9]{5}"
                        title="5-digit ZIP code"
                      />
                    </div>
                  </div>

                  {/* Promo Code Section */}
                  <div className="border border-white/20 rounded-lg p-4 bg-white/5 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-3"
                    style={{ color: "var(--text-color)" }}
                    >
                      Promo Code
                    </h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Enter promo code"
                        className="flex-1 px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                        disabled={!!appliedPromo}
                      />
                      {appliedPromo ? (
                        <Button
                          type="button"
                          onClick={removePromoCode}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={applyPromoCode}
                          className="bg-[var(--text-color)] hover:bg-[var(--text-color)] text-white px-4 py-2 rounded"
                          disabled={!promoCode.trim()}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {promoError && (
                      <p className="text-red-400 text-sm mt-2">{promoError}</p>
                    )}
                    {appliedPromo && (
                      <p className="text-yellow-400 text-sm mt-2">
                        ✅ Promo code applied! {appliedPromo.discount}% discount
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-white mb-1 text-sm font-medium"
                    >
                      Special Instructions (optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--muted-foreground)] rounded-lg bg-[var(--charcoal-bg)] text-[var(--text-color)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)] focus:border-[var(--text-color)]"
                      placeholder="Any special requests or information we should know"
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3"
                    style={{ color: "var(--text-color)" }}
                    >
                      Booking Summary
                    </h3>
                    <div className="space-y-4">
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
                            className="border-b border-white/20 pb-4 last:border-b-0"
                          >
                            <h4 className="font-medium mb-2 text-yellow-400">
                              Vehicle {index + 1}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="text-white">
                                <span className="font-medium">Service:</span>{" "}
                                {mainService?.name || serviceType?.name}
                                {vehicle.variant &&
                                  ` (${
                                    serviceType?.variants?.find(
                                      (v) => v.id === vehicle.variant
                                    )?.name
                                  })`}
                              </div>
                              <div className="text-white">
                                <span className="font-medium">Package:</span>{" "}
                                {selectedPackage?.name}
                              </div>
                              <div className="text-white">
                                <span className="font-medium">Vehicle:</span>{" "}
                                {vehicle.vehicleYear} {vehicle.vehicleMake}{" "}
                                {vehicle.vehicleModel}
                              </div>
                              <div className="text-white">
                                <span className="font-medium">Color:</span>{" "}
                                {vehicle.vehicleColor}
                              </div>
                              {vehicle.additionalServices.length > 0 && (
                                <div className="md:col-span-2 text-white">
                                  <span className="font-medium">Add-ons:</span>{" "}
                                  {vehicle.additionalServices.length} service(s)
                                </div>
                              )}
                              <div className="md:col-span-2 text-right font-medium"
                              style={{ color: "var(--text-color)" }}
                              >
                                Vehicle Total: ${vehicleTotal.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {/* Promo Code Discount Display */}
                      {appliedPromo && (
                        <>
                          <div className="flex justify-between text-green-400">
                            <span>Promo Code ({appliedPromo.code}):</span>
                            <span>-{appliedPromo.discount}%</span>
                          </div>
                          <div className="flex justify-between text-green-400">
                            <span>Discount Amount:</span>
                            <span>-${calculateDiscount().toFixed(2)}</span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between font-semibold text-lg border-t border-white/20 pt-2">
                        <span className="text-white">
                          Total ({formData.vehicleBookings.length} vehicles):
                        </span>
                        <span className="text-[var(--text-color)]">
                          ${calculateFinalPrice().toFixed(2)}
                        </span>
                      </div>

                      {appliedPromo && (
                        <p className="text-sm text-gray-400 mt-1">
                          * Original price: ${calculateTotalPrice().toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                      ← Previous Step
                    </Button>
                    <Button
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-2 rounded-lg font-semibold flex items-center"
                      disabled={isSubmitting || !isStep3Valid}
                    >
                      {isSubmitting && (
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            <DialogContent className="sm:max-w-md bg-gray-800 border-white/20 text-white">
              <DialogHeader>
                <DialogTitle
                  className="text-center text-2xl "
                  style={{ color: "var(--text-color)" }}
                >
                  Booking Confirmed!
                </DialogTitle>
                <DialogDescription className="text-center text-gray-300">
                  Thank you for booking with {WEBSITE_NAME}.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 space-y-4">
                <div className="bg-[#001F33]/30 border border-[#00CFFF]/30 rounded-lg p-4 text-center">
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-color)" }}
                  >
                    Booking ID: {bookingId}
                  </p>
                  <p className="text-lg mt-2 text-white">
                    Your appointment details:
                  </p>
                  <p className="font-medium text-white">
                    {formData.date
                      ? format(new Date(formData.date), "PPP")
                      : ""}{" "}
                    at {formData.timeSlot}
                  </p>
                  <p className="text-white">
                    {formData.vehicleBookings.length} vehicle(s) booked
                  </p>
                  {appliedPromo && (
                    <p style={{ color: "var(--text-color)" }}>
                      Promo applied: {appliedPromo.code} (
                      {appliedPromo.discount}% off)
                    </p>
                  )}
                </div>
                <p className="text-sm text-center text-gray-400">
                  A confirmation email has been sent to {formData.email}.
                </p>
              </div>
              <DialogFooter className="flex justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-[#00CFFF] to-[#0077FF] hover:from-[#0077FF] hover:to-[#00CFFF] text-white px-6 py-2 rounded transition-all duration-300">
                    Return To Home
                  </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
