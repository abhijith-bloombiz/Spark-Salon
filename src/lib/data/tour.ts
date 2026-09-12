export interface TourHotspot {
  id: string;
  title: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

export interface TourRoom {
  id: string;
  name: string;
  tagline: string;
  description: string;
  panoramaImage: string;
  hotspots: TourHotspot[];
}

export const TOUR_ROOMS: TourRoom[] = [
  {
    id: 'reception',
    name: 'The Golden Marquina Lounge',
    tagline: 'Private Concierge & Welcome Sanctuary',
    description: 'Finished in Italian Nero Marquina marble, brushed 24k champagne gold trims, and bespoke acoustic dampening.',
    panoramaImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-rec-1',
        title: 'Bespoke Consultation Bar',
        description: 'Where every client journey begins with complimentary espresso and diagnostic scalp/skin analysis.',
        x: 35,
        y: 50,
      },
      {
        id: 'hs-rec-2',
        title: 'Apothecary Retail Wall',
        description: 'Exclusively stocking Kérastase Chronologiste, Olaplex Haute, and Spark Signature botanicals.',
        x: 75,
        y: 40,
      },
    ],
  },
  {
    id: 'hair-arena',
    name: 'The Master Styling Arena',
    tagline: 'Precision Cuts & Color Alchemy Stations',
    description: 'Engineered with 5500K color-true cinematic daylight CRI 98+ illumination for zero color distortion.',
    panoramaImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-hair-1',
        title: 'Ergonomic Takara Belmont Stations',
        description: 'Handcrafted leather styling chairs with synchronized recline and vibration massage.',
        x: 48,
        y: 58,
      },
      {
        id: 'hs-hair-2',
        title: 'The Color Laboratory',
        description: 'Precision digital scales and micro-toning bar for customized pigment chemistry.',
        x: 82,
        y: 45,
      },
    ],
  },
  {
    id: 'spa-suite',
    name: 'VIP Private Spa Chamber',
    tagline: 'Sensory Equilibrium & Thermal Immersion',
    description: 'Acoustically isolated private sanctuary equipped with chromotherapy lighting, heated basalt stones, and private steam.',
    panoramaImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-spa-1',
        title: 'Heated Memory-Foam Therapy Bed',
        description: 'Multi-zone infrared thermal heating with automated ergonomic lumbar support.',
        x: 52,
        y: 62,
      },
      {
        id: 'hs-spa-2',
        title: 'Essential Oil Vaporizer',
        description: 'Micro-misting pure organic Mysore sandalwood, French lavender, and vetiver.',
        x: 28,
        y: 38,
      },
    ],
  },
  {
    id: 'bridal-atelier',
    name: 'Royal Bridal & Haute Dressing Suite',
    tagline: 'Private Glamour & Multi-Ceremony Dressing',
    description: 'Dedicated 400 sq.ft royal bridal dressing room with 360-degree mirrored jewelry runway and bridal lounge.',
    panoramaImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-brid-1',
        title: 'Haute Bridal Dressing Runway',
        description: 'Spacious 360-degree vanity lighting with full-length tri-fold bevelled mirrors.',
        x: 42,
        y: 45,
      },
      {
        id: 'hs-brid-2',
        title: 'Jewelry & Veil Setting Station',
        description: 'Velvet-lined display cases and high-precision task lighting for traditional gold ornaments.',
        x: 78,
        y: 55,
      },
    ],
  },
  {
    id: 'facade',
    name: 'Spark International Facade & Beauty Mall',
    tagline: 'Mavoor Road Landmark of Luxury',
    description: 'An iconic multi-level destination at Mavoor Road, Kottooli, Kozhikode, welcoming patrons since inception.',
    panoramaImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-fac-1',
        title: 'Grand Entrance Portal',
        description: 'Architectural double-height glass and illuminated bronze SPARK monogram.',
        x: 50,
        y: 50,
      },
    ],
  },
];
