import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/storeHooks";
import { useState } from "react";
import { createBooking } from "../features/booking/bookingSlice";

const FlightDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const flight = useAppSelector((state) => state.flights.flights.find((f) => f._id === id));
  const { searchParams } = useAppSelector((state) => state.flights);
  const { loading, error } = useAppSelector((state) => state.booking);

  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test@example.com");
  const [phone, setPhone] = useState("9876543210");
  const [age, setAge] = useState(30);

  if (!flight || !searchParams) return <div className="card">Flight not found. Go back to search.</div>;

  const totalPrice = flight.price * searchParams.passengers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(createBooking({ flightId: flight._id, travelDate: searchParams.travelDate, totalPrice, passengerInfo: { name, email, phone, age } }));
    if (createBooking.fulfilled.match(result)) {
      const bookingId = (result.payload as any)._id;
      navigate(`/booking-success/${bookingId}`);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 800 }}>
      <h1>Flight Details</h1>
      <p><strong>{flight.airlineName}</strong> ({flight.flightNumber})</p>
      <p>{flight.from} → {flight.to}</p>
      <p>{flight.departureTime} - {flight.arrivalTime} ({flight.duration})</p>
      <p>Date: {flight.date}</p>
      <p>Passengers: {searchParams.passengers}</p>
      <p>Total Price: ₹{totalPrice}</p>

      <h2>Passenger Information</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
        <input placeholder="Age" type="number" value={age} onChange={(e)=>setAge(Number(e.target.value))} required />
        <button type="submit" disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
      </form>
    </div>
  );
};

export default FlightDetailsPage;
