import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationToast from "@/components/NotificationToast";

export const metadata: Metadata = {
  title: "Chocolate Shop | Luxury Artisanal Chocolates Dubai",
  description: "Exquisite handcrafted chocolates with prices in AED. Featuring single-origin cocoa, Royal Dubai Pistachio Kunafa bar, 24K gold truffles, and authentic Emirati heritage flavors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#faf7f2] text-[#2b1810] antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <NotificationToast />
        </CartProvider>
      </body>
    </html>
  );
}
