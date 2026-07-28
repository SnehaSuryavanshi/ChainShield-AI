import {
  MdDashboard,
  MdAnalytics,
  MdSettings,
  MdInsights,
  MdAssessment,
  MdLocalShipping,
  MdOutlineLocationOn,
} from "react-icons/md";

import { FaChartLine } from "react-icons/fa";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: MdDashboard,
  },
  {
    title: "Prediction",
    path: "/prediction",
    icon: FaChartLine,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: MdAnalytics,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: MdAssessment,
  },
  {
    title: "Shipment Management",
    path: "/shipment-management",
    icon: MdLocalShipping,
  },
  {
    title: "Live Tracking",
    path: "/live-tracking",
    icon: MdOutlineLocationOn,
  },
  {
    title: "Model Insights",
    path: "/model-insights",
    icon: MdInsights,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: MdSettings,
  },
];