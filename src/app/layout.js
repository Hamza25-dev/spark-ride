import Navbar from "@/app/components/Navbar";
import "./globals.css";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Spark Ride",
  description: "Premium Car Detailing Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen charcoal-bg" style={{ color: 'var(--white-color)' }}>
        <Navbar />
        {/* Page Content */}
        <main className="flex-grow">{children}</main>

        {/* Footer (Always at Bottom) */}
        <Footer />
      </body>
    </html>
  );
}
