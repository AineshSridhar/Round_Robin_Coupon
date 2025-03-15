import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"; // Add some styling

const App = () => {
   const [coupon, setCoupon] = useState(null);
   const [loading, setLoading] = useState(false);

   const claimCoupon = async () => {
      setLoading(true);
      try {
         const res = await axios.post(
            "https://round-robin-coupon-api.vercel.app/api/coupons/claim", 
            {}, 
            { 
               withCredentials: true,
               headers: {
                  "Content-Type": "application/json"
               }
            }
         );
         setCoupon(res.data.code);
         toast.success("Coupon claimed successfully!");
      } catch (err) {
         console.error("Error claiming coupon:", err);
         toast.error(err.response?.data?.message || "Error claiming coupon. Please try again later.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="container">
         <h1>Round-Robin Coupon Distribution</h1>
         <button 
            onClick={claimCoupon} 
            disabled={loading}
            className="claim-button"
         >
            {loading ? "Processing..." : "Claim Coupon"}
         </button>
         {coupon && <p className="coupon-display">Your Coupon: <span className="coupon-code">{coupon}</span></p>}
         <ToastContainer position="top-center" />
      </div>
   );
};

export default App;