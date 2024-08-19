// src/pages/BookingsPage.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { BOOKINGS_QUERY } from '../QueryMutation/graphql-query';
import { CANCEL_BOOKING } from '../QueryMutation/graphql-mutation';

const BookingsPage = () => {
    const { loading, error, data } = useQuery(BOOKINGS_QUERY);
    const [cancelBooking] = useMutation(CANCEL_BOOKING, {
        refetchQueries: [{ query: BOOKINGS_QUERY }],
        onError: (error) => {
            console.error('Error canceling booking:', error);
            alert('Error canceling booking: event. Please try again.');
        },
        onCompleted: () => {
            alert('Event canceled successfully!');
        }
    });

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking({ variables: { bookingId } });
        } catch (err) {
            console.error('Error canceling booking:', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
            {data.bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {data.bookings.map((booking) => (
                        <li key={booking._id} className="mb-4 p-4 border border-gray-300 rounded">
                            <h2 className="text-xl font-semibold">Event: {booking.event.title}</h2>
                            <p>Date: {new Date(booking.event.date).toLocaleDateString()}</p>
                            <p>Booked by: {booking.user.email}</p>
                            <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Cancel Booking
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookingsPage;
