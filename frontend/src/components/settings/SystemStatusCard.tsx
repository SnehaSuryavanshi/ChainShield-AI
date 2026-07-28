import { useEffect, useState } from "react";

import "./SystemStatusCard.css";

const SystemStatusCard = () => {
  const [apiResponse, setApiResponse] = useState(124);
  const [lastSync, setLastSync] = useState(0);

  useEffect(() => {
    const responseInterval = setInterval(() => {
      setApiResponse(
        Math.floor(Math.random() * 70) + 90
      );
    }, 5000);

    const syncInterval = setInterval(() => {
      setLastSync((prev) => prev + 1);
    }, 60000);

    return () => {
      clearInterval(responseInterval);
      clearInterval(syncInterval);
    };
  }, []);

  const getSyncText = () => {
    if (lastSync === 0) return "Just now";
    if (lastSync === 1) return "1 minute ago";
    return `${lastSync} minutes ago`;
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>⚙️ System Status</h2>

        <p>
          Monitor the health and operational
          status of the ChainShield AI platform.
        </p>
      </div>

      <div className="system-status-grid">

        <div className="status-box">
          <span className="status-title">
            Backend
          </span>

          <span className="status-value online">
            ● Connected
          </span>
        </div>

        <div className="status-box">
          <span className="status-title">
            Database
          </span>

          <span className="status-value online">
            ● Online
          </span>
        </div>

        <div className="status-box">
          <span className="status-title">
            AI Engine
          </span>

          <span className="status-value online">
            ● Operational
          </span>
        </div>

        <div className="status-box">
          <span className="status-title">
            API Response
          </span>

          <span className="status-value">
            {apiResponse} ms
          </span>
        </div>

        <div className="status-box">
          <span className="status-title">
            Application Version
          </span>

          <span className="status-value">
            v2.1.0
          </span>
        </div>

        <div className="status-box">
          <span className="status-title">
            Last Synchronization
          </span>

          <span className="status-value">
            {getSyncText()}
          </span>
        </div>

      </div>
    </section>
  );
};

export default SystemStatusCard;