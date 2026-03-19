import React from "react";
import Link from "next/link";

const cities = [
  { href: "/city/bogota", label: "Bogotá" },
  { href: "/city/medellin", label: "Medellín" },
  { href: "/city/cartagena", label: "Cartagena" },
  { href: "/city/cali", label: "Cali" },
  { href: "/city/santa-marta", label: "Santa Marta" },
  { href: "/city/barranquilla", label: "Barranquilla" },
];

const categories = [
  { href: "/?category=Restaurants", label: "Restaurantes" },
  { href: "/?category=Cafés", label: "Cafés" },
  { href: "/?category=Bars", label: "Bares" },
  { href: "/?category=Hotels", label: "Hoteles" },
  { href: "/?category=Attractions", label: "Atracciones" },
  { href: "/?category=Nightlife", label: "Vida Nocturna" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(242,237,232,0.07)] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-coral text-2xl font-serif block mb-3">
              descubre
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Discover Colombia&apos;s best places. Restaurants, cafés, bars, hotels, and
              attractions across the country&apos;s most vibrant cities.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-text text-sm font-semibold uppercase tracking-wider mb-4">
              Ciudades
            </h3>
            <ul className="space-y-2">
              {cities.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="text-text-muted text-sm hover:text-text transition-colors"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-text text-sm font-semibold uppercase tracking-wider mb-4">
              Categorías
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-text-muted text-sm hover:text-text transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-text text-sm font-semibold uppercase tracking-wider mb-4">
              Descubre
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/signup" className="text-text-muted text-sm hover:text-text transition-colors">
                  Crear cuenta
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-text-muted text-sm hover:text-text transition-colors">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-text-muted text-sm hover:text-text transition-colors">
                  Mis guardados
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-text-muted text-sm hover:text-text transition-colors">
                  Mi perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(242,237,232,0.07)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-dim text-xs">
            &copy; {new Date().getFullYear()} descubre. Hecho con amor en Colombia.
          </p>
          <p className="text-text-dim text-xs">
            Descubriendo lo mejor de Colombia, un lugar a la vez.
          </p>
        </div>
      </div>
    </footer>
  );
}
