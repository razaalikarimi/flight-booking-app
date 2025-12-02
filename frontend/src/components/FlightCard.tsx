import type { Flight } from "../features/flights/flightSlice";
import { useNavigate } from "react-router-dom";

interface Props { flight: Flight; }
const FlightCard = ({ flight }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flight-card">
      <div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {flight.airlineLogo && <img src={flight.airlineLogo} alt={flight.airlineName} style={{ width:40, height:40, borderRadius:8 }} />}
          <div><strong>{flight.airlineName}</strong><div>{flight.flightNumber}</div></div>
        </div>
        <div style={{ marginTop:8 }}>{flight.from} → {flight.to}</div>
        <div>{flight.departureTime} - {flight.arrivalTime} ({flight.duration})</div>
        <div>Date: {flight.date}</div>
      </div>
      <div style={{ textAlign:"right" }}>
        <div style={{ fontSize:18, fontWeight:700 }}>₹{flight.price}</div>
        <button style={{ marginTop:8 }} onClick={() => navigate(`/flights/${flight._id}`)}>Book Now</button>
      </div>
    </div>
  );
};
export default FlightCard;
