import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import ShipmentManagement from "./pages/ShipmentManagement";
 import LiveTracking from "./pages/LiveTracking";
 import ModelInsights from "./pages/ModelInsights";
 import Settings from "./pages/Settings";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Enabled */}
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/prediction"
            element={<Prediction />}
          />

          
          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />
  
          <Route
            path="/shipment-management"
            element={<ShipmentManagement />}
          />

          <Route
            path="/live-tracking"
            element={<LiveTracking />}
          />

          <Route
            path="/model-insights"
            element={<ModelInsights />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;