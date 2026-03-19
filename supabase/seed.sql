-- ============================================================
-- descubre — Colombia Discovery Platform
-- Seed Data: 16 Colombian Places
-- ============================================================

insert into public.places (
  name, slug, description, city, neighborhood, category, cuisine,
  price_level, hours, phone, website, instagram, address,
  latitude, longitude, cover_image_url, is_featured, is_claimed,
  avg_rating, review_count, tags
) values

-- 1. La Pepita Burger Bar
(
  'La Pepita Burger Bar',
  'la-pepita-burger-bar',
  'Bogotá''s most beloved burger spot, La Pepita has been serving creative gourmet burgers since 2012. Located in the heart of Chapinero, their craft beer selection and vibrant atmosphere make it a must-visit.',
  'Bogotá', 'Chapinero', 'Restaurants', 'Burgers',
  '$$', 'Mon–Thu 12pm–11pm, Fri–Sat 12pm–1am, Sun 12pm–10pm',
  '+57 1 234 5678', 'https://lapepita.com.co', '@lapepitabogota',
  'Calle 67 #5-55, Chapinero, Bogotá',
  4.6534, -74.0621,
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  true, true, 4.7, 428,
  array['burgers', 'craft beer', 'trendy']
),

-- 2. El Cielo
(
  'El Cielo',
  'el-cielo',
  'Chef Juan Manuel Barrientos'' molecular gastronomy experience is one of Colombia''s most celebrated restaurants. El Cielo offers a multi-sensory journey through Colombian flavors reimagined through cutting-edge techniques.',
  'Medellín', 'El Poblado', 'Restaurants', 'Colombian Fine Dining',
  '$$$$', 'Tue–Sat 7pm–11pm',
  '+57 4 444 2222', 'https://elcielorestaurante.com', '@elcielojmb',
  'Calle 7D #43E-107, El Poblado, Medellín',
  6.2073, -75.5697,
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  true, true, 4.9, 312,
  array['molecular gastronomy', 'fine dining', 'Colombian']
),

-- 3. Café Velvet
(
  'Café Velvet',
  'cafe-velvet',
  'Tucked into a colonial mansion in Usaquén, Café Velvet is the kind of place you discover by accident and return to deliberately. Their single-origin Colombian beans are roasted in-house, and the brunch menu is consistently excellent.',
  'Bogotá', 'Usaquén', 'Cafés', 'Specialty Coffee',
  '$', 'Daily 7am–8pm',
  '+57 1 345 6789', null, '@cafevelvetbogota',
  'Calle 119B #6-21, Usaquén, Bogotá',
  4.695, -74.033,
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  false, false, 4.5, 189,
  array['specialty coffee', 'brunch', 'cozy']
),

-- 4. Alambique
(
  'Alambique',
  'alambique',
  'High above Getsemaní''s colorful streets, Alambique''s rooftop bar has become one of Cartagena''s most photographed spots. The cocktail menu celebrates Colombian spirits in inventive combinations.',
  'Cartagena', 'Getsemaní', 'Bars', null,
  '$$', 'Daily 5pm–2am',
  '+57 5 567 8901', 'https://alambiquecartagena.com', '@alambiquecartagena',
  'Calle de la Media Luna #10-46, Getsemaní, Cartagena',
  10.4213, -75.5486,
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  true, true, 4.6, 247,
  array['cocktails', 'rooftop', 'views']
),

-- 5. El Santísimo
(
  'El Santísimo',
  'el-santisimo',
  'Inside a 17th-century colonial building in Cartagena''s walled city, El Santísimo brings modern French-Colombian cuisine to a breathtakingly beautiful setting. The ceviche de camarón with coconut leche de tigre is legendary.',
  'Cartagena', 'Centro Histórico', 'Restaurants', 'Colombian-French Fusion',
  '$$$', 'Mon–Sat 12pm–3pm, 7pm–11pm',
  '+57 5 678 9012', 'https://elsantisimo.com', '@elsantisimocartagena',
  'Calle Santo Domingo #3-52, Centro Histórico, Cartagena',
  10.4228, -75.5458,
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  true, true, 4.8, 356,
  array['seafood', 'colonial', 'romantic']
),

