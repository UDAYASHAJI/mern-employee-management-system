import React, { useEffect, useState } from 'react';
import '../../assets/css/leave.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import UserSidebar from '../../Components/ui/Usersidebar';
import Header from '../../Components/ui/Header';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  datestart: Yup.date().required("Start date is required"),
  dateend: Yup.date()
    .required("End date is required")
    .min(Yup.ref('datestart'), "End date cannot be before start date"),
  leavetype: Yup.string().required("Leave type is required"),
  reason: Yup.string().required("Reason is required"),
});

function Leave() {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    datestart: "",
    dateend: "",
    leavetype: "",
    reason: ""
  });

  useEffect(() => {
    const userName = localStorage.getItem("loggedInUser") || "";
    const userEmail = localStorage.getItem("email") || "";
    setInitialValues(prev => ({ ...prev, name: userName, email: userEmail }));
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('http://localhost:3000/api/leave', values);
      if (res.status === 201) {
        toast.success(res.data.message || "Leave request submitted successfully...");
        resetForm();
      }
    } catch (err) {
      if (err.response) {
        toast.error("Server error: " + err.response.data.message);
      } else if (err.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Error: " + err.message);
      }
    }
  };

  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', minHeight: '100vh' }}>
     
      <UserSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        <Header />

        <div
          className="leave-form-container"
          style={{
            flex: 1,
            padding: '40px 60px',
            maxWidth: '900px',
            margin: '20px auto',
            width: '100%',
          }}
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="leave-form">
              <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Leave Request</h1>

              <div className="form-group">
                <label>Name:</label>
                <Field type="text" name="name" placeholder="Enter your name" className="form-control"/>
                <ErrorMessage name="name" component="div" className="error"/>
              </div>

              <div className="form-group">
                <label>Email:</label>
                <Field type="email" name="email" placeholder="Enter your email" className="form-control"/>
                <ErrorMessage name="email" component="div" className="error"/>
              </div>

              <div className="form-group">
                <label>Leave Start:</label>
                <Field type="date" name="datestart" className="form-control"/>
                <ErrorMessage name="datestart" component="div" className="error"/>
              </div>

              <div className="form-group">
                <label>Leave End:</label>
                <Field type="date" name="dateend" className="form-control"/>
                <ErrorMessage name="dateend" component="div" className="error"/>
              </div>

              <div className="form-group">
                <label>Leave Type:</label>
                <Field as="select" name="leavetype" className="form-control">
                  <option value="">Select leave type</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="leavetype" component="div" className="error"/>
              </div>

              <div className="form-group">
                <label>Reason:</label>
                <Field as="textarea" name="reason" placeholder="Enter reason" className="form-control"/>
                <ErrorMessage name="reason" component="div" className="error"/>
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </Form>
          </Formik>

          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </div>
      </div>
    </div>
  );
}

export default Leave;
