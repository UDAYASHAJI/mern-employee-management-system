// src/components/CustomToastContent.jsx
import React from 'react';
import logo from '../../assets/img/login/WorkHub.png'; // Assuming your alias is correctly configured
import '../../assets/css/custom-toast.css'; // Keep the CSS for internal layout of this component

const CustomToastContent = ({ message }) => {
  const displayMessage = message || "An unexpected message occurred."; // Extract message

  return (
    <div className="custom-toast-content-wrapper">
      <div className="custom-toast-logo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="custom-toast-message">
        <p>{displayMessage}</p>
      </div>
    </div>
  );
};

export default CustomToastContent;