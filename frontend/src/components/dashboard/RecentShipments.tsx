import "./RecentShipments.css";

interface Shipment {
  "Order Id": number;
  "Customer City": string;
  "Customer Country": string;
  "Order Status": string;
  "AI Risk": string;
}

interface RecentShipmentsProps {
  shipments: Shipment[];
}

const RecentShipments = ({ shipments }: RecentShipmentsProps) => {
  return (
    <div className="recent-shipments">
      <div className="table-header">
        <h2>Recent Shipments</h2>
        <button>View All</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Route</th>
            <th>AI Risk</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((item) => (
            <tr key={item["Order Id"]}>
              <td>{item["Order Id"]}</td>

              <td>
                {item["Customer City"]} → {item["Customer Country"]}
              </td>

              <td>{item["AI Risk"]}</td>

              <td>{item["Order Status"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentShipments;