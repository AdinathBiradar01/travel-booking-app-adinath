import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = ({ bookings, setBookings }) => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", destination: "", date: "" });

  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setUpdatedData({ name: booking.name, destination: booking.destination, date: booking.date });
  };

  const handleUpdate = (id) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updatedData } : booking
      )
    );
    setEditingId(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Booking Details</h1>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-600">No bookings available.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id} className="border p-4 rounded-md shadow">
                {editingId === booking.id ? (
                  <>
                    <input
                      type="text"
                      value={updatedData.name}
                      onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                      className="w-full p-2 border rounded-md mb-2"
                    />
                    <input
                      type="text"
                      value={updatedData.destination}
                      onChange={(e) => setUpdatedData({ ...updatedData, destination: e.target.value })}
                      className="w-full p-2 border rounded-md mb-2"
                    />
                    <input
                      type="date"
                      value={updatedData.date}
                      onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
                      className="w-full p-2 border rounded-md mb-2"
                    />
                    <button onClick={() => handleUpdate(booking.id)} className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-800 font-medium">{booking.name} - {booking.destination} - {booking.date}</p>
                    <div className="flex justify-between mt-2">
                      <button onClick={() => handleEdit(booking)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(booking.id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Bookings;
