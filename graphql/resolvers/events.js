const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
const { returnUser, returnUserEvent } = require('../resolvers/common');

module.exports = {
    events: async () => {
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
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '66c20638a0795731176d13a4'
        })
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = returnUser(result);
            const isuser = await User.findById('66c20638a0795731176d13a4');

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
    bookEvent: async (args) => {
        try {
            const fetchEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: '66c20638a0795731176d13a4',
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