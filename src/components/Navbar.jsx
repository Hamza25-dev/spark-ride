
  "use client";
  import React, { useEffect, useState } from "react";

  export default function Navbar() {
    const [hasShadow, setHasShadow] = useState(false);

    // 🧩 Array of Nav Links
    const navLinks = [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ];

    useEffect(() => {
      const handleScroll = () => setHasShadow(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50  text-[var(--text-color)] transition-all duration-300 ${
          hasShadow ? "shadow-[0_4px_20px_rgba(255,255,255,0.1)]" : "shadow-none"
        }`}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'var(--dark-black)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/">
                <img src="/sparkride.png" alt="Spark Ride Logo" className="h-12 w-12" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path === "/" ? "#home" : link.path === "/services" ? "#services" : link.path === "/about" ? "#about" : link.path === "/contact" ? "#contact" : link.path}
                    className="hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
