import { useEffect, useState } from "react";

import "./AISettings.css";

const AISettings = () => {
  const [settings, setSettings] = useState({
    riskPrediction: true,
    etaPrediction: true,
    routeOptimization: true,
    anomalyDetection: true,
    confidence: "85",
  });

  useEffect(() => {
    const saved = localStorage.getItem("aiSettings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "aiSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const toggle = (
    key:
      | "riskPrediction"
      | "etaPrediction"
      | "routeOptimization"
      | "anomalyDetection"
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>🤖 AI Configuration</h2>

        <p>
          Configure how the AI engine assists with shipment
          monitoring and risk analysis.
        </p>
      </div>

      <div className="ai-settings">

        <div className="ai-item">
          <div>
            <h4>Risk Prediction Engine</h4>
            <p>Enable AI-based shipment risk analysis.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.riskPrediction}
              onChange={() => toggle("riskPrediction")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="ai-item">
          <div>
            <h4>ETA Prediction</h4>
            <p>Use machine learning for accurate arrival estimates.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.etaPrediction}
              onChange={() => toggle("etaPrediction")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="ai-item">
          <div>
            <h4>Route Optimization</h4>
            <p>Recommend faster and safer delivery routes.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.routeOptimization}
              onChange={() => toggle("routeOptimization")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="ai-item">
          <div>
            <h4>Anomaly Detection</h4>
            <p>Detect unusual shipment behaviour automatically.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.anomalyDetection}
              onChange={() => toggle("anomalyDetection")}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="ai-item">
          <div>
            <h4>Prediction Confidence</h4>
            <p>
              Minimum confidence required before generating
              alerts.
            </p>
          </div>

          <select
            value={settings.confidence}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                confidence: e.target.value,
              }))
            }
          >
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="85">85%</option>
            <option value="90">90%</option>
            <option value="95">95%</option>
          </select>
        </div>

      </div>
    </section>
  );
};

export default AISettings;