import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "hyex — Descubre Colombia",
    template: "%s | hyex",
  },
  description:
    "La guía editorial de Colombia. Los mejores restaurantes, cafés, bares, hoteles y experiencias en Bogotá, Medellín, Cartagena, Cali y más.",
  keywords: [
    "Colombia",
    "restaurantes",
    "Bogotá",
    "Medellín",
    "Cartagena",
    "Cali",
    "cafés",
    "bares",
    "hoteles",
    "gastronomía",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "hyex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-bg text-text font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
