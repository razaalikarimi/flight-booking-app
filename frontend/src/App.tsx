import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FlightSearchPage from "./pages/FlightSearchPage";
import FlightListPage from "./pages/FlightListPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<ProtectedRoute><FlightSearchPage /></ProtectedRoute>} />
        <Route path="/flights" element={<ProtectedRoute><FlightListPage /></ProtectedRoute>} />
        <Route path="/flights/:id" element={<ProtectedRoute><FlightDetailsPage /></ProtectedRoute>} />
        <Route path="/booking-success/:id" element={<ProtectedRoute><BookingSuccessPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
