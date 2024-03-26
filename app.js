const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event');
const User = require('./models/user'); 

const  bcrypt = require('bcryptjs')

const app = express();


app.use(bodyParser.json());


app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        },

        type User{
            _id: ID!
            email: String!
            password: String
        },

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        },

        input UserInput{
            email: String!
            password: String!
        },

        type RootQuery {
            events: [Event!]!

        },
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(UserInput: UserInput): User
        },
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
            .then(events => {
                return events.map(event => {
                    return { ...event._doc };
                });
            })
            .catch(err => {
                throw err;
            });
        },
        createEvent: (args) => {

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '660269ad0fa1593121759261' 

            });
            let createdEvent;
            return event
            .save()
            .then( result => {
                createdEvent = {...result._doc }
                return User.findById('660269ad0fa1593121759261')
                console.log(result);
              
            })
            .then(user => {
                if(!user){
                    throw new Error('User not found ');
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                console.log(result);
                throw err;
            });


        },
        createUser: args => {
            return User.findOne({ email: args.UserInput.email })
                .then(user => {
                    if (user) {
                        throw new Error('User exists already.');
                    }
                    return bcrypt.hash(args.UserInput.password, 12);
                })
                .then(hashedPassword => {
                    const user = new User({
                        email: args.UserInput.email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    return { ...result._doc, password: null, _id: result.id };
                })
                .catch(err => {
                    throw err;
                });
    
        
        // createUser: args => {
        //     User.findOne({ email: args.userInput.email}).then(user => {
        //         if(user){
        //             throw new Error('User exists already.')
        //         }
        //         return bcrypt
        //     .hash(args.UserInput.password, 12) // Note the capital 'U' in 'UserInput'

        //     })
        //     .then(hashedPassword => {
        //         const user = new User({
        //             email: args.UserInput.email, // Note the capital 'U' in 'UserInput'
        //             password: hashedPassword
        //         });
        //         return user.save();
        //     })
        //     .then(result => {
        //         return { ...result._doc, password: null,  _id: result.id }; // It's a good practice to not return the password, even if hashed
        //     })
        //     .catch(err => {
        //         throw err;
        //     });
        }
        

    },



    graphiql: true, // Enables GraphiQL interface
}));





mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.umo3vkl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
 