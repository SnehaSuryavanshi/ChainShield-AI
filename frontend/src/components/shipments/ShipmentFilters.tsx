import "./ShipmentFilters.css";
import { Plus, Search } from "lucide-react";

interface ShipmentFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddShipmentClick: () => void;
}

const ShipmentFilters = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onAddShipmentClick,
}: ShipmentFiltersProps) => {
  return (
    <div className="shipment-filters-card">
      <div className="shipment-filters-header">
        <h3>Search & Filter Shipments</h3>

        <p>
          Quickly locate shipments using advanced filters and manage logistics
          operations efficiently.
        </p>
      </div>

      <div className="shipment-filters-grid">
        <div className="shipment-filter-group">
          <label>Search Shipment</label>

          <div className="search-input-wrapper">
            <Search
              size={18}
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Shipment ID, Customer, Origin..."
              value={searchTerm}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
            />
          </div>
        </div>

        <div className="shipment-filter-group">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Delivered">Delivered</option>
            <option value="In Transit">In Transit</option>
            <option value="Delayed">Delayed</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>

        <div className="shipment-filter-group">
          <label>Transport Mode</label>

          <select>
            <option>All Modes</option>
            <option>Road</option>
            <option>Rail</option>
            <option>Air</option>
            <option>Sea</option>
          </select>
        </div>

        <div className="shipment-filter-group">
          <label>Priority</label>

          <select>
            <option>All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
      </div>

      <div className="shipment-filter-actions">
        <button
  className="add-shipment-btn"
  onClick={onAddShipmentClick}
>
          <Plus size={18} />
          Add Shipment
        </button>
      </div>
    </div>
  );
};

export default ShipmentFilters;