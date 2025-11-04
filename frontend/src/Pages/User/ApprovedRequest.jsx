import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/leave.css';
import UserSidebar from '../../Components/ui/Usersidebar';
import Header from '../../Components/ui/Header';

function ApprovedRequest() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const userEmail = localStorage.getItem("email") || "";
        if (!userEmail) {
          toast.error("User email not found. Please log in again.");
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:3000/api/leave');

        if (res.status === 200) {
          const allRequests = res.data.allreq || [];
          const approved = allRequests.filter(
            (req) => req.email === userEmail && req.approval === "Approved"
          );
          setApprovedRequests(approved);
        } else {
          toast.warning("No approved requests found.");
        }
      } catch (err) {
        console.error("Error fetching approved requests:", err);
        if (err.response) {
          toast.error("Server error: " + err.response.data.message);
        } else if (err.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error("Error: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);


  const styles = {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)',
      padding: '40px 60px',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      maxWidth: '1000px',
      margin: '30px auto',
    },
    heading: {
      textAlign: 'center',
      color: '#0d47a1',
      fontWeight: 'bold',
      fontSize: '26px',
      marginBottom: '30px',
      borderBottom: '3px solid #64b5f6',
      paddingBottom: '10px',
    },
    tableWrapper: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#42a5f5',
      color: 'white',
      textAlign: 'center',
      padding: '12px',
    },
    td: {
      textAlign: 'center',
      padding: '12px',
      color: '#333',
    },
    rowHover: {
      backgroundColor: '#e3f2fd',
    },
    approvedText: {
      color: '#1b5e20',
      fontWeight: 'bold',
      backgroundColor: '#c8e6c9',
      borderRadius: '8px',
      padding: '4px 8px',
      display: 'inline-block',
    },
  };

  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#e1f5fe' }}>
      <UserSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />

        <div style={styles.container}>
          <h1 style={styles.heading}>Approved Leave Requests</h1>

          {loading ? (
            <p style={{ textAlign: 'center', color: '#0d47a1' }}>Loading approved requests...</p>
          ) : approvedRequests.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#0277bd' }}>No approved leave requests found.</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table} className="table table-bordered">
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Leave Type</th>
                    <th style={styles.th}>Start Date</th>
                    <th style={styles.th}>End Date</th>
                    <th style={styles.th}>Reason</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedRequests.map((req, index) => (
                    <tr
                      key={req._id || index}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f3faff' : 'white',
                        transition: '0.3s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#bbdefb')}
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f3faff' : 'white')
                      }
                    >
                      <td style={styles.td}>{index + 1}</td>
                      <td style={styles.td}>{req.name}</td>
                      <td style={styles.td}>{req.email}</td>
                      <td style={styles.td}>{req.leavetype}</td>
                      <td style={styles.td}>{req.datestart}</td>
                      <td style={styles.td}>{req.dateend}</td>
                      <td style={styles.td}>{req.reason}</td>
                      <td style={styles.td}>
                        <span style={styles.approvedText}>{req.approval}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </div>
      </div>
    </div>
  );
}

export default ApprovedRequest;
