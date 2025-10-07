import React from 'react';
import '../../assets/css/leave.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomToastContent from "../../Components/ui/CustomToast";
import { toast, ToastContainer } from "react-toastify";



const initialValues = {
  name: "",
  email: "",
  datestart: "",
  dateend: "",
  leavetype: "",
  reason: ""
};

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
  const handleSubmit = async (values, { resetForm }) => {
    
    try {
      const res = await axios.post('http://localhost:3000/api/leave', values);



      if (res.status==201)
      {
         console.log("Submitted successfully", res.data);
    
    toast.success(res.data.message|| "Leave request submitted successfully...")
      resetForm();
      }
     



    } catch (err) {
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        alert("Server error: " + err.response.data.message);
      } else if (err.request) {
        console.error("No response received:", err.request);
        alert("No response from server. Possible CORS issue or server is down.");
      } else {
        console.error("Error setting up request:", err.message);
        alert("Error: " + err.message);
      }
    }
  };
  
  return (
    <div className="leave-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="leave-form">
          <h1>Leave Request</h1>

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
  );
}

export default Leave;
