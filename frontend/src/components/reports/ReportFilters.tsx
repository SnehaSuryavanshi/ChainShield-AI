import "./ReportFilters.css";

const ReportFilters = () => {
  return (
    <div className="report-filters-card">
      <div className="filters-header">
        <h3>Generate Reports</h3>
        <p>Filter and export logistics intelligence reports.</p>
      </div>

      <div className="filters-grid">

        <div className="filter-group">
          <label>Date Range</label>
          <input type="date" />
        </div>

        <div className="filter-group">
          <label>Risk Level</label>
          <select>
            <option>All Risks</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Transport Mode</label>
          <select>
            <option>All Modes</option>
            <option>Road</option>
            <option>Rail</option>
            <option>Air</option>
            <option>Sea</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Shipment ID</label>
          <input
            type="text"
            placeholder="Search shipment..."
          />
        </div>

      </div>

      <div className="filters-actions">
        <button className="generate-report-btn">
          📄 Generate Report
        </button>
      </div>
    </div>
  );
};

export default ReportFilters;