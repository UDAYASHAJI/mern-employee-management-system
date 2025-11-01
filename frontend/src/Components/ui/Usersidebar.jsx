import React from "react";
import "../../assets/css/sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPaperPlane, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserSidebar() {
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

          <Link to="/profile" className="row sidebar-content links-sidebar">
            <div className="col-md-2">
              <FaUser size={25} />
            </div>
            <div className="col-md-10">Profile</div>
          </Link>

          <Link to="/leave" className="row sidebar-content links-sidebar">
            <div className="col-md-2">
              <FaPaperPlane size={25} />
            </div>
            <div className="col-md-10">Request Leave</div>
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

export default UserSidebar;
