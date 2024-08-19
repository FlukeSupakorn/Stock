import React, { useState } from "react";
import { LogoSVG } from "../../assets/images";
import axios from "axios";

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("staff");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError(null);
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError(null);
    }

    const jsonData = {
      email,
      password,
      fname: firstName,
      lname: lastName,
      role,
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/admin/auth/register", // Correct endpoint
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Registration Successful");
        window.location = "/admin";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="font-noto bg-neutral">
      <div className="hero min-h-screen">
        <div className="hero-content w-full flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white">
            <img src={LogoSVG} className="max-w-sm rounded-lg" alt="Logo" />
            <h1 className="text-5xl font-bold mt-4">Register now!</h1>
            <p className="text-xl py-6">Join us and start selling today</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <span className="label-text-alt mt-2 text-red-500">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                  <span className="label-text-alt mt-2 text-red-500">
                    {confirmPasswordError}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="input input-bordered"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="staff">Staff</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="form-control mt-8">
                <button className="btn btn-accent">Register</button>
              </div>
              {error && (
                <div className="text-red-500 mt-4 text-center">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
