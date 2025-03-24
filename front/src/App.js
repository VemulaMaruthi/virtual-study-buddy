import React, { useState, useEffect } from "react";
import "./style.css"; // Ensure styles.css is inside src/

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle popup function
  const togglePopup = () => setPopupVisible(!isPopupVisible);
  const closePopup = () => setPopupVisible(false);

  // Email validation function
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      alert("❌ Invalid email format! Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      alert("❌ Password must be at least 6 characters long.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      alert(data.message);
  
      if (response.ok) {
        setIsLogin(true); // Switch to login after successful registration
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      alert("Failed to connect to the server. Ensure Flask is running.");
    }
  };
  



  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      alert("❌ Please enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      alert("❌ Password must be at least 6 characters!");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      alert(data.message);
  
      if (response.ok) {
        window.location.href = "login.html"; // Redirect on success
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Failed to connect to the server. Ensure Flask is running.");
    }
  };
  
  // Proceed with login if validation passes
  console.log("✅ Logging in with:", email, password);


  
  
  
  
  


  return (
    <div>
      <nav className="navbar">
        <a href="#" className="logo">
          <img src="logo.jpg" alt="logo" />
          <h2>Virtual Study Buddy</h2>
        </a>
        <ul className="links">
          <li><a href="#">Home</a></li>
          <li><a href="about.html">About us</a></li>
         
        </ul>
        <button className="login-btn" onClick={togglePopup}>SIGN IN</button>
      </nav>

      {/* Background Overlay (Click to Close Popup) */}
      {isPopupVisible && <div className="blur-bg-overlay" onClick={closePopup}></div>}

      {/* Popup Form */}
      <div className={`form-popup ${isPopupVisible ? "show" : ""} ${!isLogin ? "show-signup" : ""}`}>

        <span className="close-btn material-symbols-rounded" onClick={closePopup}>close</span>

        {isLogin ? (
          /* Login Form */
          <div className="form-box login">
            <div className="form-details">
              <h2>Welcome Back</h2>
              <p>Please log in using your personal information to start learning.</p>
            </div>
            <div className="form-content">
              <h2>LOGIN</h2>
              <form onSubmit={handleLogin} action="#">
                <div className="input-field">
                  <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Enter your Email</label>
                </div>
                <div className="input-field">
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label>Password</label>
                </div>
                <a href="#" className="forgot-pass-link">Forgot password?</a>
                <button type="submit">Log In</button>
              </form>
              <div className="bottom-link">
  {isLogin ? (
    <>Don't have an account?{" "}
      <a href="#" onClick={(e) => { 
        e.preventDefault(); 
        setEmail(""); // Reset fields
        setPassword(""); 
        setIsLogin(false);
        setPopupVisible(true); // Ensure popup remains visible
      }}>Signup</a>
    </>
  ) : (
    <>Already have an account?{" "}
      <a href="#" onClick={(e) => { 
       e.preventDefault(); 
       setEmail(""); // Reset fields
       setPassword(""); 
       setIsLogin(true);
       setPopupVisible(true); // Ensure popup remains visible
     }}>Login</a>
    </>
  )}
</div>

            </div>
          </div>
        ) : (
          /* Signup Form */
          <div className="form-box signup">
            <div className="form-details">
              <h2>Create Account</h2>
              <p>To become a part of our application, please sign up using your personal information.</p>
            </div>
            <div className="form-content">
              <h2>SIGNUP</h2>
              <form onSubmit={handleRegister} action = "#">
                <div className="input-field">
                  <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  <label>Enter your email</label>
                </div>
                <div className="input-field">
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  <label>Create password</label>
                </div>
                <div className="policy-text">
                  <input type="checkbox" id="policy" />
                  <label htmlFor="policy">
                    Remember Me
                  </label>
                </div>
                <button type="submit">Sign Up</button>
              </form>
              <div className="bottom-link">
                Already have an account?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>Login</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
