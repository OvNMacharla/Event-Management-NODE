const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const { returnUser, returnUserEvent } = require('../resolvers/common');

module.exports = {
    events: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const events = await Event.find()
            return events.map(event => {
                return returnUser(event);
            })
        }
        catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        })
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = returnUser(result);
            const isuser = await User.findById(req.userId);

            if (!isuser) {
                throw new Error('User not found')
            }
            isuser.createdEvents.push(event)
            await isuser.save();

            return createdEvent
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated');
        }
        try {
            const fetchEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: req.userId,
                event: fetchEvent
            })
            const res = await booking.save();
            return returnUserEvent(res);
        }
        catch (err) {
            throw err
        }
    }
}