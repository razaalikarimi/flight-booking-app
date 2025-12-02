import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/storeHooks";
import { searchFlights } from "../features/flights/flightSlice";

const FlightSearchPage = () => {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Mumbai");
  const [travelDate, setTravelDate] = useState("2025-12-12");
  const [passengers, setPassengers] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(searchFlights({ from, to, travelDate, passengers }));
    if (searchFlights.fulfilled.match(result)) navigate("/flights");
  };

  return (
    <div className="card">
      <h1>Search Flights</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="From (City)" value={from} onChange={(e)=>setFrom(e.target.value)} required />
        <input type="text" placeholder="To (City)" value={to} onChange={(e)=>setTo(e.target.value)} required />
        <input type="date" value={travelDate} onChange={(e)=>setTravelDate(e.target.value)} required />
        <input type="number" min={1} value={passengers} onChange={(e)=>setPassengers(Number(e.target.value))} required />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FlightSearchPage;
