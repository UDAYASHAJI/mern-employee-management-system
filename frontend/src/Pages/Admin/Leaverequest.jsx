import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/ui/Sidebar';
import Header from '../../Components/ui/Header';
import Footer from '../../Components/ui/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Leaverequest() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave");
      if (response.data.success) {
        const leavesWithStatus = response.data.allreq.map(leave => ({
          ...leave,
          approval: leave.approval || "Pending"
        }));
        setLeaveRequests(leavesWithStatus);
      } else {
        console.error(response.data.message || "Failed to fetch leaves");
        toast.error(response.data.message || "Failed to fetch leaves");
      }
    } catch (err) {
      console.error("Error fetching leave requests:", err);
      toast.error("Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);


  const toggleApproval = async (leave) => {
    const newStatus = leave.approval === "Pending" ? "Approved" : "Pending";

    try {
      const res = await axios.put(`http://localhost:3000/api/leave/${leave._id}/approval`, {
        approval: newStatus
      });

      if (res.data.success) {
        toast.success(res.data.message || "Approval status updated");
        setLeaveRequests(prev =>
          prev.map(l => l._id === leave._id ? { ...l, approval: newStatus } : l)
        );
      }
    } catch (err) {
      console.error("Failed to update approval:", err);
      toast.error("Failed to update approval status");
    }
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/leave/${id}`);
      toast.success("Leave request deleted successfully");
      setLeaveRequests(prev => prev.filter(leave => leave._id !== id));
    } catch (err) {
      console.error("Failed to delete leave request:", err);
      toast.error("Failed to delete leave request");
    }
  };

  return (
    <div>
      <Sidebar />
      <Header />

      <div className="table-responsive table-container">
        {loading ? (
          <p className="text-center">Loading leave requests...</p>
        ) : (
          <table className="table-home">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Leave Start</th>
                <th>Leave End</th>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Approval</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((leave) => (
                  <tr key={leave._id}>
                    <td>{leave.name}</td>
                    <td>{leave.email}</td>
                    <td>{new Date(leave.datestart).toLocaleDateString()}</td>
                    <td>{new Date(leave.dateend).toLocaleDateString()}</td>
                    <td>{leave.leavetype}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${leave.approval === "Approved" ? "btn-success" : "btn-warning"}`}
                        onClick={() => toggleApproval(leave)}
                      >
                        {leave.approval}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(leave._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}

export default Leaverequest;