-- 6. Pergamino Café
(
  'Pergamino Café',
  'pergamino-cafe',
  'One of Colombia''s premier specialty coffee destinations, Pergamino is housed in a beautifully restored El Poblado villa. Their baristas are trained in Melbourne and Seoul, and the care they give to sourcing, roasting, and brewing is evident in every cup.',
  'Medellín', 'El Poblado', 'Cafés', 'Specialty Coffee',
  '$', 'Daily 7am–9pm',
  '+57 4 333 2211', 'https://pergamino.co', '@pergaminocafe',
  'Carrera 37 #8A-37, El Poblado, Medellín',
  6.2082, -75.5673,
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  true, true, 4.8, 521,
  array['specialty coffee', 'third wave', 'cozy']
),

-- 7. Andrés Carne de Res
(
  'Andrés Carne de Res',
  'andres-carne-de-res',
  'More than a restaurant, Andrés Carne de Res is a Colombian institution. This legendary spot in Chía sprawls across multiple floors of controlled chaos: taxidermied animals, vintage signs, dancing waitstaff, and live cumbia bands.',
  'Chía', 'Chía', 'Nightlife', 'Colombian Grill',
  '$$', 'Thu–Sun 12pm–4am',
  '+57 1 890 1234', 'https://andrescarnederes.com', '@andrescarnederes',
  'Calle 3 #11A-56, Chía, Cundinamarca',
  4.8601, -74.0346,
  'https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&q=80',
  true, true, 4.7, 892,
  array['iconic', 'dancing', 'Colombian']
),

-- 8. Hotel Casa San Agustín
(
  'Hotel Casa San Agustín',
  'hotel-casa-san-agustin',
  'Arguably Cartagena''s most beautiful hotel, Casa San Agustín occupies three 16th-century colonial houses connected by a stunning courtyard garden. The 31 rooms are individually designed, combining original colonial architecture with contemporary Colombian craftsmanship.',
  'Cartagena', 'Centro Histórico', 'Hotels', null,
  '$$$$', '24 hours',
  '+57 5 701 0400', 'https://hotelcasasanagustin.com', '@hotelcasasanagustin',
  'Calle de la Universidad #36-44, Centro Histórico, Cartagena',
  10.423, -75.5466,
  'https://images.unsplash.com/photo-1571997392405-ea84be8929c7?w=800&q=80',
  true, true, 4.9, 203,
  array['boutique', 'colonial', 'luxury']
),

-- 9. Parque Tayrona
(
  'Parque Tayrona',
  'parque-tayrona',
  'One of Colombia''s crown jewels, Tayrona National Park combines pristine Caribbean beaches with dense jungle and ancient Tayrona indigenous history. The trek from Cañaveral to Cabo San Juan is rewarded with one of the most beautiful beach scenes imaginable.',
  'Santa Marta', 'Tayrona', 'Attractions', null,
  '$', 'Daily 8am–5pm (camping available)',
  '+57 5 901 2345', 'https://parquesnacionales.gov.co/tayrona', '@parquetayrona',
  'Carretera a Palomino km 34, Magdalena',
  11.3139, -73.9166,
  'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80',
  true, false, 4.8, 1247,
  array['nature', 'beach', 'hiking']
),

-- 10. Ciudad Perdida
(
  'Ciudad Perdida',
  'ciudad-perdida',
  'The Lost City trek is one of South America''s most rewarding adventures. The 4–6 day guided trek through the Sierra Nevada de Santa Marta leads to an ancient Tayrona city built around 800 AD — older than Machu Picchu.',
  'Santa Marta', 'Sierra Nevada', 'Attractions', null,
  '$$', '4–6 day guided trek; departs daily',
  '+57 5 012 3456', 'https://ciudadperdida.com', '@ciudadperdidatrek',
  'Sierra Nevada de Santa Marta, Magdalena',
  11.0385, -73.9254,
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  true, false, 4.9, 678,
  array['trekking', 'indigenous', 'history']
),

