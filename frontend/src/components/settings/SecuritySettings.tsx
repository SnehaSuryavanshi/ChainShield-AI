import { useEffect, useState } from "react";

import "./SecuritySettings.css";

const SecuritySettings = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("securitySettings");

    if (saved) {
      const parsed = JSON.parse(saved);
      setTwoFactor(parsed.twoFactor);
      setSessionTimeout(parsed.sessionTimeout);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "securitySettings",
      JSON.stringify({
        twoFactor,
        sessionTimeout,
      })
    );
  }, [twoFactor, sessionTimeout]);

  const handlePasswordChange = () => {
    const current = prompt("Enter current password");

    if (current === null) return;

    const newPassword = prompt(
      "Enter new password (minimum 8 characters)"
    );

    if (newPassword === null) return;

    if (newPassword.length < 8) {
      alert("Password must contain at least 8 characters.");
      return;
    }

    setPasswordChanged(true);

    setTimeout(() => {
      setPasswordChanged(false);
    }, 3000);
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>🔒 Security</h2>

        <p>
          Protect your account with advanced
          security settings.
        </p>
      </div>

      <div className="security-settings">

        <div className="security-item">
          <div>
            <h4>Password</h4>
            <p>Last changed 15 days ago</p>

            {passwordChanged && (
              <small
                style={{
                  color: "#22c55e",
                  display: "block",
                  marginTop: "6px",
                  fontWeight: 600,
                }}
              >
                ✓ Password updated successfully
              </small>
            )}
          </div>

          <button
            className="secondary-btn"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>
        </div>

        <div className="security-item">
          <div>
            <h4>Two-Factor Authentication</h4>
            <p>
              Add an extra layer of account
              security.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) =>
                setTwoFactor(e.target.checked)
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="security-item">
          <div>
            <h4>Session Timeout</h4>
            <p>
              Automatically log out inactive
              sessions.
            </p>
          </div>

          <select
            value={sessionTimeout}
            onChange={(e) =>
              setSessionTimeout(e.target.value)
            }
          >
            <option value="15">
              15 Minutes
            </option>

            <option value="30">
              30 Minutes
            </option>

            <option value="60">
              1 Hour
            </option>

            <option value="120">
              2 Hours
            </option>
          </select>
        </div>

        <div className="security-item">
          <div>
            <h4>Active Sessions</h4>
            <p>
              Devices currently logged into your
              account.
            </p>
          </div>

          <span className="status-chip online">
            2 Active
          </span>
        </div>

      </div>
    </section>
  );
};

export default SecuritySettings;