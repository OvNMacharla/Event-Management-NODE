const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index')
const graphQLResolver = require('./graphql/resolvers/index')

const app = express()
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.USER}:EvxDF80V4FszfWoN@cluster0.arzsg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
}
)