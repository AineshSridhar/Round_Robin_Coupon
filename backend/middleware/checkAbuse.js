const ClaimRecord = require("../models/ClaimRecord");

const checkClaimTime = async (userIP, sessionID) => {
    const lastClaim = await Promise.race([
        ClaimRecord.findOne({ $or: [{ ip: userIP }, { session: sessionID }] }).sort({ claimTime: -1 }),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Database timeout")), 3000)) // 3s timeout
    ]);
    
    if (!lastClaim) {
        return res.status(500).json({ message: "Server is busy, try again later." });
    }

    console.log("Last Claim Record:", lastClaim);
    return lastClaim ? new Date(lastClaim.claimTime).getTime() : null;
};


const checkAbuse = async (req, res, next) => {
    const { cookies } = req;
    const userIP = req.ip;

    const lastClaimTime = await checkClaimTime(userIP, cookies.session);
    if (lastClaimTime && Date.now() - lastClaimTime < 3600000) {
       return res.status(429).json({ message: "Wait before claiming another coupon." });
    }
 
    next();
};

module.exports = checkAbuse;
