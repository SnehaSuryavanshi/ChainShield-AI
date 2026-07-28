import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getShipmentTrackingData } from "../../utils/trackingUtils";

import "./LiveTrackingMap.css";

/* ------------------------------------------------ */
/* Marker Factory */
/* ------------------------------------------------ */

const createTruckIcon = (selected: boolean) =>
  new L.DivIcon({
    html: `
      <div class="truck-marker ${selected ? "selected" : ""}">
        <div class="truck-marker-inner">
          🚚
        </div>
      </div>
    `,
    className: "",
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });

/* ------------------------------------------------ */
/* Fix Leaflet icons */
/* ------------------------------------------------ */

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ------------------------------------------------ */
/* Props */
/* ------------------------------------------------ */

interface LiveTrackingMapProps {
  shipments: any[];
  selectedShipment: any | null;
  onShipmentSelect: (shipment: any) => void;
}

/* ------------------------------------------------ */
/* Smooth Map Animation */
/* ------------------------------------------------ */

function MapFlyTo({
  shipment,
}: {
  shipment: any | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!shipment) return;

    const tracking = getShipmentTrackingData(shipment);

    map.flyTo(tracking.position, 7, {
      duration: 1.4,
      easeLinearity: 0.25,
    });
  }, [shipment, map]);

  return null;
}

/* ------------------------------------------------ */

const LiveTrackingMap = ({
  shipments,
  selectedShipment,
  onShipmentSelect,
}: LiveTrackingMapProps) => {
  const activeTrucks = shipments.length;

  const delayedShipments = shipments.filter(
    (shipment) => shipment["Prediction"] === 1
  ).length;

  const onTimeShipments =
    activeTrucks - delayedShipments;

  const onTimePercentage =
    activeTrucks > 0
      ? Math.round(
          (onTimeShipments / activeTrucks) * 100
        )
      : 0;

  const delayedPercentage =
    activeTrucks > 0
      ? Math.round(
          (delayedShipments / activeTrucks) * 100
        )
      : 0;

  return (
    <div className="tracking-map-card">
      <div className="tracking-map-header">
        <div>
          <h2>Live Fleet Tracking</h2>

          <p>
            Monitor shipment movement across regions in
            real time.
          </p>
        </div>

        <span className="live-badge">
          ● LIVE
        </span>
      </div>

      <div className="tracking-map-wrapper">
        <MapContainer
          center={[39.8283, -98.5795]}
          zoom={4}
          scrollWheelZoom
          className="tracking-map"
        >
          <TileLayer
            attribution="&copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          <MapFlyTo shipment={selectedShipment} />

          {/* Routes */}

          {shipments.map((shipment) => {
            const tracking =
              getShipmentTrackingData(shipment);

            const selected =
              selectedShipment?.["Order Id"] ===
              shipment["Order Id"];

            const color =
              shipment["AI Risk"] === "High"
                ? "#ef4444"
                : shipment["AI Risk"] === "Medium"
                ? "#f59e0b"
                : "#3b82f6";

            return (
              <Polyline
                key={`${shipment["Order Id"]}-route`}
                positions={[
                  tracking.originPosition,
                  tracking.destinationPosition,
                ]}
                pathOptions={{
                  color,
                  weight: selected ? 6 : 3,
                  opacity: selected ? 1 : 0.35,
                }}
              />
            );
          })}

          {/* Truck Markers */}

          {shipments.map((shipment) => {
            const tracking =
              getShipmentTrackingData(shipment);

            return (
              <Marker
                key={shipment["Order Id"]}
                position={tracking.position}
                icon={createTruckIcon(
                  selectedShipment?.["Order Id"] ===
                    shipment["Order Id"]
                )}
                eventHandlers={{
                  click: () =>
                    onShipmentSelect(shipment),
                }}
              />
            );
          })}
        </MapContainer>

        <div className="fleet-status-card">
          <div className="fleet-header">
            <div>
              <h3>Live Fleet Status</h3>
              <p>Updated just now</p>
            </div>

            <span className="fleet-live-dot"></span>
          </div>

          <div className="fleet-stat">
            <div className="fleet-top">
              <span>🚚 Active Shipments</span>
              <strong>{activeTrucks}</strong>
            </div>

            <div className="fleet-progress">
              <div
                className="fleet-progress-fill blue"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="fleet-stat">
            <div className="fleet-top">
              <span>✅ On Time</span>
              <strong>{onTimePercentage}%</strong>
            </div>

            <div className="fleet-progress">
              <div
                className="fleet-progress-fill green"
                style={{
                  width: `${onTimePercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="fleet-stat">
            <div className="fleet-top">
              <span>⚠ Delayed</span>
              <strong>{delayedPercentage}%</strong>
            </div>

            <div className="fleet-progress">
              <div
                className="fleet-progress-fill orange"
                style={{
                  width: `${delayedPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="fleet-stat">
            <div className="fleet-top">
              <span>📍 AI Tracking Coverage</span>
              <strong>100%</strong>
            </div>

            <div className="fleet-progress">
              <div
                className="fleet-progress-fill purple"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingMap;