// server/vitals-microservice.js

// Import necessary modules
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/emergency-alert-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define Emergency schema
const emergencySchema = new Schema({
  userId: String,
  description: String,
  status: String,
  dateCreated: { type: Date, default: Date.now },
});

const Emergency = model('Emergency', emergencySchema);

// Define GraphQL schema
const typeDefs = gql`

  type Emergency {
    id: ID!
    userId: String!
    description: String!
    status: String!
    dateCreated: String!
  }

  type Query {
    emergency: [Emergency]
  }

  type Mutation {
    addEmergency(userId: String!, description: String!, status: String!): Emergency
  }
`;

// Define GraphQL resolvers
const resolvers = {
  Query: {
    emergency: async (_, __, { user }) => {
      if (!user) throw new Error('You must be logged in');
      return await Emergency.find({});
    },
  },
  Mutation: {
    addEmergency: async (_, { userId, description, status }, { user }) => {
      if (!user) throw new Error('You must be logged in');
      const newEmergency = new Emergency({ userId, description, status });
      await newEmergency.save();
      return newEmergency;
    },
  },
};

// Initialize express and configure middleware
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'https://studio.apollographql.com'],
  credentials: true,
}));
app.use(cookieParser());

// Create and start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.cookies['token'];
    if (token) {
      try {
        const user = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
        return { user };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });
  app.listen({ port: 4003 }, () => console.log(`🚀 Server ready at http://localhost:4003${server.graphqlPath}`));
});
