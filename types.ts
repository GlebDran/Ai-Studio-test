
export interface House {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  amenities: string[];
  capacity: number;
  category: 'house' | 'sauna' | 'cabin';
}

export interface Booking {
  id: string;
  houseId: string;
  startDate: string;
  endDate: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export type Screen = 'home' | 'search' | 'bookings' | 'profile' | 'details' | 'booking-flow';
