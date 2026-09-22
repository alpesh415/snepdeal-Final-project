const mongoose = require("mongoose");

const db = mongoose.connection;

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/snepdeal";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error.message);
    });

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = db;