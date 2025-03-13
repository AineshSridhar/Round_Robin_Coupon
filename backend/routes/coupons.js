const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const checkAbuse = require("../middleware/checkAbuse");
const ClaimRecord = require("../models/ClaimRecord");

router.post("/claim", checkAbuse, async (req, res) => {
   const userIP = req.ip;
   const sessionId = req.cookies.session || `session-${Date.now()}`;
   
   const coupon = await Coupon.findOneAndUpdate({ assigned: false }, { assigned: true }, { new: true });

   if (!coupon) return res.status(404).json({ message: "No coupons available." });

   await ClaimRecord.create({
      ip: userIP,
      session: sessionId,
      claimTime: new Date()
   });

   res.cookie("session", sessionId, { httpOnly: true, maxAge: 3600000 });
   res.json({ message: "Coupon claimed!", code: coupon.code });
});

module.exports = router;
