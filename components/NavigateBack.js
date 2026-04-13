"use client";
import { usePathname } from "next/navigation";
import React from "react";

const NavigateBack = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname != "/login" && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            padding: "16px 20px",
            background: "var(--surface)",
          }}>
          <button className="icon-btn">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              flex: "1",
              marginLeft: "16px",
              color: "var(--text-main)",
            }}>
            {pathname[1].toUpperCase() + pathname.slice(2).split("/")[0]}
          </div>
        </nav>
      )}
    </>
  );
};

export default NavigateBack;
