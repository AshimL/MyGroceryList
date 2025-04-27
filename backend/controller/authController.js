import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {

  try {
    const { username, password } = req.body

    //  Check if user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({
        message: "Username already taken"
      })
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user
    const newUser = new User({
      username,
      password: hashedPassword
    })

    // Save to db
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    // Respond with success
    res.status(201).json({
      message: "User Registered Sucessfully ",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    })
  }
};


//Login
export const login = async (req, res) => {

  try {
    const { username, password } = req.body

    //  Check if user  exists
    const existingUser = await User.findOne({ username })
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesnot exists"
      })
    }

    // Compare passwords

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: `Invalid credentails`
      })
    };


    // Create JWT Token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    )

    // Respond with the token
    res.status(200).json({
      message: "Login Successful ",
      token,
      user: {
        _id: existingUser._id,
        username: existingUser.username
      }

    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    })
  }
};
