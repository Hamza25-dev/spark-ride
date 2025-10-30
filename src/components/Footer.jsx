// "use client";
// import React from "react";
// import Link from "next/link";
// import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// export default function Footer() {
//   const quickLinks = [
//     { name: "Home", path: "/" },
//     { name: "Services", path: "/services" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const contactInfo = [
//     { label: "Email", value: "info@sparkride.com" },
//     { label: "Phone", value: "(123) 456-7890" },
//     { label: "Address", value: "123 Main Street, City, State" },
//   ];

//   const socialLinks = [
//     { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
//     { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
//     { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
//   ];

//   return (
//     <footer
//       className="charcoal-bg py-10 text-gray-300"
//     >
//       <div className="max-w-7xl min-h-screen mx-auto px-6 md:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
//           {/* Logo + Description */}
//           <div className="col-span-1 md:col-span-2 space-y-4">
//             <div className="flex items-center space-x-2">
//               <img src="/sparkride.png" alt="Spark Ride Logo" className="h-12 w-12" />
//               <span className="text-xl font-bold text-[var(--text-color)]">Spark Ride</span>
//             </div>
//             <p className="text-sm leading-relaxed max-w-md">
//               Spark Ride is your destination for premium car detailing and maintenance.
//               Let your car shine like new again with our expert services.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               {quickLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.path}
//                     className="hover:text-blue-400 transition-colors"
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info + Socials */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
//               Contact Us
//             </h3>
//             <ul className="space-y-2 text-sm">
//               {contactInfo.map((info) => (
//                 <li key={info.label}>
//                   <strong>{info.label}:</strong> {info.value}
//                 </li>
//               ))}
//             </ul>
//             <div className="flex space-x-4 mt-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.name}
//                   href={social.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-xl hover:scale-110 transition-transform duration-300"
//                   title={social.name}
//                 >
//                   <social.icon />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-6 text-center text-sm text-gray-400">
//           <p>© {new Date().getFullYear()} Spark Ride. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }


"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const contactInfo = [
    { label: "Email", value: "info@sparkride.com" },
    { label: "Phone", value: "(123) 456-7890" },
    { label: "Address", value: "123 Main Street, City, State" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
  ];

  const packageNames = [
    "Window Tinting",
    "Ceramic Coating",
    "Paint Correction",
    "Mobile Detailing",
    "Engine Detailing",
  ];

  return (
    <footer className="charcoal-bg text-[var(--white-color)] py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-y-8 gap-x-10 border-b border-gray-700 pb-8">
          {/* Logo + Description */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src="/sparkride.png"
                alt="Spark Ride Logo"
                className="h-12 w-12"
              />
            </div>
            <p className="text-sm mt-8 max-w-sm text-gray-300 leading-relaxed">
              Spark Ride is your destination for premium car detailing and
              maintenance. Let your car shine like new again with our expert
              services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
              Our Packages
            </h3>
            <ul className="space-y-2">
              {packageNames.map((pkg) => (
                <li
                  key={pkg}
                  className="hover:text-blue-400 cursor-pointer transition-colors"
                >
                  {pkg}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info + Socials */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-color)]">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <strong>{info.label}:</strong> {info.value}
                </li>
              ))}
            </ul>
            <div className="flex space-x-5 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:scale-110 transition-transform duration-300"
                  title={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Spark Ride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}



