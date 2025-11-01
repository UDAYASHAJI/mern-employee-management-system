import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Spinner from "../../Components/ui/Spinner";
import img from "../../assets/img/login/login.jpeg";
import "../../assets/css/login.css";
import logo from "../../assets/img/login/WorkHub.png";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Sidebar from "../../Components/ui/Sidebar";
import CustomToastContent from "../../Components/ui/CustomToast";
import { toast, ToastContainer } from "react-toastify";

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

      // 🔹 1️⃣ Default Admin Login Check
      if (
        values.email === "admin@webhub" &&
        values.password === "Admin@123"
      ) {
        localStorage.setItem("email", "admin@webhub");
        localStorage.setItem("fullname", "Administrator");
        localStorage.setItem("role", "admin");
        localStorage.setItem("token", "default-admin-token");

        toast.success(
          <CustomToastContent
            type="success"
            message="Admin login successful"
          />
        );

        setLoader(false);
        setTimeout(() => navigate("/home"), 1000);
        return; // ✅ stop here, no backend call needed
      }

      // 🔹 2️⃣ Normal API Login Flow
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          values
        );
        const result = response.data;
        console.log("Login response:", result);

        if (!result.success) {
          toast.error(
            <CustomToastContent
              type="error"
              message={result.message || "Invalid email or password"}
            />
          );
          setLoader(false);
          return;
        }

        // Ensure email exists
        const emailToStore =
          result.email || (result.role === "admin" ? "admin@webhub" : null);
        if (!emailToStore) {
          toast.error(
            <CustomToastContent
              type="error"
              message="Login failed. Email missing from response."
            />
          );
          setLoader(false);
          return;
        }

        // Save info
        localStorage.setItem("email", emailToStore);
        localStorage.setItem("fullname", result.fullname || "Admin");
        localStorage.setItem("role", result.role || "user");
        localStorage.setItem("token", result.jwtToken || "");

        toast.success(
          <CustomToastContent
            type="success"
            message={result.message || "Login successful"}
          />
        );

        // Redirect based on role
        setTimeout(() => {
          if (result.role === "admin") navigate("/home");
          else navigate("/profile");
        }, 1000);
      } catch (err) {
        console.error("Login error:", err);
        toast.error(
          <CustomToastContent
            type="error"
            message="Something went wrong. Please try again later."
          />
        );
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <div>
      <div className="row g-0">
        {/* Left Section */}
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

        {/* Right Section - Login Form */}
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

              {loader && (
                <div className="text-center mb-3">
                  <Spinner />
                </div>
              )}

              {/* Email Field */}
              <div className="form-group mb-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control login-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Email"
                  style={{ paddingLeft: "35px" }}
                />
                <FaUser
                  style={{
                    color: "#1e90bb",
                    position: "relative",
                    bottom: "27px",
                    left: "10px",
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger small">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group mb-4" style={{ position: "relative" }}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control login-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Password"
                  style={{ paddingLeft: "35px" }}
                />
                <FaLock
                  style={{
                    color: "#1e90bb",
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
                disabled={loader}
              >
                {loader ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Sidebar />
    </div>
  );
}

export default Login;
