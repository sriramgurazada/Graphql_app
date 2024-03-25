const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

app.use(bodyParser.json());

// Corrected syntax for graphqlHTTP function invocation
app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`


        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        },

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        },

        type RootQuery {
            events: [Event!]!
        },
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        },
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(events);
            return event;
        }
    },
    graphiql: true, // Enables GraphiQL interface
}));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
 