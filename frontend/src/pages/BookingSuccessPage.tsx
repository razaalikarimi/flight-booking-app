import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

const BookingSuccessPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/booking/${id}`);
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load booking");
      }
    };
    fetchBooking();
  }, [id]);

  if (error) return <div className="card">{error}</div>;
  if (!data) return <div className="card">Loading booking details...</div>;

  const { _id, flightId, passengerInfo, totalPrice, travelDate } = data;

  return (
    <div className="card">
      <h1>Booking Successful 🎉</h1>
      <p>Booking ID: {_id}</p>
      <h2>Flight</h2>
      <p>{flightId.airlineName} ({flightId.flightNumber})</p>
      <p>{flightId.from} → {flightId.to}</p>
      <p>{flightId.departureTime} - {flightId.arrivalTime} ({flightId.duration})</p>

      <h2>Passenger</h2>
      <p>Name: {passengerInfo.name}</p>
      <p>Email: {passengerInfo.email}</p>
      <p>Phone: {passengerInfo.phone}</p>
      <p>Age: {passengerInfo.age}</p>

      <h2>Trip Info</h2>
      <p>Travel Date: {travelDate}</p>
      <p>Total Price: ₹{totalPrice}</p>

      <Link to="/search"><button style={{ marginTop: 16 }}>Book Another Flight</button></Link>
    </div>
  );
};

export default BookingSuccessPage;
