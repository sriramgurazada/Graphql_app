**GraphQL Event Management API**

This is a GraphQL-based backend application that manages events and users using Node.js, Express, and MongoDB. It allows users to create events, register, and interact with the application through GraphQL queries and mutations. Authentication is handled with hashed passwords, and the app leverages MongoDB as its database.

**Features**

**GraphQL API:** Simplifies client-server communication through a schema-based query language.
**Event Creation:** Allows authenticated users to create, view, and manage events.
**User Registration:** Users can register and log in, with password hashing for security.
**MongoDB Database:** Stores user and event data persistently.
**bcrypt:** Passwords are hashed and stored securely in MongoDB.
**Error Handling:** Provides meaningful errors for easy debugging.


**Table of Contents**

Installation
Project Structure
Usage
GraphQL API Endpoints
Configuration
License
Installation

**Prerequisites**

Node.js (v12 or later)
MongoDB Atlas account for cloud MongoDB setup
Environment variables:
MONGO_USER
MONGO_PASSWORD
MONGO_DB

Steps

Clone the repository

git clone https://github.com/sriramgurazada/Graphql_app.git
cd Graphql_app
Install dependencies
npm install

Set up MongoDB Atlas

Create a MongoDB Atlas account and cluster.

Obtain your MongoDB URI.
Add your MongoDB credentials to a .env file.
Set environment variables Create a .env file in the root directory and add the following:
MONGO_USER=yourMongoUser
MONGO_PASSWORD=yourMongoPassword
MONGO_DB=yourDatabaseName
Run the application
npm start

The application will start on http://localhost:3000.

Project Structure

Graphql_app/
├── models/                 # Mongoose models for MongoDB
│   ├── event.js            # Schema for Event
│   └── user.js             # Schema for User
├── app.js                  # Main application file
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables
└── README.md               # Documentation

Mongoose Models
User Model: Represents users with email and password.
Event Model: Represents events with fields for title, description, price, and date.
Usage

**Starting the Application**
After configuring the environment variables and installing dependencies, start the server:

npm start
Open http://localhost:3000/graphql in your browser to access the GraphQL playground and test queries and mutations.

**GraphQL API Endpoints**

Schema Overview
The GraphQL schema defines the following types and operations:

Types

**Event: Represents an event.**
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
}

**User: Represents a user.**
type User {
    _id: ID!
    email: String!
    password: String
}

**EventInput: Input type for creating an event.**
input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

**UserInput: Input type for creating a user.**
input UserInput {
    email: String!
    password: String!
}

**Queries and Mutations**

RootQuery: Fetches events.
type RootQuery {
    events: [Event!]!
}
RootMutation:**Creates users and events.**
type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(UserInput: UserInput): User
}

Example Queries and Mutations
**Fetch All Events**
query {
    events {
        _id
        title
        description
        price
        date
    }
}

**Create a New Event**
mutation {
    createEvent(eventInput: {
        title: "GraphQL Workshop",
        description: "An introduction to GraphQL",
        price: 29.99,
        date: "2024-11-15T10:00:00.000Z"
    }) {
        _id
        title
        description
    }
}

**Register a New User**
mutation {
    createUser(UserInput: {
        email: "user@example.com",
        password: "securePassword123"
    }) {
        _id
        email
    }
}

**Configuration**

To modify settings or add additional functionality:

app.js: Main application file. Handles GraphQL setup and defines root query and mutation functions.
models/: Folder containing Mongoose schemas for Event and User.
Environment Variables:
Set MongoDB credentials in .env as described in the Installation section.
Code Highlights

**Error Handling**
Each GraphQL resolver is wrapped in error handling logic to ensure that meaningful errors are thrown in case of issues.
Password Hashing
Uses bcryptjs to hash user passwords before saving them to MongoDB, enhancing security.
MongoDB Integration
Mongoose models are used to interact with MongoDB, allowing for schema-based data validation.

**Future Enhancements**

Token-Based Authentication: Implement JWT to protect routes and ensure that only authenticated users can create events.
Enhanced Event Management: Add more features, such as event registration, updating, and deleting.
Advanced Filtering: Allow users to filter events based on criteria like date or price range.
Improved Error Messages: Provide more detailed error messages for easier debugging.
License

This project is licensed under the MIT License.

