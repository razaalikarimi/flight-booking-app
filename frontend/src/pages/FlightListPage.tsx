import { useAppSelector } from "../store/storeHooks";
import FlightCard from "../components/FlightCard";

const FlightListPage = () => {
  const { flights, loading, error, searchParams } = useAppSelector((state) => state.flights);
  if (!searchParams) return <div className="card">Go back and search for flights first.</div>;

  return (
    <div className="flight-list">
      <h1>Available Flights</h1>
      <p>{searchParams.from} → {searchParams.to} ({searchParams.travelDate})</p>
      {loading && <div>Loading flights...</div>}
      {error && <div className="error">{error}</div>}
      {flights.length === 0 && !loading && <div>No flights found.</div>}
      {flights.map((f) => <FlightCard key={f._id} flight={f} />)}
    </div>
  );
};
export default FlightListPage;
