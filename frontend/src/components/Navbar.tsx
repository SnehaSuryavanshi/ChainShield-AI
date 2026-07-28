import { FiBell, FiSearch, FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/navbar.css";

const pageInfo: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/": {
    title: "Dashboard",
    subtitle:
      "Welcome back! Here's your supply chain overview.",
  },

  "/prediction": {
    title: "Prediction",
    subtitle:
      "Predict shipment risk using the AI-powered prediction engine.",
  },

  "/analytics": {
    title: "Analytics",
    subtitle:
      "Analyze shipment performance and business insights.",
  },

  "/reports": {
    title: "Reports",
    subtitle:
      "Generate, export and manage shipment reports.",
  },

  "/shipment-management": {
    title: "Shipment Management",
    subtitle:
      "Manage and monitor all shipment records efficiently.",
  },

  "/live-tracking": {
    title: "Live Tracking",
    subtitle:
      "Track shipments in real time and monitor delivery progress.",
  },

  "/model-insights": {
    title: "Model Insights",
    subtitle:
      "Explore AI model performance and prediction statistics.",
  },

  "/settings": {
    title: "Settings",
    subtitle:
      "Manage your ChainShield AI platform preferences",
  },
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage =
    pageInfo[location.pathname] ?? {
      title: "ChainShield AI",
      subtitle: "Supply Chain Intelligence Platform",
    };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1>{currentPage.title}</h1>

        <p>{currentPage.subtitle}</p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <FiSearch />

          <input
            type="text"
            placeholder="Search shipments..."
          />
        </div>

        <button className="icon-btn">
          <FiBell />
        </button>

        <button
          className="icon-btn"
          onClick={() => navigate("/settings")}
          title="Settings"
        >
          <FiSettings />
        </button>

        <div className="profile">
          <FaUserCircle />

          <div>
            <h4>Alex</h4>

            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;