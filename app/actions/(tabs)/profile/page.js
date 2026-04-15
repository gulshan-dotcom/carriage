"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "@/stylesheet/user/profile.css";
import { useToast } from "@/components/ToastContext";
import { signOut } from "next-auth/react";
import { useUser } from "@/lib/useUser";

const Page = () => {
  const { Toast } = useToast();
  const { data, isLoading } = useUser();
  const user = data?.user;

  const [photo, setPhoto] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("userPhoto");

    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      setPhoto(base64);
      localStorage.setItem("userPhoto", base64);
    };
    reader.readAsDataURL(file);
  };

  const openEditSheet = () => {
    setEditNameValue(user?.name);
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const saveName = async () => {
    if (!editNameValue.trim()) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/updateName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editNameValue }),
      });

      if (!res.ok) {
        Toast.show(res.error);
      }
      mutate("/api/user");
    } catch (error) {
      console.error("Error updating name:", error);
      Toast.show("Failed to update name, please try again.");
    } finally {
      setIsSaving(false);
      closeSheet();
    }
  };

  const copyReferral = async () => {
    const refLink = `carriagepatch.app/ref/${user?._id}`;
    await navigator.clipboard.writeText(refLink);

    const btn = document.getElementById("copyAction");
    const icon = document.getElementById("copyIcon");

    if (btn && icon) {
      icon.textContent = "done";
      btn.style.background = "var(--green)";
      setTimeout(() => {
        icon.textContent = "content_copy";
        btn.style.background = "var(--accent-blue)";
      }, 2000);
    }
  };

  return (
    <div className="profile-container">
      <main className="scroll-content">
        <section className="profile-header">
          <div className="avatar-wrapper">
            <Image
              src={photo !== "" ? photo : "https://ui-avatars.com/api/?name=Aarav+Sharma"}
              alt="Profile"
              className="profile-img"
              id="userPhoto"
              width={150}
              height={150}
            />
            <label htmlFor="imgUp" className="camera-btn">
              <span className="material-symbols-rounded">photo_camera</span>
            </label>
            <input
              type="file"
              id="imgUp"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </div>

          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>

          <div className="plan-status-tag">
            <div className="status-dot"></div>
            {user?.plan.active === 0
              ? "Not Active"
              : user?.plan.active === 1
                ? "Free Plan"
                : user?.plan.active === 2
                  ? "Basic"
                  : "Pro"}{" "}
            • {user?.plan.active > 1 ? user?.plan.since.toLocaleDateString() : "N/A"}
          </div>
        </section>

        <div className="section-label">Interface</div>
        <div className="setting-card" onClick={openEditSheet} id="editInfoBtn">
          <div className="icon-box">
            <span className="material-symbols-rounded">palette</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">Appearance</div>
            <div className="setting-desc">Edit Name</div>
          </div>
        </div>

        <div className="section-label">Earning history</div>
        <Link href="/actions/history" className="setting-card">
          <div className="icon-box">
            <span className="material-symbols-rounded">history</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">History & Activities</div>
            <div className="setting-desc">View your earnings history</div>
          </div>
        </Link>

        <div className="setting-card" style={{ cursor: "default" }}>
          <div className="icon-box">
            <span className="material-symbols-rounded">share</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">Referral Link</div>
            <div className="setting-desc" id="refLink">
              carriagepatch.app/ref/
              {user?.name.toLowerCase().replace(/\s+/g, "")}
            </div>
          </div>
          <button
            className="copy-icon-btn"
            id="copyAction"
            onClick={copyReferral}>
            <span className="material-symbols-rounded" id="copyIcon">
              content_copy
            </span>
          </button>
        </div>

        <div className="section-label">Privacy & About</div>
        <div className="setting-card">
          <div className="icon-box">
            <span className="material-symbols-rounded">shield</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">Privacy Policy</div>
          </div>
        </div>

        <div className="setting-card">
          <div className="icon-box">
            <span className="material-symbols-rounded">description</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">Terms & Conditions</div>
          </div>
        </div>

        <div className="setting-card">
          <div className="icon-box">
            <span className="material-symbols-rounded">info</span>
          </div>
          <div className="setting-info">
            <div className="setting-title">About</div>
          </div>
        </div>

        <div
          className="logout-btn"
          onClick={() => signOut({ callbackUrl: "/" })}>
          <span className="material-symbols-rounded">logout</span>
          <span>Sign out</span>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link href="/actions/" className="nav-link">
          <div className="nav-icon-wrapper">
            <span className="material-symbols-rounded">home</span>
          </div>
          <span className="nav-label">Home</span>
        </Link>
        <Link href="/actions/leaderboard" className="nav-link">
          <div className="nav-icon-wrapper">
            <span className="material-symbols-rounded">leaderboard</span>
          </div>
          <span className="nav-label">Leaderboard</span>
        </Link>
        <Link href="/actions/profile" className="nav-link active">
          <div className="nav-icon-wrapper">
            <span className="material-symbols-rounded">person</span>
          </div>
          <span className="nav-label">Profile</span>
        </Link>
      </nav>

      {isSheetOpen && (
        <div
          className={`scrim ${isSheetOpen ? "show" : ""}`}
          onClick={closeSheet}></div>
      )}
      <div
        className={`bottom-panel ${isSheetOpen ? "show" : ""}`}
        id="editSheet">
        <div className="sheet-handle"></div>

        <h3>Edit Profile</h3>
        <p>Update your display name</p>

        <div className="edit-form">
          <input
            type="text"
            value={editNameValue}
            onChange={(e) => setEditNameValue(e.target.value)}
            placeholder="Full Name"
            className="input-field"
          />

          <button className="save-btn" onClick={saveName} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
