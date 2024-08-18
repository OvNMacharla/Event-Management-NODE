const Event = require('../../models/event');
const User = require('../../models/user');

const returnUser = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: new Date(event.date).toISOString(),
        creator: user.bind(this, event.creator)
    }
}

const returnUserEvent = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString()
    }
}

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        events.map(event => {
            return returnUser(event);
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
        return returnUser(event);
    }
    catch (err) {
        throw err
    }
}

module.exports = { returnUser, returnUserEvent, events, user, singleEvent }