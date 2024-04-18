import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";

const saltRounds = 10;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        (password) => password && password.length >= 6,
        "Password should be longer",
      ],
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    roleId: {
      type: String,
      enum: ["nurse", "patient"], // Enum for roleId
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("User", userSchema);

export default User;
