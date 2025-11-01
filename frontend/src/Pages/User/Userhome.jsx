import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../Components/ui/Usersidebar";
import Header from "../../Components/ui/Header";
import '../../assets/css/Userhome.css'

function Userhome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          setError("No user logged in. Redirecting to login...");
          setTimeout(() => (window.location.href = "/login"), 2000);
          return;
        }

        const res = await axios.get(`http://localhost:3000/api/users/${encodeURIComponent(email)}`);
        if (!res.data || !res.data.email) {
          setError("User profile not found. Please login again.");
          return;
        }

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile", err);
        setError("Failed to load user profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  const displayRole = user?.role || localStorage.getItem("role") || "user";

  return (
    <div className="userhome-wrapper">
      <UserSidebar />
      <div className="userhome-content">
        <Header />
        <div className="profile-container">
          <h2>Welcome  {user.fullname || "-"}</h2> 

          <div className="profile-item">
            <strong>Full Name:</strong> {user.fullname || "-"}
          </div>
          <div className="profile-item">
            <strong>Email:</strong> {user.email || "-"}
          </div>
          <div className="profile-item">
            <strong>Role:</strong> {displayRole}
          </div>
          <div className="profile-item">
            <strong>Address:</strong> {user.address || "-"}
          </div>
          <div className="profile-item">
            <strong>Contact Number:</strong> {user.number || "-"}
          </div>
          <div className="profile-item">
            <strong>DOB:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
          </div>
          <div className="profile-item">
            <strong>Status:</strong>
            <span
              className={`status-dot ${
                user.status === "Active" ? "status-active" : "status-inactive"
              }`}
            ></span>
            {user.status || "Active"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userhome;
