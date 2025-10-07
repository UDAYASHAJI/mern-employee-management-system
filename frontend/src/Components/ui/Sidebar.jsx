import React from "react";
import "../../assets/css/sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaLock, FaSignOutAlt, FaUserTie, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/");
  };

  return (
    <div>
      <div className="container-fluid sidebar">
        <div className="sidebar-content">
          <Link to="/home" className="row sidebar-content links-sidebar">
            <div className="col-md-2">
              <FaUserTie size={25} />
            </div>
            <div className="col-md-10">Employees</div>
          </Link>

          <Link to="/leave-request" className="row sidebar-content links-sidebar">
            <div className="col-md-2">
              <FaCog size={25} />
            </div>
            <div className="col-md-10"> Leave Requests</div>
          </Link>

          <Link to="/change-password" className="row sidebar-content links-sidebar">
            <div className="col-md-2">
              <FaLock size={25} />
            </div>
            <div className="col-md-10">Change Password</div>
          </Link>

          <div
            className="row sidebar-content links-sidebar"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="col-md-2">
              <FaSignOutAlt size={25} />
            </div>
            <div className="col-md-10">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
