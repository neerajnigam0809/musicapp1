/* eslint-disable jsx-a11y/anchor-is-valid */
// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import musicImage from "../Images/music.png";
import {SignupApi} from "../api/api"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Functional component for the Signup page
const Signup = (props) => {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
// State for handling signup form data
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
// Event handler for name input change
  function signupNameChange(e) {
    setsignup({ ...signup, name: e.target.value });
  }
// Event handler for email input change
  function signupEmailChange(event) {
    setsignup({ ...signup, email: event.target.value });
  }
// Event handler for mobile input change
  function signupMobileChange(event) {
    setsignup({ ...signup, mobile: event.target.value });
  }
// Event handler for password input change
  function signupPasswordChange(event) {
    setsignup({ ...signup, password: event.target.value });
  }

  // Function to handle signup form submission
  const signupSubmit = async (e) => {
    // Validation checks for empty fields

    if (
      signup.name === "" ||
      signup.email === "" ||
      signup.mobile === "" ||
      signup.password === ""
    ) {
      toast.error("please fill all the feilds", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate email field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signup.email)) {
      toast.error("Please enter a valid email address: xyz@gmail.com", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validate mobile field
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(signup.mobile)) {
      toast.error("Please enter  10 digit mobile number.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      // Call the SignupApi function to handle signup
      const response = await SignupApi({
        name: signup.name,
        email: signup.email,
        mobile: signup.mobile,
        password: signup.password,
      });

      if (response) {
        // Show success message, set redirect flag, and navigate to home
        toast.success("Signup successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        props.setrediect(true);
        navigate("/")
      }
    } catch (error) {
      // Show error message if signup fails
      toast.error("Signup Failed", {
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

  // JSX for the Signup component
  return (
    <div className="container-fluid">
      {/* ToastContainer for displaying notifications */}
     <ToastContainer />

     {/* Logo */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <img src={musicImage} alt="Logo" />
      </div>
      <div className="card mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          {isMobileView ? (
            <span className={styles.cardtitle}>
              Create Account <h6 className="m-0">Don't have an account?</h6>
            </span>
          ) : (
            <h5 className={styles.cardtitle}>Create Account</h5>
          )}
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={signup.name}
              onChange={signupNameChange}
            />
          </div>
          {/* Mobile Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={signup.mobile}
              onChange={signupMobileChange}
            />
          </div>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={signup.email}
              onChange={signupEmailChange}
            />
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="name" className={styles.formlabel}>
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={signup.password}
              onChange={signupPasswordChange}
            />
          </div>
           {/* Bottom Text */}
          <div className={styles.bottomtext}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply
          </div>
          {/* Continue Button */}
          <button
            className="btn btn-primary d-block mx-auto mb-3"
            style={{ backgroundColor: "#2E0052", width: "100%" }}
            onClick={signupSubmit}
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
      {/* Sign In Link */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        Already Have an account ? <a className={styles.anchor} onClick={()=>{navigate("/login")}}>Sign In</a>
      </div>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="text-center">Musicart | All rights reserved</div>
      </footer>
    </div>
  );
};


// Export the Signup component
export default Signup;