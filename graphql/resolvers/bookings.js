const Booking = require('../../models/booking')
const { returnUser, returnUserEvent } = require('../resolvers/common');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return returnUserEvent(booking);
            })
        }
        catch (err) {
            throw err
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = returnUser(booking._doc.event)
            await Booking.deleteOne({ _id: args.bookingId })
            return event;
        }
        catch (err) {
            throw err
        }
    }
}