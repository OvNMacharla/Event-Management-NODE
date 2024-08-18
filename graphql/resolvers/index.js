const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking')

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        events.map(event => {
            return { ...event._doc, date: new Date(event.date).toISOString(), _id: event.id, creator: user.bind(this, event.creator) }
        })

        return events;
    }
    catch (err) {
        throw err
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, createdEvents: events.bind(this, user._doc.createdEvents) }
    }
    catch (err) {
        throw err
    }
}

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        console.log(event)
        return { ...event._doc, _id: event.id, creator: user.bind(this, event.creator) }
    }
    catch (err) {
        throw err
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    date: new Date(event.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                }
            })
        }
        catch (err) {
            throw err;
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {
                    ...booking,
                    _id: booking.id,
                    user: user.bind(this, booking.user),
                    event: singleEvent.bind(this, booking.event),
                    createdAt: new Date(booking.createdAt).toISOString(),
                    updatedAt: new Date(booking.updatedAt).toISOString()
                }
            })
        }
        catch (err) {
            throw err
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
            const res = await event.save()
            createdEvent = { ...res._doc, date: new Date(event.date).toISOString(), _id: res.id, creator: user.bind(this, res._doc.creator) }
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
    createUser: async (args) => {
        try {
            const isuser = await User.findOne({ email: args.userInput.email })
            if (isuser) {
                throw new Error('User alredy exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })
            const res = await user.save();
            return res
        }
        catch (err) {
            throw err;
        }
    },
    bookEvent: async (args) => {
        try {
            const fetchEvent = await Event.findOne({ _id: args.eventId })
            const booking = new Booking({
                user: '66c20638a0795731176d13a4',
                event: fetchEvent
            })
            const res = await booking.save();
            return {
                ...res._doc,
                user: user.bind(this, booking.user),
                event: singleEvent.bind(this, booking.event),
                _id: res.id, createdAt: res.createdAt, updatedAt: res.updateAt
            };
        }
        catch (err) {
            throw err
        }
    },
    cancelBooking: async (args) => {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = {
                ...booking.event._doc, _id: booking.event.id,
                creator: user.bind(this, booking.event._doc.creator)
            }
            await Booking.deleteOne({ _id: args.bookingId })
            return event;
        }
        catch (err) {
            throw err
        }
    }
}