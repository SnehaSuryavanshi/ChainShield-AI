import { NavLink } from "react-router-dom";
import { navigation } from "../data/navigation";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      <div className="logo-section">

        <div className="logo-circle">
          CS
        </div>

        <div>
          <h2>ChainShield</h2>
          <span>AI Platform</span>
        </div>

      </div>

      <nav>

        {navigation.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >

              <Icon size={22} />

              <span>{item.title}</span>

            </NavLink>
          );

        })}

      </nav>

    </aside>
  );
};

export default Sidebar;