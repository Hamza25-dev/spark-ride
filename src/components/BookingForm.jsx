'use client';

import { useState, useEffect } from 'react';
import { serviceTypes, mainServices, timeSlots, promoCodes } from '@/data/booking-service';
import { allCities } from '@/data/stateMapping';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    serviceType: '',
    vehicleType: '',
    selectedPackage: '',
    additionalServices: [],
    promoCode: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
    city: '',
    state: '',
    address: '',
    specialInstructions: ''
  });

  const [selectedService, setSelectedService] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Calculate total price
  useEffect(() => {
    let price = 0;

    if (selectedService && selectedVehicle && formData.selectedPackage) {
      const service = serviceTypes.find(s => s.id === formData.serviceType);
      if (service) {
        const vehicleVariant = service.variants.find(v => v.id === formData.vehicleType);
        if (vehicleVariant) {
          const pkg = vehicleVariant.packages.find(p => p.id === formData.selectedPackage);
          if (pkg) {
            price += pkg.price;
          }
        }
      }
    }

    // Add additional services
    formData.additionalServices.forEach(serviceId => {
      const service = serviceTypes.find(s => s.id === formData.serviceType);
      if (service) {
        const vehicleVariant = service.variants.find(v => v.id === formData.vehicleType);
        if (vehicleVariant) {
          const addService = vehicleVariant.additionalServices.find(s => s.id === serviceId);
          if (addService) {
            price += addService.price;
          }
        }
      }
    });

    // Apply promo code
    if (formData.promoCode) {
      const promo = promoCodes.find(p => p.code.toLowerCase() === formData.promoCode.toLowerCase());
      if (promo) {
        setDiscount(price * (promo.discount / 100));
        price -= price * (promo.discount / 100);
      }
    }

    setTotalPrice(price);
  }, [formData, selectedService, selectedVehicle]);

  return (
    <div>
      <h1>Booking Form Component</h1>
      {/* Placeholder JSX to complete the component */}
      <p>This component is under development.</p>
    </div>
  );
};
