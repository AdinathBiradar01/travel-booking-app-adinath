import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Bookings from "./Bookings";

function App() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setBookings={setBookings} />} />
        <Route path="/bookings" element={<Bookings bookings={bookings} setBookings={setBookings} />} />
      </Routes>
    </Router>
  );
}

export default App;
