// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';


const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tipsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for tips
const tipSchema = new mongoose.Schema({
  content: String,
  date: Date
});

// Create model from the schema
const Tip = mongoose.model('Tip', tipSchema);

// Define GraphQL type definitions
const typeDefs = `
  type Tip {
    _id: ID!
    content: String!
    date: String!
  }

  type Query {
    tips: [Tip]
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    tips: async () => {
      return await Tip.find();
    }
  }
};

// Initialize ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply the Apollo Server to the Express application
await server.start();
server.applyMiddleware({ app });

// Handle user login request
app.post('/login', async (req, res) => {
  try {
    // Retrieve all tips from the database
    const allTips = await Tip.find();

    // Generate a random index to pick a random tip
    const randomIndex = Math.floor(Math.random() * allTips.length);

    // Get the randomly selected tip
    const randomTip = allTips[randomIndex];

    // Send the random tip as a response
    res.json({ tip: randomTip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve a random tip' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
