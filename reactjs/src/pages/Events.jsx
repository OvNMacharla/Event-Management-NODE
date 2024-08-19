// src/pages/EventsPage.js

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { EVENTS_QUERY } from '../QueryMutation/graphql-query';
import { CREATE_EVENT_MUTATION, BOOK_EVENT_MUTATION } from '../QueryMutation/graphql-mutation';

const EventsPage = () => {
    // State for handling form input and errors
    const [formError, setFormError] = useState('');
    const [event, setEvent] = useState({
        title: '',
        description: '',
        price: '',
        date: '',
    });

    // Query and mutations
    const { loading, error, data } = useQuery(EVENTS_QUERY);
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION, {
        refetchQueries: [{ query: EVENTS_QUERY }],
        onError: (error) => {
            console.error('Error creating event:', error);
            setFormError('Error creating event. Please try again.');
        },
        onCompleted: () => {
            setEvent({
                title: '',
                description: '',
                price: '',
                date: '',
            });
            setFormError('');
        }
    });
    const [bookEvent] = useMutation(BOOK_EVENT_MUTATION, {
        onError: (error) => {
            console.error('Booking error:', error);
            alert('Error booking event. Please try again.');
        },
        onCompleted: () => {
            alert('Event booked successfully!');
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const { title, description, price, date } = event;

        if (!title || !description || !price || !date) {
            setFormError('Please fill in all fields.');
            return;
        }

        try {
            await createEvent({
                variables: {
                    title,
                    description,
                    price: parseFloat(price),
                    date
                }
            });
        } catch (error) {
            console.error('Error creating event:', error);
            setFormError('Error creating event. Please try again.');
        }
    };

    const handleBookEvent = async (eventId) => {
        try {
            await bookEvent({ variables: { eventId } });
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error booking event. Please try again.');
        }
    };

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error.message}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Events</h1>

            <form className="mb-6 p-4 border border-gray-300 rounded bg-gray-100" onSubmit={handleCreateEvent}>
                <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={event.title}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={event.description}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={event.price}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={event.date}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                />
                {formError && <p className="text-red-500 mb-2">{formError}</p>}
                <button
                    type="submit"
                    className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create Event
                </button>
            </form>

            <ul>
                {data.events.map((event) => (
                    <li key={event._id} className="mb-4 p-4 border border-gray-300 rounded">
                        <h2 className="text-2xl font-semibold">{event.title}</h2>
                        <p>{event.description}</p>
                        <p className="text-gray-500">Price: ${event.price}</p>
                        <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleBookEvent(event._id)}
                            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Book Event
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPage;