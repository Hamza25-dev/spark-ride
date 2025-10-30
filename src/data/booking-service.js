export const serviceTypes = [
  {
    id: "car-detailing",
    name: "Car Detailing",
    vehicleTypes: ["sedan", "suv", "truck", "van"],
    variants: [
      {
        id: "sedan",
        name: "Sedan",
        vehicleTypes: ["sedan"],
        packages: [
          { id: "sedan-interior-basic", name: "Basic Interior", price: 190, includes: ["Vacuum Carpets & Floor Mats", "Wipe Down Dashboard, Console & Cupholders", "Clean Windows (Inside)", "Clean Door Panels & Pockets", "Light Dusting", "Air Freshener"] },
          { id: "sedan-interior-premium", name: "Premium Interior", price: 230, includes: ["Full Vacuum Carpets, Mats & Seats", "Shampoo & Deep Clean Upholstery + Carpets", "Leather/Vinyl Cleaning & Conditioning", "Dashboard, Console & Trim Detailed", "Interior Windows & Mirrors", "Door Panels & Cupholders Sanitized", "Odor Elimination"] },
          { id: "sedan-exterior-basic", name: "Basic Exterior", price: 170, includes: ["Biodegradable Soap Wash", "Rinse & Pressure Clean", "Hand Dry with Microfiber Towels", "Clean Windows & Mirrors (Outside)", "Basic Tire Shine"] },
          { id: "sedan-exterior-premium", name: "Premium Exterior", price: 200, includes: ["Foam Cannon Wash", "Clay Bar Treatment", "Hand Wax/Sealant", "Windows & Mirrors Polished", "Wheel & Tire Deep Cleaning + Shine", "Bug & Tar Removal"] },
          { id: "sedan-full-basic", name: "Basic Full", price: 230, includes: ["Basic Interior + Basic Exterior Packages"] },
          { id: "sedan-full-premium", name: "Premium Full", price: 310, includes: ["Premium Interior + Premium Exterior Packages"] }
        ],
        additionalServices: [
          { id: "odor_removal", name: "Odor Removal", price: 50 },
          { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
          { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
          { id: "headlight_restore", name: "Headlight Restoration", price: 60 }
        ]
      },
      {
        id: "suv",
        name: "SUV",
        vehicleTypes: ["suv"],
        packages: [
          { id: "suv-interior-basic", name: "Basic Interior", price: 180, includes: ["Vacuum Carpets & Floor Mats", "Wipe Down Dashboard, Console & Cupholders", "Clean Windows (Inside)", "Clean Door Panels & Pockets", "Light Dusting", "Air Freshener"] },
          { id: "suv-interior-premium", name: "Premium Interior", price: 220, includes: ["Full Vacuum Carpets, Mats & Seats", "Shampoo & Deep Clean Upholstery + Carpets", "Leather/Vinyl Cleaning & Conditioning", "Dashboard, Console & Trim Detailed", "Interior Windows & Mirrors", "Door Panels & Cupholders Sanitized", "Odor Elimination"] },
          { id: "suv-exterior-basic", name: "Basic Exterior", price: 160, includes: ["Biodegradable Soap Wash", "Rinse & Pressure Clean", "Hand Dry with Microfiber Towels", "Clean Windows & Mirrors (Outside)", "Basic Tire Shine"] },
          { id: "suv-exterior-premium", name: "Premium Exterior", price: 190, includes: ["Foam Cannon Wash", "Clay Bar Treatment", "Hand Wax/Sealant", "Windows & Mirrors Polished", "Wheel & Tire Deep Cleaning + Shine", "Bug & Tar Removal"] },
          { id: "suv-full-basic", name: "Basic Full", price: 220, includes: ["Basic Interior + Basic Exterior Packages"] },
          { id: "suv-full-premium", name: "Premium Full", price: 300, includes: ["Premium Interior + Premium Exterior Packages"] }
        ],
        additionalServices: [
          { id: "odor_removal", name: "Odor Removal", price: 50 },
          { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
          { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
          { id: "headlight_restore", name: "Headlight Restoration", price: 60 }
        ]
      },
      {
        id: "truck",
        name: "Truck",
        vehicleTypes: ["truck"],
        packages: [
          { id: "truck-interior-basic", name: "Basic Interior", price: 180, includes: ["Vacuum Carpets & Floor Mats", "Wipe Down Dashboard, Console & Cupholders", "Clean Windows (Inside)", "Clean Door Panels & Pockets", "Light Dusting", "Air Freshener"] },
          { id: "truck-interior-premium", name: "Premium Interior", price: 220, includes: ["Full Vacuum Carpets, Mats & Seats", "Shampoo & Deep Clean Upholstery + Carpets", "Leather/Vinyl Cleaning & Conditioning", "Dashboard, Console & Trim Detailed", "Interior Windows & Mirrors", "Door Panels & Cupholders Sanitized", "Odor Elimination"] },
          { id: "truck-exterior-basic", name: "Basic Exterior", price: 190, includes: ["Biodegradable Soap Wash", "Rinse & Pressure Clean", "Hand Dry with Microfiber Towels", "Clean Windows & Mirrors (Outside)", "Basic Tire Shine"] },
          { id: "truck-exterior-premium", name: "Premium Exterior", price: 210, includes: ["Foam Cannon Wash", "Clay Bar Treatment", "Hand Wax/Sealant", "Windows & Mirrors Polished", "Wheel & Tire Deep Cleaning + Shine", "Bug & Tar Removal"] },
          { id: "truck-full-basic", name: "Basic Full", price: 250, includes: ["Basic Interior + Basic Exterior Packages"] },
          { id: "truck-full-premium", name: "Premium Full", price: 320, includes: ["Premium Interior + Premium Exterior Packages"] }
        ],
        additionalServices: [
          { id: "odor_removal", name: "Odor Removal", price: 50 },
          { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
          { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
          { id: "headlight_restore", name: "Headlight Restoration", price: 60 }
        ]
      },
      {
        id: "van",
        name: "Van",
        vehicleTypes: ["van"],
        packages: [
          { id: "van-interior-basic", name: "Basic Interior", price: 210, includes: ["Vacuum Carpets & Floor Mats", "Wipe Down Dashboard, Console & Cupholders", "Clean Windows (Inside)", "Clean Door Panels & Pockets", "Light Dusting", "Air Freshener"] },
          { id: "van-interior-premium", name: "Premium Interior", price: 240, includes: ["Full Vacuum Carpets, Mats & Seats", "Shampoo & Deep Clean Upholstery + Carpets", "Leather/Vinyl Cleaning & Conditioning", "Dashboard, Console & Trim Detailed", "Interior Windows & Mirrors", "Door Panels & Cupholders Sanitized", "Odor Elimination"] },
          { id: "van-exterior-basic", name: "Basic Exterior", price: 190, includes: ["Biodegradable Soap Wash", "Rinse & Pressure Clean", "Hand Dry with Microfiber Towels", "Clean Windows & Mirrors (Outside)", "Basic Tire Shine"] },
          { id: "van-exterior-premium", name: "Premium Exterior", price: 240, includes: ["Foam Cannon Wash", "Clay Bar Treatment", "Hand Wax/Sealant", "Windows & Mirrors Polished", "Wheel & Tire Deep Cleaning + Shine", "Bug & Tar Removal"] },
          { id: "van-full-basic", name: "Basic Full", price: 220, includes: ["Basic Interior + Basic Exterior Packages"] },
          { id: "van-full-premium", name: "Premium Full", price: 300, includes: ["Premium Interior + Premium Exterior Packages"] }
        ],
        additionalServices: [
          { id: "odor_removal", name: "Odor Removal", price: 50 },
          { id: "pet_hair", name: "Pet Hair Removal", price: 40 },
          { id: "engine_cleaning", name: "Engine Cleaning", price: 70 },
          { id: "headlight_restore", name: "Headlight Restoration", price: 60 }
        ]
      }
    ]
  },
  {
    id: "boat-detailing",
    name: "Boat Detailing",
    vehicleTypes: ["boat"],
    packages: [
      { id: "boat-interior", name: "Boat Interior", price: 19, pricingType: "perFoot", includes: ["Vacuum Carpets, Seats & Storage", "..."] },
      { id: "boat-exterior", name: "Boat Exterior", price: 23, pricingType: "perFoot", includes: ["Pressure Rinse Hull & Deck", "..."] },
      { id: "boat-full", name: "Boat Full", price: 35, pricingType: "perFoot", includes: ["Full Interior + Full Exterior Packages"] }
    ],
    additionalServices: []
  },
  {
    id: "rv-detailing",
    name: "RV Detailing",
    vehicleTypes: ["rv"],
    packages: [
      { id: "rv-interior", name: "RV Interior", price: 25, pricingType: "perFoot", includes: ["Vacuum Carpets, Upholstery & Floors", "..."] },
      { id: "rv-exterior", name: "RV Exterior", price: 25, pricingType: "perFoot", includes: ["Pressure Wash Roof, Sides & Awning", "..."] },
      { id: "rv-full", name: "RV Full", price: 40, pricingType: "perFoot", includes: ["Full Interior + Full Exterior Packages"] }
    ],
    additionalServices: []
  },
  {
    id: "bike-detailing",
    name: "Bike Detailing",
    vehicleTypes: ["bike"],
    packages: [
      { id: "bike-full", name: "Bike Full Detailing", price: 170, includes: ["Pressure Rinse Frame, Tank, Fenders", "..."] }
    ],
    additionalServices: []
  }
];

export const timeSlots = ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM", "1:00 PM - 3:00 PM", "3:00 PM - 5:00 PM"];

// export const mainServices = [
//   { id: "interior", name: "Interior Detailing", description: "Deep clean interior surfaces", packages: [] },
//   { id: "exterior", name: "Exterior Detailing", description: "Wash and protect exterior surfaces", packages: [] },
//   { id: "full", name: "Full Detailing", description: "Complete interior and exterior detailing", packages: [] }
// ];

/* ---------------------- MAIN SERVICES (global add-ons) ---------------------- */
// export const mainServices = [
//   {
//     id: "window-tinting",
//     name: "Window Tinting",
//     // price: 80,
//     description: "Professional window tinting (price may vary by vehicle size)",
//     // pricingType: "fixed"
//   },
//   {
//     id: "ceramic-coating",
//     name: "Ceramic Coating",
//     // price: 250,
//     description: "Long-lasting paint protection (surface prep + ceramic application)",
//     // pricingType: "fixed"
//   },
//   {
//     id: "paint-correction",
//     name: "Paint Correction",
//     // price: 180,
//     description: "Multi-stage paint correction to remove swirls and imperfections",
//     // pricingType: "fixed"
//   },
//   {
//     id: "mobile-detailing",
//     name: "Mobile Detailing",
//     // price: 40,
//     description: "On-site detailing service (travel fee may apply)",
//     // pricingType: "fixed"
//   }
// ];

// 


export const mainServices = [
  {
    id: "window-tinting",
    name: "Window Tinting",
    description: "Professional window tinting services for all vehicle types",
    packages: [
      {
        id: "basic-tint",
        name: "Basic Tint",
        price: 150,
        description: "Standard window film with UV protection",
        includes: [
          "Side windows tinting",
          "Basic UV protection", 
          "1-year warranty",
          "Professional installation"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-tint",
        name: "Premium Tint",
        price: 250,
        description: "High-quality ceramic window film",
        includes: [
          "All windows tinting",
          "Ceramic heat rejection",
          "99% UV protection",
          "5-year warranty",
          "Professional installation"
        ],
        pricingType: "fixed"
      },
      {
        id: "luxury-tint",
        name: "Luxury Tint",
        price: 350,
        description: "Premium ceramic tint with maximum heat rejection",
        includes: [
          "All windows + windshield strip",
          "Maximum heat rejection",
          "100% UV protection", 
          "Lifetime warranty",
          "Professional installation",
          "Water spot resistance"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    description: "Long-lasting paint protection with ceramic technology",
    packages: [
      {
        id: "basic-coating",
        name: "Basic Coating",
        price: 300,
        description: "1-year ceramic coating protection",
        includes: [
          "Surface preparation",
          "1-layer ceramic coating",
          "1-year protection",
          "Basic gloss enhancement",
          "Water beading effect"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-coating",
        name: "Premium Coating",
        price: 500,
        description: "3-year professional ceramic coating",
        includes: [
          "Full paint correction",
          "2-layer ceramic coating", 
          "3-year protection",
          "High gloss finish",
          "Chemical resistance",
          "Professional application"
        ],
        pricingType: "fixed"
      },
      {
        id: "signature-coating",
        name: "Signature Coating",
        price: 800,
        description: "5-year premium ceramic coating with warranty",
        includes: [
          "Multi-stage paint correction",
          "3-layer ceramic coating",
          "5-year warranty",
          "Maximum gloss enhancement",
          "Scratch resistance",
          "Professional certification",
          "Maintenance kit included"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "paint-correction",
    name: "Paint Correction",
    description: "Professional paint correction to restore your vehicle's finish",
    packages: [
      {
        id: "single-stage",
        name: "Single Stage",
        price: 200,
        description: "Basic paint correction for minor imperfections",
        includes: [
          "Single-stage compounding",
          "Minor swirl removal",
          "Basic polishing",
          "Surface cleaning",
          "Hand application"
        ],
        pricingType: "fixed"
      },
      {
        id: "two-stage",
        name: "Two Stage",
        price: 350,
        description: "Advanced paint correction for moderate defects",
        includes: [
          "Two-stage correction",
          "Compound + polish",
          "Swirl and scratch removal",
          "Medium gloss enhancement", 
          "Machine polishing"
        ],
        pricingType: "fixed"
      },
      {
        id: "showroom",
        name: "Showroom Finish",
        price: 600,
        description: "Multi-stage correction for showroom perfection",
        includes: [
          "Multi-stage correction",
          "Compound + polish + finish",
          "Complete defect removal",
          "Maximum gloss enhancement",
          "Paint depth preservation",
          "Showroom ready finish"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "mobile-detailing",
    name: "Mobile Detailing",
    description: "Professional detailing services at your location",
    packages: [
      {
        id: "basic-mobile",
        name: "Basic Mobile",
        price: 80,
        description: "Essential mobile detailing package",
        includes: [
          "Exterior wash and dry",
          "Interior vacuuming",
          "Window cleaning",
          "Tire dressing",
          "Basic interior wipe-down"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-mobile",
        name: "Premium Mobile", 
        price: 150,
        description: "Comprehensive mobile detailing service",
        includes: [
          "Full exterior wash",
          "Interior deep cleaning",
          "Window cleaning inside/out",
          "Tire and wheel cleaning",
          "Interior conditioning",
          "Door jambs cleaning"
        ],
        pricingType: "fixed"
      },
      {
        id: "elite-mobile",
        name: "Elite Mobile",
        price: 250,
        description: "Complete mobile detailing with protection",
        includes: [
          "Full exterior detail",
          "Interior deep clean",
          "Quick wax application",
          "Interior protection",
          "Engine bay cleaning",
          "Full interior conditioning"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "interior-detailing",
    name: "Interior Detailing", 
    description: "Deep cleaning and protection for your vehicle's interior",
    packages: [
      {
        id: "basic-interior",
        name: "Basic Interior",
        price: 100,
        description: "Essential interior cleaning package",
        includes: [
          "Complete vacuuming",
          "Dashboard cleaning",
          "Door panel cleaning",
          "Window cleaning",
          "Basic upholstery cleaning"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-interior",
        name: "Premium Interior",
        price: 180,
        description: "Deep interior cleaning and conditioning",
        includes: [
          "Deep vacuuming all areas",
          "Leather/vinyl conditioning",
          "Carpet shampooing",
          "Headliner cleaning",
          "Vent cleaning",
          "Odor elimination"
        ],
        pricingType: "fixed"
      },
      {
        id: "complete-interior",
        name: "Complete Interior",
        price: 300,
        description: "Full interior restoration and protection",
        includes: [
          "Complete deep cleaning",
          "Leather treatment",
          "Carpet extraction",
          "Fabric protection",
          "AC vent sanitization",
          "Interior ceramic coating",
          "Odor neutralization"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "exterior-detailing",
    name: "Exterior Detailing",
    description: "Complete exterior cleaning and protection services",
    packages: [
      {
        id: "basic-exterior",
        name: "Basic Exterior",
        price: 80,
        description: "Essential exterior cleaning package",
        includes: [
          "Hand wash and dry",
          "Tire and wheel cleaning",
          "Window cleaning",
          "Tire dressing",
          "Basic drying"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-exterior",
        name: "Premium Exterior",
        price: 150,
        description: "Comprehensive exterior detailing",
        includes: [
          "Full hand wash",
          "Clay bar treatment",
          "Hand wax application",
          "Wheel well cleaning",
          "Trim restoration",
          "Exterior protection"
        ],
        pricingType: "fixed"
      },
      {
        id: "showroom-exterior",
        name: "Showroom Exterior",
        price: 250,
        description: "Premium exterior restoration",
        includes: [
          "Full decontamination",
          "Clay bar treatment",
          "Machine polishing",
          "Sealant application",
          "Trim restoration",
          "Glass treatment",
          "Long-lasting protection"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "headlight-restoration",
    name: "Headlight Restoration",
    description: "Professional headlight restoration services",
    packages: [
      {
        id: "basic-headlight",
        name: "Basic Restoration",
        price: 60,
        description: "Standard headlight restoration",
        includes: [
          "Headlight sanding",
          "Polishing compound",
          "Basic UV protection",
          "Clarity restoration"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-headlight", 
        name: "Premium Restoration",
        price: 100,
        description: "Advanced headlight restoration with protection",
        includes: [
          "Multi-stage sanding",
          "Professional polishing",
          "UV protective coating",
          "2-year warranty",
          "Maximum clarity restoration"
        ],
        pricingType: "fixed"
      }
    ]
  },
  {
    id: "engine-detailing",
    name: "Engine Detailing",
    description: "Professional engine bay cleaning and detailing",
    packages: [
      {
        id: "basic-engine",
        name: "Basic Engine",
        price: 70,
        description: "Essential engine bay cleaning",
        includes: [
          "Engine degreasing",
          "Rinse and dry",
          "Basic dressing",
          "Safety cover-up"
        ],
        pricingType: "fixed"
      },
      {
        id: "premium-engine",
        name: "Premium Engine",
        price: 120,
        description: "Complete engine bay detailing",
        includes: [
          "Full degreasing",
          "Steam cleaning",
          "Protective coating",
          "Hose conditioning",
          "Plastic restoration",
          "Professional finish"
        ],
        pricingType: "fixed"
      }
    ]
  }
];

export { promoCodes } from './promocode';
