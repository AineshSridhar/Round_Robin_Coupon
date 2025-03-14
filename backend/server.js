require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const couponRoutes = require("./routes/coupons");

const app = express();
app.use(cors({
    origin: "https://round-robin-coupon-rho.vercel.app",
    methods: ["GET", "POST"],
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/coupons", couponRoutes);

mongoose.connect('mongodb+srv://aineshsridhar:0ezLfNuZYnSUMyWa@cluster0.qpx9z.mongodb.net/roundrobin?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("MongoDB Connected"))
   .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
    res.send("Server is running...");
});
