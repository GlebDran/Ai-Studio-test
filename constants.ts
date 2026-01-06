
import { House } from './types';

export const COLORS = {
  background: '#FDFBF7',
  primary: '#4A5D4E', // Sage/Forest Green
  accent: '#D4A373', // Warm Wood/Sand
  text: '#2D3436',
  muted: '#A0AEC0',
  white: '#FFFFFF',
};

export const MOCK_HOUSES: House[] = [
  {
    id: '1',
    name: 'Riverside Mirror House',
    location: 'Laitse, Estonia',
    price: 245,
    rating: 4.9,
    reviews: 128,
    description: 'Experience true isolation in this architectural masterpiece. The mirror glass walls blend perfectly with the surrounding pine forest, while the private river-side sauna provides the ultimate relaxation.',
    images: [
      'https://picsum.photos/seed/sauna1/800/600',
      'https://picsum.photos/seed/sauna2/800/600',
      'https://picsum.photos/seed/sauna3/800/600'
    ],
    amenities: ['Private Sauna', 'Hot Tub', 'WiFi', 'Kitchen', 'Fireplace', 'River View'],
    capacity: 2,
    category: 'house'
  },
  {
    id: '2',
    name: 'Traditional Smoke Sauna Cabin',
    location: 'Võru, Estonia',
    price: 180,
    rating: 4.8,
    reviews: 85,
    description: 'A genuine UNESCO-heritage style smoke sauna experience. This hand-crafted log cabin offers a deep connection to ancient Estonian traditions.',
    images: [
      'https://picsum.photos/seed/cabin1/800/600',
      'https://picsum.photos/seed/cabin2/800/600'
    ],
    amenities: ['Smoke Sauna', 'BBQ', 'Lake Access', 'Eco-friendly', 'Hiking Trails'],
    capacity: 4,
    category: 'sauna'
  },
  {
    id: '3',
    name: 'Forest Wellness Retreat',
    location: 'Otepää, Estonia',
    price: 320,
    rating: 5.0,
    reviews: 42,
    description: 'Luxury meets nature. This spacious villa features a designer glass sauna, an outdoor infinity hot tub, and panoramic views of the rolling hills.',
    images: [
      'https://picsum.photos/seed/luxury1/800/600',
      'https://picsum.photos/seed/luxury2/800/600'
    ],
    amenities: ['Glass Sauna', 'Infinity Hot Tub', 'EV Charger', 'Wine Cellar', 'Forest View'],
    capacity: 6,
    category: 'house'
  },
  {
    id: '4',
    name: 'The Nordic A-Frame',
    location: 'Lahemaa, Estonia',
    price: 155,
    rating: 4.7,
    reviews: 94,
    description: 'A cozy A-frame cabin tucked away in the national park. Perfect for couples looking for a romantic weekend with a wood-fired sauna under the stars.',
    images: [
      'https://picsum.photos/seed/aframe1/800/600',
      'https://picsum.photos/seed/aframe2/800/600'
    ],
    amenities: ['Wood Sauna', 'Stargazing Deck', 'Fire Pit', 'Pet Friendly'],
    capacity: 2,
    category: 'cabin'
  }
];
