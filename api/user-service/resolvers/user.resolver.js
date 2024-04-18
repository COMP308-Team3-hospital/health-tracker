import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";

const jwtExpirySeconds = 86400;
const jwtSecretKey = config.secretKey;

const generateToken = (res, user) => {
  const token = jwt.sign({ username: user.username }, jwtSecretKey, {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: jwtExpirySeconds * 1000,
  });
};

const resolvers = {
  Query: {
    currentUser: (parent, args, { req }) => {
      const token = req.cookies.token;
      if (!token) {
        return null;
      }

      try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const { username } = decoded;
        return { username };
      } catch (error) {
        console.error("Error in currentUser resolver: ", error);
        return null;
      }
    },
  },

  Mutation: {
    signUp: async (parent, args, { req, res }) => {
      const { username, password, email, name, gender, age, roleId } = args;

      try {
        const user = await User.create({
          username,
          password,
          email,
          name,
          gender,
          age,
          roleId,
        });

        generateToken(res, user);

        return true;
      } catch (error) {
        console.error("Error in signUp resolver: ", error);
        return false;
      }
    },

    signIn: async (parent, args, { req, res }) => {
      const { username, password } = args;

      try {
        const user = await User.findOne({ username });

        if (!user) {
          return false;
        }

        const valid = user.authenticate(password);

        if (!valid) {
          return false;
        }

        generateToken(res, user);

        return true;
      } catch (error) {
        console.error("Error in signIn resolver: ", error);
        return false;
      }
    },

    signOut: (parent, args, { req, res }) => {
      res.clearCookie("token");
      return true;
    },
  },
};

export default resolvers;
