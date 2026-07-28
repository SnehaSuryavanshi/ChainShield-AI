import { useEffect, useState } from "react";

import "./ProfileSettings.css";

const defaultProfile = {
  fullName: "Alex Johnson",
  email: "alex@chainshield.ai",
  role: "Platform Administrator",
  organization: "ChainShield Logistics",
  phone: "+91 98765 43210",
};

const ProfileSettings = () => {
  const [profile, setProfile] =
    useState(defaultProfile);

  useEffect(() => {
    const saved = localStorage.getItem(
      "profileSettings"
    );

    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "profileSettings",
      JSON.stringify(profile)
    );
  }, [profile]);

  const initials = profile.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const updateField = (
    key: keyof typeof profile,
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>👤 Profile</h2>

        <p>
          Manage your personal information and
          account details.
        </p>
      </div>

      <div className="profile-settings">

        <div className="profile-avatar">
          <div className="avatar-circle">
            {initials}
          </div>

          <button
            className="secondary-btn"
            onClick={() =>
              alert(
                "Photo upload will be available in a future version."
              )
            }
          >
            Change Photo
          </button>
        </div>

        <div className="profile-form">

          <div className="settings-field">
            <label>Full Name</label>

            <input
              type="text"
              value={profile.fullName}
              onChange={(e) =>
                updateField(
                  "fullName",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Email Address</label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Role</label>

            <input
              type="text"
              value={profile.role}
              onChange={(e) =>
                updateField(
                  "role",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Organization</label>

            <input
              type="text"
              value={profile.organization}
              onChange={(e) =>
                updateField(
                  "organization",
                  e.target.value
                )
              }
            />
          </div>

          <div className="settings-field">
            <label>Phone Number</label>

            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProfileSettings;