const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express()
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        type User{
            _id:ID!
            email:String!
            password:String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        
        input UserInput{
            email:String!
            password:String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput:UserInput):User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }   
     `),
    rootValue: {
        events: () => {
            return Event.find().then(
                event => {
                    return event
                }
            ).catch(
                err => {
                    throw err;
                }
            );
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '66c1c68877fbb40296f0eff1'
            })
            return event.save().then(res => {
                createdEvent = res
                return User.findById('66c1c68877fbb40296f0eff1');
            })
                .then(user => {
                    if (!user) {
                        throw new Error('User not found')
                    }
                    user.createdEvents.push(event)
                    return user.save();
                }
                ).then(result => { return createdEvent })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        },
        createUser: (args) => {
            return User.findOne({ email: args.userInput.email })
                .then(user => {
                    if (user) {
                        throw new Error('User alredy exists');
                    }
                    return bcrypt.hash(args.userInput.password, 12)
                }).then(hashedPass => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPass
                    })
                    return user.save();
                }).then(res => { return res }
                )
                .catch(err => {
                    throw err;
                })
        }
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.USER}:EvxDF80V4FszfWoN@cluster0.arzsg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
}
)