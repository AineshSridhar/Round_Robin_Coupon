import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
   const [coupon, setCoupon] = useState(null);

   const claimCoupon = async () => {
      try {
         const res = await axios.post("http://localhost:5000/api/coupons/claim", {}, { withCredentials: true });
         setCoupon(res.data.code);
         toast.success("Coupon claimed successfully!");
      } catch (err) {
         toast.error(err.response?.data?.message || "Error claiming coupon.");
      }
   };

   return (
      <div>
         <h1>Round-Robin Coupon Distribution</h1>
         <button onClick={claimCoupon}>Claim Coupon</button>
         {coupon && <p>Your Coupon: {coupon}</p>}
         <ToastContainer />
      </div>
   );
};

export default App;
