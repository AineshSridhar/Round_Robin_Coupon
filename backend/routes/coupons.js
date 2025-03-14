const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const checkAbuse = require("../middleware/checkAbuse");
const ClaimRecord = require("../models/ClaimRecord");

router.post("/claim", checkAbuse, async (req, res) => {
   try {
      const userIP = req.ip;
      const sessionId = req.cookies.session || `session-${Date.now()}`;

      // Find an unassigned coupon and mark it as assigned
      const coupon = await Coupon.findOneAndUpdate(
         { assigned: false },
         { assigned: true },
         { new: true }
      );

      if (!coupon) {
         return res.status(404).json({ message: "No coupons available." });
      }

      await ClaimRecord.create({
         ip: userIP,
         session: sessionId,
         claimTime: new Date()
      });

      res.cookie("session", sessionId, {
         httpOnly: true,
         secure: true, 
         sameSite: "None", 
         maxAge: 3600000
      });

      res.setHeader("Access-Control-Allow-Origin", "https://round-robin-coupon-rho.vercel.app");
      res.setHeader("Access-Control-Allow-Credentials", "true");

      res.json({ message: "Coupon claimed!", code: coupon.code });
   } catch (error) {
      console.error("Error processing claim:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
   }
});

module.exports = router;
