import {LocationData, Category} from '../Types';

export const categories: Category[] = [
  {
    id: 'golden-taste',
    name: 'Golden Taste',
    color: '#FFD700',
    icon: '🌺',
   
    description: 'Premium Thai restaurants with exceptional flavors',
  },
  {
    id: 'serene-spirit',
    name: 'Serene Spirit',
    color: '#FF69B4',
    icon: '🌸',
    description: 'Peaceful temples and spiritual places',
  },
  {
    id: 'urban-bloom',
    name: 'Urban Bloom',
    color: '#32CD32',
    icon: '🍃',
    description: 'Modern Thai cafes and urban experiences',
  },
  {
    id: 'craft-culture',
    name: 'Craft & Culture',
    color: '#FFA500',
    icon: '⚙️',
    description: 'Cultural centers and art spaces',
  },
  {
    id: 'tranquil-retreats',
    name: 'Tranquil Retreats',
    color: '#FF6347',
    icon: '🌿',
    description: 'Quiet markets and retreat spaces',
  },
];

export const sampleLocations: LocationData[] = [
  {
    id: '1',
    name: 'Kiln Soho',
    category: 'golden-taste',
    description: 'Modern Thai grill restaurant known for clay-pot cooking and charcoal heat.',
    address: '58 Brewer Street, London W1F 9TL',
    phone: '+44 20 7434 2525',
    img: require('../Assets/img/mai/1.png'),
    rating: 4.8,
    image: 'kiln_soho.jpg',
    coordinates: {
      latitude: 51.5150,
      longitude: -0.1380,
    },
    features: [
      'Clay-pot Cooking',
      'Charcoal Grill',
      'Modern Thai Cuisine',
      'Premium Ingredients',
      'Contemporary Design',
    ],
    openingHours: 'Mon-Sun: 17:00-23:00',
  },
  {
    id: '2',
    name: 'Rosa\'s Thai Café – Waterloo',
    category: 'golden-taste',
    description: 'A cozy chain serving authentic Thai comfort food.',
    address: '123 Waterloo Road, London SE1 8UL',
    phone: '+44 20 7928 4455',
    rating: 4.6,
    img: require('../Assets/img/mai/2.png'),
    image: 'rosas_waterloo.jpg',
    coordinates: {
      latitude: 51.5037,
      longitude: -0.1138,
    },
    features: [
      'Authentic Thai Comfort Food',
      'Cozy Atmosphere',
      'Chain Restaurant',
      'Family Friendly',
      'Takeaway Available',
    ],
    openingHours: 'Mon-Sun: 12:00-22:00',
  },
  {
    id: '3',
    name: 'O\'s Thai Café, Crouch End',
    category: 'golden-taste',
    description: 'Family-run eatery with homemade curries and street-style dishes.',
    address: '45 Crouch End Hill, London N8 8DX',
    phone: '+44 20 8340 1234',
    rating: 4.7,
    img: require('../Assets/img/mai/3.png'),
    image: 'os_thai_crouch.jpg',
    coordinates: {
      latitude: 51.5830,
      longitude: -0.1180,
    },
    features: [
      'Family-run',
      'Homemade Curries',
      'Street-style Dishes',
      'Authentic Recipes',
      'Local Favorite',
    ],
    openingHours: 'Tue-Sun: 12:00-21:30',
  },
  {
    id: '4',
    name: 'Thai Square, Trafalgar Square',
    category: 'golden-taste',
    description: 'Elegant restaurant blending traditional Thai décor with modern design.',
    address: '25-26 Craven Street, London WC2N 5NT',
    phone: '+44 20 7839 1234',
    img: require('../Assets/img/mai/5.png'),
    rating: 4.9,
    image: 'thai_square_trafalgar.jpg',
    coordinates: {
      latitude: 51.5110,
      longitude: -0.1240,
    },
    features: [
      'Elegant Design',
      'Traditional Thai Décor',
      'Modern Atmosphere',
      'Premium Location',
      'Fine Dining',
    ],
    openingHours: 'Mon-Sun: 12:00-23:00',
  },
  {
    id: '5',
    name: 'Buddhist Temple London',
    img: require('../Assets/img/mai/6.png'),
    category: 'serene-spirit',
    description: 'A peaceful sanctuary in the heart of London where visitors can experience the tranquility of Buddhist practice.',
    address: '456 Temple Road, London SW1A 1AA',
    phone: '+44 20 2345 6789',
    rating: 4.9,
    image: 'buddhist_temple.jpg',
    coordinates: {
      latitude: 51.4994,
      longitude: -0.1245,
    },
    features: [
      'Meditation Classes',
      'Cultural Events',
      'Community Center',
      'Garden Area',
      'Free Entry',
    ],
    openingHours: 'Mon-Sun: 06:00-20:00',
  },
];

export const getRandomLocation = (category?: string): LocationData => {
  const filteredLocations = category 
    ? sampleLocations.filter(loc => loc.category === category)
    : sampleLocations;
  
  const randomIndex = Math.floor(Math.random() * filteredLocations.length);
  return filteredLocations[randomIndex];
};

export const getLocationsByCategory = (category: string): LocationData[] => {
  return sampleLocations.filter(loc => loc.category === category);
};
