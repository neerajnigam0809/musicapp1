// /* eslint-disable jsx-a11y/anchor-is-valid */
// Import React and necessary dependencies
import React, { useEffect, useState } from "react";
import styles from "./Successfull.module.css"; // Import styles
import conti from "../Images/confetti.png";// Import confetti image
import musicImage from "../Images/music.png";// Import music image
import { useNavigate } from "react-router-dom";// Import useNavigate hook
import Home from "../Images/Home.png"; // Import home icon
import Carting from "../Images/Cart.png"; // Import cart icon
import Login from "../Images/person.png";  // Import login icon
import { ToastContainer, toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// Functional component for the Success page
const Successfull = () => {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
// Function to handle click on "Logout" link
  const LoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };


  // useEffect to check if the page is viewed on a mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth <= 767);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
   // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  // JSX for the Success component
  return (
    <div className="container-fluid p-0">
      {isMobileView ? (
        <>
          <div className={styles.mobileSearchBar}>
            <div className="ms-2 p-1">
              <img src={musicImage} alt="Logo" />
            </div>
            <div className={styles.musiccart} style={{ color: "white" }}>
              MusicCart
            </div>
          </div>
          <div
            className="d-flex justify-content-between fixed-bottom"
            style={{ backgroundColor: "white" }}
          >
            <div
              className="p-2 align-items-center"
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Home} alt="Logo" />
              <div className={styles.Home}>Home</div>
            </div>
            <div className="p-2 align-items-center">
              <img src={Carting} alt="Logo" />
              <div className={styles.Home}>Cart</div>
            </div>
            <div className="p-2  align-items-center" onClick={LoginClick}>
              <img src={Login} alt="Logo" />
              <div className={styles.Home}>Logout</div>
            </div>
          </div>
        </>
      ) : (
        /* Larger Screens */
        <div className="container-fluid p-0">
          <div className="d-flex mt-3 d-flex align-items-end">
            <div className="ms-3">
              <img src={musicImage} alt="Logo" />
            </div>
            <div className={styles.musiccart}>MusicCart</div>
          </div>
        </div>
      )}
      {/* Success Message */}
      {isMobileView ? (
        /* Mobile View Content */
        <>
          <div style={{ marginTop: "150px" }}>
            <div
              className="p-5"
              style={{
                border: "3px solid #E3E3E3",
                borderRadius: "11px",
                background: "#fff",
                boxShadow: "14px 16px 23px 2px rgba(0, 0, 0, 0.11)",
                maxWidth: "fit-content",
                margin: "0 auto",
              }}
            >
              <div>
                <div style={{ textAlign: "center" }}>
                  <img
                    style={{ height: "150px", width: "150px" }}
                    src={conti}
                    alt="Logo"
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Order is placed successfully!
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    color: "#969696",
                    fontWeight: "400",
                  }}
                >
                  You will be receiving a confirmation email with order details
                </div>
                <button
                  className="btn btn-primary mt-4"
                  style={{
                    backgroundColor: "#2E0052",
                    width: "90%",
                    display: "block",
                    margin: "0 auto",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go back to Home page
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Larger Screens Content */
        <div className={styles.container}>
          <div className={styles.contentbox}>
            <div
              className="d-flex flex-column p-5 "
              style={{
                border: "3px solid #E3E3E3",
                borderRadius: "11px",
                background: "#fff",
                boxShadow: "14px 16px 23px 2px rgba(0, 0, 0, 0.11)",
                marginLeft: "300px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <img src={conti} alt="Logo" />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "black",
                    fontWeight: "500",

                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  Order is placed successfully!
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: "#969696",
                    fontWeight: "400",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  You will be receiving a confirmation email with order details
                </div>
                <button
                  className="btn btn-primary  mt-4 ms-3"
                  style={{
                    backgroundColor: "#2E0052",
                    width: "90%",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go back to Home page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className={styles.footer}>
        <div className="text-center">Musicart | All rights reserved</div>
      </footer>
    </div>
  );
};
// Export the Successfull component
export default Successfull;