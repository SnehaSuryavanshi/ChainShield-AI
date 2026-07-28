import { useEffect, useState } from "react";
import "./LiveTracking.css";

import { getShipments } from "../services/api";

import TrackingSummaryGrid from "../components/tracking/TrackingSummaryGrid";
import LiveTrackingMap from "../components/tracking/LiveTrackingMap";
import ShipmentTrackingTable from "../components/tracking/ShipmentTrackingTable";
import TrackingDetailsDrawer from "../components/tracking/TrackingDetailsDrawer";
import AITrackingInsights from "../components/tracking/AITrackingInsights";

const LiveTracking = () => {
  const [shipments, setShipments] = useState<any[]>([]);
  const [selectedShipment, setSelectedShipment] =
    useState<any | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function loadShipments() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error(
          "Failed to load shipments:",
          error
        );
      }
    }

    loadShipments();
  }, []);

  const handleShipmentSelect = (
    shipment: any
  ) => {
    setSelectedShipment(shipment);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div className="live-tracking-page">

      <button className="tracking-refresh-btn">
        Refresh Live Data
      </button>

      <TrackingSummaryGrid shipments={shipments} />

      <LiveTrackingMap
        shipments={shipments}
        selectedShipment={selectedShipment}
        onShipmentSelect={handleShipmentSelect}
      />

      <ShipmentTrackingTable
        shipments={shipments}
        onView={handleShipmentSelect}
        selectedShipment={selectedShipment}
      />

      <AITrackingInsights shipments={shipments} />

      <TrackingDetailsDrawer
        shipment={selectedShipment}
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
      />

    </div>
  );
};

export default LiveTracking;