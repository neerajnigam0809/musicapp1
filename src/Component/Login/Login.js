// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import musicImage from "../Images/music.png";
import { ToastContainer, toast } from "react-toastify";
import {LoginApi} from "../api/api"
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Functional component for the Login page
const Login = (props) => {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);

  // State for handling login form data
  const [Login, setLogin] = useState({
    email: "",
    password: "",
  });
// Event handler for email input change
  function LoginEmailChange(event) {
    setLogin({ ...Login, email: event.target.value });
  }
// Event handler for password input change
  function LoginPasswordChange(event) {
    setLogin({ ...Login, password: event.target.value });
  }

  // Function to handle login form submission
  const Loginsubmit = async (e) => {
    // Validation checks for email and password
    if (Login.email === "" || Login.password === "") {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
// Regular expressions for email and mobile number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
// Check if the entered email or mobile number is valid
    if (!emailRegex.test(Login.email) && !mobileRegex.test(Login.email)) {
      toast.error("Please enter a valid email address (e.g., xyz@gmail.com) or a 10-digit mobile number.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      // Call the LoginApi function to handle login
      const response = await LoginApi({
        email: Login.email,
        password: Login.password,
      });
      // If login is successful, set redirect flag and show success message
      if (response) {
        props.setrediect(true);
        toast.success("login successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Navigate to the home page
        navigate("/")
        
      }
    } catch (error) {
      // If login fails, show error message
      toast.error("Login Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
// useEffect hook to handle window resize and set mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767); 
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // JSX for the Login component
  return (
    <div className="container-fluid">
    <ToastContainer/>
    {/* Logo */}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <img src={musicImage} alt="Logo" />
      </div>
      {/* Login Form */}
      <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          {/* Conditional title based on mobile view */}
        {isMobileView ? (
          <div className="d-flex">
          <span className={styles.cardtitle}>
              Sign In 
            </span>
            <span><h6 className="ps-3 mt-2">Already a customer?</h6></span>
          </div>
            
          ) : (
            <h5 className={styles.cardtitle}>Create Account</h5>
          )}
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Enter your email or mobile number
            </label>
            <input type="text" className="form-control" id="name" value={Login.email}
                        onChange={LoginEmailChange} />
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Password
            </label>
            <input type="text" className="form-control" id="name"   value={Login.password}
                        onChange={LoginPasswordChange}/>
          </div>
          {/* Bottom Text */}
          <div className={styles.bottomtext}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply
          </div>
          {/* Submit Button */}
          <button
            className="btn btn-primary d-block mx-auto mb-3"
            style={{ backgroundColor: "#2E0052", width: "100%" }}
            onClick={Loginsubmit}
          >
            Continue
          </button>
           {/* Bottommost Text */}
          <div className={styles.bottommosttext}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </div>
        </div>
      </div>
      {/* New to Musiccart Section */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div style={{ width: "25rem ", display: "flex" }}>
          <hr className={styles.horizontalLine} /> New to Musiccart{" "}
          <hr className={styles.horizontalLine} />
        </div>
      </div>
      {/* Create Account Button */}
      <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <div className="d-flex justify-content-center align-items-center pt-3 pb-3 fs-5" onClick={()=>{navigate("/Signup")}}>
          {" "}
          Create your Musicart account
        </div>
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="text-center">Musicart | All rights reserved</div>
      </footer>
    </div>
  );
};

// Export the Login component
export default Login;