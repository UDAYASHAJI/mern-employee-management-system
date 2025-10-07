
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomToastContent from "../../Components/ui/CustomToast";
import axios from 'axios'


import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/signup.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../Components/ui/Spinner";

function Signup() {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Fullname required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    role: Yup.string().required("Role required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password required"),
    number: Yup.string().required("Contact number required"),
    address: Yup.string().required("Address required"),
    dob: Yup.string().required("Date of Birth required"),
  });
  

  const formik = useFormik({
    initialValues: {
    
      fullname: "",
      dob: "",
      address: "",
      number: "",
      email: "",
      role:"",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await axios.post("http://localhost:3000/api/signup", values);
        const data = response.data;
        console.log("Response:", data);
      
        if (data.success) {
          toast.success(
            <CustomToastContent
              type="success"
              message={data.message || "New Employee Added Successfully"}
            />
          );
          setTimeout(() => {
            setShow(false);
            navigate("/home");
            window.location.reload(); 
          }, 1500);
          
        } else {
          toast.error(data.message || "Signup failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Signup failed!");
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        fullscreen="md-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form onSubmit={formik.handleSubmit} className="signup-form">
            {loader && (
              <div className="text-center mb-3">
                <Spinner animation="border" />
              </div>
            )}

            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">FullName</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.errors.fullname && formik.touched.fullname && (
                  <div className="text-danger">{formik.errors.fullname}</div>
                )}
              </div>
      
            </div>

            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
              />
              {formik.errors.dob && formik.touched.dob && (
                <div className="text-danger">{formik.errors.dob}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                rows={3}
                name="address"
                placeholder="Enter your address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              ></textarea>
              {formik.errors.address && formik.touched.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.number}
              />
              {formik.errors.number && formik.touched.number && (
                <div className="text-danger">{formik.errors.number}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              />
              {formik.errors.role && formik.touched.role && (
                <div className="text-danger">{formik.errors.role}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmpassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassword}
              />
              {formik.errors.confirmpassword &&
                formik.touched.confirmpassword && (
                  <div className="text-danger">
                    {formik.errors.confirmpassword}
                  </div>
                )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-100 signup-button mt-3"
              disabled={loader}
            >
              {loader ? "Submitting..." : "Signup"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {loader && <Spinner />}

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default Signup;
