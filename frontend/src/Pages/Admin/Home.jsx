import { useState, useEffect } from "react";
import Sidebar from "../../Components/ui/Sidebar";
import Header from "../../Components/ui/Header";
import Footer from "../../Components/ui/Footer";
import Signup from "../authentication/Signup";
import EditEmployee from "./EditEmployee"; 
import "../../assets/css/signup.css";
import axios from "axios";

function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showEdit, setShowEdit] = useState(false); 
  const [employeeToEdit, setEmployeeToEdit] = useState(null); 
  const [employees, setEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/users/${employeeToDelete._id}`);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setShowEdit(true);
  };


  const toggleStatus = async (id) => {
    try {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id
            ? { ...emp, status: emp.status === "Active" ? "Inactive" : "Active" }
            : emp
        )
      );

      await axios.put(`http://localhost:3000/api/users/${id}/status`);
    } catch (err) {
      console.error("Error toggling status", err);
    }
  };

  return (
    <div>
      <Sidebar />
      <Header />

      <div className="container">
        <h3 style={{ marginLeft: "500px" }}>View Employees</h3>
      </div>

      <div className="container d-flex justify-content-end mt-4">
        <button
          type="button"
          className="btn btn-primary signup-button"
          onClick={() => setShowSignup(true)}
        >
          Add Employee
        </button>
      </div>

    
      <div className="table-responsive table-container">
        <table className="table-home">
          <thead>
            <tr>
              <th className="bg-light">Employee Name</th>
              <th className="bg-light">Address</th>
              <th className="bg-light">Contact No</th>
              <th className="bg-light">Email</th>
              <th className="bg-light">DOB</th>
              <th className="bg-light">Role</th>
              <th className="bg-light">Actions</th>
              <th className="bg-light">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.fullname || emp.name}</td>
                  <td>{emp.address || "-"}</td>
                  <td>{emp.number || "-"}</td>
                  <td>{emp.email}</td>
                  <td>{emp.dob ? new Date(emp.dob).toLocaleDateString() : "-"}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => confirmDelete(emp)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        emp.status === "Active" ? "btn-success" : "btn-secondary"
                      }`}
                      onClick={() => toggleStatus(emp._id)}
                    >
                      {emp.status === "Active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showSignup && (
        <Signup
          show={showSignup}
          onHide={() => {
            setShowSignup(false);
            fetchEmployees();
          }}
        />
      )}

      {showEdit && (
        <EditEmployee
          show={showEdit}
          employee={employeeToEdit} 
          onHide={() => setShowEdit(false)}
          onUpdated={fetchEmployees} 
        />
      )}

 
      {showDeleteModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>
                  Do you want to delete{" "}
                  {employeeToDelete?.firstname || employeeToDelete?.name}?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
