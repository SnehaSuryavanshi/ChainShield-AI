import "./ShipmentManagement.css";
import { useEffect, useState } from "react";

import { getShipments } from "../services/api";

import ShipmentsSummaryGrid from "../components/shipments/ShipmentsSummaryGrid";
import ShipmentFilters from "../components/shipments/ShipmentFilters";
import ShipmentsTable, {
  type Shipment,
} from "../components/shipments/ShipmentsTable";
import ShipmentStatusChart from "../components/shipments/ShipmentStatusChart";
import ShipmentDetailsModal from "../components/shipments/ShipmentDetailsModal";
import AddShipmentModal from "../components/shipments/AddShipmentModal";
import EditShipmentModal from "../components/shipments/EditShipmentModal";
import DeleteShipmentModal from "../components/shipments/DeleteShipmentModal";

const ShipmentManagement = () => {
  const [shipments, setShipments] =
    useState<Shipment[]>([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedShipment, setSelectedShipment] =
    useState<Shipment | null>(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      const data = await getShipments();

      const formattedShipments: Shipment[] =
        data.map((item: any) => {
          const backendStatus =
            item["Order Status"] ?? "";

          let status: Shipment["status"];

          switch (backendStatus) {
            case "COMPLETE":
            case "CLOSED":
              status = "Delivered";
              break;

            case "PROCESSING":
              status = "In Transit";
              break;

            case "PENDING":
            case "PENDING_PAYMENT":
            case "CANCELED":
              status = "Delayed";
              break;

            case "SUSPECTED_FRAUD":
              status = "High Risk";
              break;

            default:
              status = "Delayed";
          }

          return {
            id: String(item["Order Id"]),

            customer:
              item["Customer Country"] ??
              "Unknown",

            origin:
              item["Customer City"] ??
              "Unknown",

            destination:
              item["Order Region"] ??
              item["Customer City"] ??
              "Unknown",

            vehicle:
              item["Shipping Mode"] ??
              "N/A",

            risk:
              item["AI Risk"] === "High"
                ? "High"
                : item["AI Risk"] ===
                  "Medium"
                ? "Medium"
                : "Low",

            confidence: item["Confidence"],

            prediction: item["Prediction"],

            eta: "N/A",

            status,
          };
        });

      setShipments(formattedShipments);

      console.log(
        "Loaded shipments:",
        formattedShipments.length
      );
    } catch (error) {
      console.error(
        "Failed to load shipments:",
        error
      );
    }
  };

  const handleViewShipment = (
    shipment: Shipment
  ) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };

  const handleEditShipment = (
    shipment: Shipment
  ) => {
    setSelectedShipment(shipment);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (
    shipment: Shipment
  ) => {
    setSelectedShipment(shipment);
    setIsDeleteModalOpen(true);
  };

  const handleAddShipment = (
    shipment: Shipment
  ) => {
    setShipments((prev) => [
      ...prev,
      shipment,
    ]);
  };

  const handleUpdateShipment = (
    updatedShipment: Shipment
  ) => {
    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === updatedShipment.id
          ? updatedShipment
          : shipment
      )
    );

    setIsEditModalOpen(false);
  };

  const handleDeleteShipment = () => {
    if (!selectedShipment) return;

    setShipments((prev) =>
      prev.filter(
        (shipment) =>
          shipment.id !== selectedShipment.id
      )
    );

    setSelectedShipment(null);

    setIsDeleteModalOpen(false);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const filteredShipments =
    shipments.filter((shipment) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        shipment.id
          .toLowerCase()
          .includes(search) ||
        shipment.customer
          .toLowerCase()
          .includes(search) ||
        shipment.origin
          .toLowerCase()
          .includes(search) ||
        shipment.destination
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        shipment.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  console.log(
    "Current shipments:",
    shipments.length
  );

  return (
    <div className="shipment-management-page">

      <ShipmentsSummaryGrid
        shipments={shipments}
      />

      <ShipmentFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={
          setSearchTerm
        }
        onStatusChange={
          setStatusFilter
        }
        onAddShipmentClick={() =>
          setIsAddModalOpen(true)
        }
      />

      <ShipmentsTable
        shipments={filteredShipments}
        onViewShipment={
          handleViewShipment
        }
        onEditShipment={
          handleEditShipment
        }
        onDeleteShipment={
          handleDeleteClick
        }
      />

      <ShipmentStatusChart
        shipments={shipments}
      />

      <ShipmentDetailsModal
        shipment={selectedShipment}
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      />

      <AddShipmentModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onAddShipment={
          handleAddShipment
        }
      />

      <EditShipmentModal
        isOpen={isEditModalOpen}
        shipment={selectedShipment}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        onUpdateShipment={
          handleUpdateShipment
        }
      />

      <DeleteShipmentModal
        isOpen={
          isDeleteModalOpen
        }
        shipment={selectedShipment}
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
        onConfirm={
          handleDeleteShipment
        }
      />

    </div>
  );
};

export default ShipmentManagement;