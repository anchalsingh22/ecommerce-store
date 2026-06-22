const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("DB ERROR:", err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Model
const User = mongoose.model("User", UserSchema);
const OrderSchema = new mongoose.Schema({
    product: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", OrderSchema);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Register Page
app.get("/register.html", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});
app.get("/cart.html", (req, res) => {
    res.sendFile(__dirname + "/cart.html");
});

// Form Submit
app.post("/submit", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        console.log("USER SAVED:", user);

        res.send("User Saved Successfully");
    } catch (err) {
        console.log("SAVE ERROR:", err);
        res.send("Error Saving User");
    }
});

// Server Start
app.get("/place-order", async (req, res) => {

    try {

        const order = new Order({
            product: "Watch",
            price: 999
        });

        await order.save();

        res.send("Order Placed Successfully");

    } catch (err) {

        console.log(err);

        res.send("Order Failed");
    }

});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


    





