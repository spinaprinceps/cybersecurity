// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const clientModel = require("./models/Client");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://sharadsr69:sharad%40123@cluster0.vcqbw.mongodb.net/client")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Zod schema for validation
const signupSchema = z.object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// JWT secret key
const JWT_SECRET = "CYBER";

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// SignUp endpoint
app.post("/signup", async (req, res) => {
    try {
      // Validate input data
      const result = signupSchema.parse(req.body);
      const { email, password } = result;
  
      // Check if user already exists
      const existingUser = await clientModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user (without name)
      const newUser = new clientModel({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully", user: { email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    // Validate input data
    const result = loginSchema.parse(req.body);
    const { email, password } = result;

    // Check if user exists
    const user = await clientModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dashboard endpoint (protected route)
app.get("/dashboard", authenticateToken, (req, res) => {
  // Access granted only if the user is authenticated
  res.json({
    message: "Welcome to your dashboard",
    user: req.user,
  });
});

// Start the server
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
