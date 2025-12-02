export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Flight {
  _id: string;
  airlineName: string;
  airlineLogo: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  date: string;
  availableSeats: number;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  travelDate: string;
  passengers: number;
}

export interface FlightState {
  flights: Flight[];
  selectedFlight: Flight | null;
  searchParams: FlightSearchParams | null;
  loading: boolean;
  error: string | null;
}

export interface PassengerInfo {
  name: string;
  email: string;
  phone: string;
  age: number;
}

export interface Booking {
  _id: string;
  userId: string;
  flightId: Flight;
  passengerInfo: PassengerInfo;
  numberOfPassengers: number;
  totalPrice: number;
  travelDate: string;
  bookingDate: string;
  status: string;
}

export interface BookingState {
  currentBooking: Booking | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}