-- 11. La Topa Tolondra
(
  'La Topa Tolondra',
  'la-topa-tolondra',
  'No visit to Cali is complete without dancing salsa, and La Topa Tolondra in Granada is where locals go. Live bands on weekends, DJs on weekdays. Take a salsa lesson beforehand or jump in and learn by doing.',
  'Cali', 'Granada', 'Nightlife', null,
  '$$', 'Wed–Sun 9pm–4am',
  '+57 2 123 4567', null, '@latopalolondra',
  'Avenida 9N #14-42, Granada, Cali',
  3.4516, -76.5225,
  'https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&q=80',
  false, false, 4.6, 334,
  array['salsa', 'live music', 'dancing']
),

-- 12. El Cielo Bar
(
  'El Cielo Bar',
  'el-cielo-bar',
  'El Cielo Bar in Barranquilla''s El Prado neighborhood is a sophisticated cocktail lounge with a rooftop terrace and city views. The menu leans into Colombian botanicals and local spirits.',
  'Barranquilla', 'El Prado', 'Bars', null,
  '$$', 'Tue–Sun 6pm–2am',
  '+57 5 234 5678', null, '@elcielobaq',
  'Carrera 54 #72-150, El Prado, Barranquilla',
  10.9878, -74.8026,
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
  false, false, 4.4, 156,
  array['cocktails', 'trendy', 'rooftop']
),

-- 13. Hatoviejo
(
  'Hatoviejo',
  'hatoviejo',
  'For an authentic bandeja paisa experience in Medellín, Hatoviejo in Laureles is the benchmark. The traditional paisa farmhouse setting sets the scene for what Colombia''s most famous dish should taste like.',
  'Medellín', 'Laureles', 'Restaurants', 'Traditional Colombian',
  '$$', 'Daily 11am–10pm',
  '+57 4 567 8901', 'https://hatoviejo.com', '@hatoviejo',
  'Circular 4 #73-20, Laureles, Medellín',
  6.2398, -75.5914,
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
  false, true, 4.5, 289,
  array['traditional', 'bandeja paisa', 'Colombian']
),

-- 14. Casa Medina
(
  'Casa Medina',
  'casa-medina',
  'A national monument and one of Bogotá''s most storied hotels, Casa Medina was built in 1945 in Spanish-colonial style. The hotel''s restaurant serves excellent Colombian cuisine in a warm, chandelier-lit dining room.',
  'Bogotá', 'Chapinero', 'Hotels', null,
  '$$$', '24 hours',
  '+57 1 312 0288', 'https://casamedina.com', '@casamedinahotel',
  'Carrera 7 #69A-22, Chapinero, Bogotá',
  4.6517, -74.0529,
  'https://images.unsplash.com/photo-1571997392405-ea84be8929c7?w=800&q=80',
  false, true, 4.7, 198,
  array['historic', 'boutique', 'elegant']
),

-- 15. Aguardiente Bar
(
  'Aguardiente Bar',
  'aguardiente-bar',
  'A beloved Cali institution in Chipichape. Cheap aguardiente, cold beer, cumbia on the sound system, and a crowd of locals who''ve been coming for decades. Authentic Cali nightlife at its most unpretentious.',
  'Cali', 'Chipichape', 'Bars', null,
  '$', 'Thu–Sun 8pm–3am',
  '+57 2 345 6789', null, '@aguardientebarcali',
  'Calle 38N #5B-45, Chipichape, Cali',
  3.4716, -76.5335,
  'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
  false, false, 4.3, 112,
  array['local', 'aguardiente', 'lively']
),

-- 16. Biestrela
(
  'Biestrela',
  'biestrela',
  'Hidden in La Candelaria''s maze of colonial streets, Biestrela has been making Bogotá''s best empanadas for over 30 years. The recipe is unchanged: masa made fresh each morning, filled with papa criolla and beef picadillo, fried to order.',
  'Bogotá', 'La Candelaria', 'Restaurants', 'Colombian Street Food',
  '$', 'Mon–Sat 8am–6pm',
  '+57 1 456 7890', null, '@biestrela',
  'Calle 10 #2-95, La Candelaria, Bogotá',
  4.5978, -74.0779,
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  false, false, 4.2, 87,
  array['street food', 'empanadas', 'local']
);
