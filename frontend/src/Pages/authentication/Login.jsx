import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Spinner from "../../Components/ui/Spinner";
import img from "../../assets/img/login/login.jpeg";
import "../../assets/css/login.css";
import logo from "../../assets/img/login/WorkHub.png";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Footer from "../../Components/ui/Footer";
import Sidebar from "../../Components/ui/Sidebar";
import CustomToastContent from "../../Components/ui/CustomToast";
import { toast, ToastContainer } from "react-toastify";
import { MdSupportAgent } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";

function Login() {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      setTimeout(() => setLoader(false), 2000);

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });






        const result = await response.json().catch(() => ({}));
        if (result.success) {
          toast.success(
            <CustomToastContent
              type="success"
              message={result.message || "Login successful"}
            />
          );
          localStorage.setItem("loggedInUser", result.fullname);
          localStorage.setItem("loggedInemail", result.email);


          localStorage.setItem("token", result.jwtToken);
        
          console.log(result.name)
             setTimeout(() => navigate("/home"), 2000);
          
         
        } 
        else {
          toast.error(
            <CustomToastContent
              type="error"
              message={result.message || "Invalid email or password"}
            />
          );
        }
      } catch (err) {
        toast.error(
          <CustomToastContent
            type="error"
            message="Something went wrong. Please try again later."
          />
        );
      }
    },
  });

  return (
    <div>
      <div className="row g-0">
      
        <div className="col-12 col-md-6 left-section text-center p-0">
          <img src={img} alt="Welcome" className="login-img" />
          <div className="overlay-text px-4">
            <h1 className="mt-3">Welcome to your Personal Work Hub</h1>
            <p>
              Work Hub keeps all your employee details and helps you easily
              access the services.
            </p>
          </div>
        </div>

     
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div
            className="container-login w-100 d-flex flex-column justify-content-center"
            style={{ maxWidth: "400px", minHeight: "100vh" }}
          >
            <img
              src={logo}
              alt="Work Hub Logo"
              className="login-logo mx-auto mb-5"
            />

            <form onSubmit={formik.handleSubmit} className="login-form">
              <h1 className="login-h1 text-center mb-4">Login</h1>

              <div className="form-group mb-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control login-input"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Username"
                  style={{ paddingLeft: "35px" }}
                />
                <FaUser
                  style={{
                    color: "1e90bb",
                    position: "relative",
                    bottom: "27px",
                    left: "10px",
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger small">{formik.errors.email}</div>
                )}
              </div>

            
              <div className="form-group mb-4" style={{ position: "relative" }}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control login-input"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Password"
                  style={{ paddingLeft: "35px" }}
                />
                <FaLock
                  style={{
                    color: "1e90bb",
                    position: "relative",
                    bottom: "27px",
                    left: "10px",
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "55%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger small">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn login-button text-white w-100 mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {loader && <Spinner />}

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Sidebar />
    </div>
  );
}

export default Login;
