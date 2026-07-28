import { useEffect, useState } from "react";

import "./NotificationSettings.css";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
    highRisk: true,
    delivery: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem(
      "notificationSettings"
    );

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const toggle = (
    key: keyof typeof settings
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>🔔 Notifications</h2>

        <p>
          Configure how and when you receive alerts
          from ChainShield AI.
        </p>
      </div>

      <div className="notification-settings">

        <div className="notification-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive important updates via email.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.email}
              onChange={() => toggle("email")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>SMS Alerts</h4>
            <p>Receive critical shipment alerts by SMS.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.sms}
              onChange={() => toggle("sms")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Push Notifications</h4>
            <p>Get instant browser notifications.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.push}
              onChange={() => toggle("push")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>High Risk Shipment Alerts</h4>
            <p>Notify when AI detects risky shipments.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.highRisk}
              onChange={() => toggle("highRisk")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Delivery Completed Alerts</h4>
            <p>
              Receive confirmation after successful
              delivery.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.delivery}
              onChange={() => toggle("delivery")}
            />
            <span className="slider"></span>
          </label>
        </div>

      </div>
    </section>
  );
};

export default NotificationSettings;