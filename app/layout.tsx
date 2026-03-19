import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "descubre — Discover Colombia",
    template: "%s | descubre",
  },
  description:
    "Discover Colombia's best restaurants, cafés, bars, hotels, and attractions. Your guide to experiencing the best of Bogotá, Medellín, Cartagena, Cali, and beyond.",
  keywords: [
    "Colombia",
    "travel",
    "restaurants",
    "Bogotá",
    "Medellín",
    "Cartagena",
    "Cali",
    "cafés",
    "bars",
    "hotels",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "descubre",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
