import { useEffect, useState } from "react";

import "./MapSettings.css";

const MapSettings = () => {
  const [settings, setSettings] = useState({
    trafficLayer: true,
    satelliteView: false,
    shipmentRoutes: true,
    autoFollow: true,
    zoomLevel: "7",
  });

  useEffect(() => {
    const saved = localStorage.getItem("mapSettings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "mapSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const toggle = (
    key:
      | "trafficLayer"
      | "satelliteView"
      | "shipmentRoutes"
      | "autoFollow"
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>🗺️ Map Preferences</h2>

        <p>
          Customize your live tracking map and
          navigation preferences.
        </p>
      </div>

      <div className="map-settings">

        <div className="map-item">
          <div>
            <h4>Traffic Layer</h4>
            <p>
              Display live traffic conditions on
              the map.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.trafficLayer}
              onChange={() =>
                toggle("trafficLayer")
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="map-item">
          <div>
            <h4>Satellite View</h4>
            <p>
              Use satellite imagery instead of
              the standard map.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.satelliteView}
              onChange={() =>
                toggle("satelliteView")
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="map-item">
          <div>
            <h4>Show Shipment Routes</h4>
            <p>
              Display optimized delivery routes.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.shipmentRoutes}
              onChange={() =>
                toggle("shipmentRoutes")
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="map-item">
          <div>
            <h4>Auto Follow Selected Vehicle</h4>
            <p>
              Automatically center the map on
              the selected shipment.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={settings.autoFollow}
              onChange={() =>
                toggle("autoFollow")
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="map-item">
          <div>
            <h4>Default Zoom Level</h4>
            <p>
              Select the initial zoom level for
              the map.
            </p>
          </div>

          <select
            value={settings.zoomLevel}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                zoomLevel: e.target.value,
              }))
            }
          >
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>

      </div>
    </section>
  );
};

export default MapSettings;