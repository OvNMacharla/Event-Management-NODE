const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, graphql } = require('graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Event = require('./models/event');
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

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
            // const event = {
            //     _id: Math.random().toString(),
            //     title: args.eventInput.title,
            //     description: args.eventInput.description,
            //     price: +args.eventInput.price,
            //     date: args.eventInput.date,
            // }
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
            })
            return event.save().then(res => {
                console.log(res)
                return res
            }).catch(err => {
                console.log(err);
                throw err;
            });
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