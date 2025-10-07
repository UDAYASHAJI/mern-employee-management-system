import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../Components/ui/Sidebar'
import Header from '../../Components/ui/Header'
import Footer from '../../Components/ui/Footer'

function Leaverequest() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaves from backend
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave");
      if (response.data.success) {
        // Add default approval status if not provided
        const leavesWithStatus = response.data.allreq.map(leave => ({
          ...leave,
          approval: leave.approval || "Pending"
        }));
        setLeaveRequests(leavesWithStatus);
      } else {
        console.error(response.data.message || "Failed to fetch leaves");
      }
    } catch (err) {
      console.error("Error fetching leave requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Toggle approval status
  const toggleApproval = (index) => {
    setLeaveRequests(prev =>
      prev.map((leave, i) =>
        i === index
          ? { ...leave, approval: leave.approval === "Pending" ? "Approved" : "Pending" }
          : leave
      )
    );
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <Footer />

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
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.name}</td>
                    <td>{leave.email}</td>
                    <td>{new Date(leave.datestart).toLocaleDateString()}</td>
                    <td>{new Date(leave.dateend).toLocaleDateString()}</td>
                    <td>{leave.leavetype}</td>
                    <td>{leave.reason}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          leave.approval === "Approved" ? "btn-success" : "btn-warning"
                        }`}
                        onClick={() => toggleApproval(index)}
                      >
                        {leave.approval}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Leaverequest
