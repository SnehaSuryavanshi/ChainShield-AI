import { useEffect, useState } from "react";

import "./AppearanceSettings.css";

const AppearanceSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [compactLayout, setCompactLayout] =
    useState(false);
  const [accentColor, setAccentColor] =
    useState("Blue");
  const [density, setDensity] =
    useState("Comfortable");

  useEffect(() => {
    const savedDark =
      localStorage.getItem("darkMode");
    const savedCompact =
      localStorage.getItem("compactLayout");
    const savedAccent =
      localStorage.getItem("accentColor");
    const savedDensity =
      localStorage.getItem("dashboardDensity");

    if (savedDark !== null)
      setDarkMode(savedDark === "true");

    if (savedCompact !== null)
      setCompactLayout(savedCompact === "true");

    if (savedAccent)
      setAccentColor(savedAccent);

    if (savedDensity)
      setDensity(savedDensity);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      String(darkMode)
    );

    localStorage.setItem(
      "compactLayout",
      String(compactLayout)
    );

    localStorage.setItem(
      "accentColor",
      accentColor
    );

    localStorage.setItem(
      "dashboardDensity",
      density
    );

    // Theme hook for future expansion
    document.body.dataset.theme = darkMode
      ? "dark"
      : "light";

    // Layout hook
    document.body.dataset.layout = compactLayout
      ? "compact"
      : "comfortable";

    // Accent hook
    document.body.dataset.accent = accentColor;

    // Density hook
    document.body.dataset.density = density;
  }, [
    darkMode,
    compactLayout,
    accentColor,
    density,
  ]);

  return (
    <section className="settings-card">
      <div className="settings-card-header">
        <h2>🎨 Appearance</h2>

        <p>
          Personalize the interface and customize
          your dashboard experience.
        </p>
      </div>

      <div className="appearance-settings">

        <div className="appearance-item">
          <div>
            <h4>Dark Mode</h4>

            <p>
              Use the dark theme across the
              application.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) =>
                setDarkMode(
                  e.target.checked
                )
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="appearance-item">
          <div>
            <h4>Compact Layout</h4>

            <p>
              Reduce spacing for a denser
              dashboard view.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={compactLayout}
              onChange={(e) =>
                setCompactLayout(
                  e.target.checked
                )
              }
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="appearance-item">
          <div>
            <h4>Accent Color</h4>

            <p>
              Select the primary color used
              throughout the interface.
            </p>
          </div>

          <select
            value={accentColor}
            onChange={(e) =>
              setAccentColor(
                e.target.value
              )
            }
          >
            <option>Blue</option>
            <option>Emerald</option>
            <option>Purple</option>
            <option>Orange</option>
          </select>
        </div>

        <div className="appearance-item">
          <div>
            <h4>Dashboard Density</h4>

            <p>
              Choose how much information is
              displayed on screen.
            </p>
          </div>

          <select
            value={density}
            onChange={(e) =>
              setDensity(
                e.target.value
              )
            }
          >
            <option>Compact</option>
            <option>Comfortable</option>
            <option>Spacious</option>
          </select>
        </div>

      </div>
    </section>
  );
};

export default AppearanceSettings;