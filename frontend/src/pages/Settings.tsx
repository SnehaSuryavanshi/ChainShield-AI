import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";

import "./Settings.css";

import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AISettings from "../components/settings/AISettings";
import MapSettings from "../components/settings/MapSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import SystemStatusCard from "../components/settings/SystemStatusCard";

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    }, 1000);
  };

  return (
    <div className="settings-page">

      <div className="settings-header">

        <button
          className="save-settings-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>

      </div>

      <div className="settings-grid">
        <ProfileSettings />
        <SecuritySettings />
        <NotificationSettings />
        <AISettings />
        <MapSettings />
        <AppearanceSettings />
        <SystemStatusCard />
      </div>

      {saved && (
        <div className="toast-success">
          <CheckCircle size={18} />
          Settings saved successfully!
        </div>
      )}

    </div>
  );
};

export default Settings;