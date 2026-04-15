"use client";

import Link from "next/link";
import "@/stylesheet/user/plans.css";
// import { useEffect } from "react";
import { useToast } from "@/components/ToastContext";
import { mutate } from "swr";
import { useState } from "react";

export default function PlansPage() {
  //   useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       console.log("User likely switched to UPI app");
  //     } else {
  //       console.log("User returned to site");
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  const { Toast } = useToast();

  const [showDialoge, setShowDialoge] = useState(false)

  const handleBuyClick = async (planCode) => {
    let res = await fetch("/api/purchasePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ planCode }),
    });

    if (!res.ok) {
      Toast.show("Something went wrong.");
      return;
    }
    
    mutate("/api/user");
    setShowDialoge(true);
  };

  return (
    <div className="plans-container">
      <main className="scroll-content">
        <header className="plans-header">
          <p className="subtitle">Maximize your earnings with a Pro limit.</p>
        </header>

        <section className="plan-card">
          <h3 className="plan-name">Basic</h3>

          <div className="plan-price">
            <h2>₹199</h2>
            <span>/ 7 days</span>
          </div>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              1GB Data Selling Limit
            </li>
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              Regular Payout Speed
            </li>
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              Standard Support
            </li>
          </ul>

          <Link
            href="upi://pay?pa=carriagepatch.pvt.ltd@okicici&pn=CarriagePatch%20PVT%20LTD&am=199.00&cu=INR"
            className="buy-link">
            <button
              className="buy-btn btn-outline"
              onClick={() => handleBuyClick(2)}>
              Buy Now
            </button>
          </Link>
        </section>

        <section className="plan-card premium">
          <div className="badge-recommended">Recommended</div>

          <h3 className="plan-name pro">Pro</h3>

          <div className="plan-price">
            <h2>₹299</h2>
            <span>/ 7 days</span>
          </div>

          <ul className="feature-list">
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              <b>5GB Data Selling Limit</b>
            </li>
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              Faster Payouts
            </li>
            <li className="feature-item">
              <span className="material-symbols-rounded">check_circle</span>
              Priority Support
            </li>
          </ul>

          <Link
            href="upi://pay?pa=carriagepatch.pvt.ltd@okicici&pn=CarriagePatch%20PVT%20LTD&am=299.00&cu=INR"
            className="buy-link">
            <button
              className="buy-btn btn-filled"
              onClick={() => handleBuyClick(3)}>
              Buy Now
            </button>
          </Link>
        </section>
      </main>

      <div className={`dialog-overlay ${showDialoge ? "show" : ""}`} id="activationDialog">
        <div className="dialog">
          <h3 className="dialog-title">Payment Successful</h3>
          <p className="dialog-msg">
            Payment successful. Your new plan will be <b>activated tomorrow</b>
            at 12:00 AM.
          </p>
          <div className="dialog-actions">
            <Link href="/actions/home">
              <button className="text-button">Got it</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
