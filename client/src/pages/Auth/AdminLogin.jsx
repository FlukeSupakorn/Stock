import React, { useState } from "react";
import { LogoSVG } from "../../assets/images";
import axios from "axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3333/admin/auth/login",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "ok") {
        alert("Login Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        window.location = "/admin/products";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="font-noto bg-neutral">
      <div className="hero min-h-screen">
        <div className="hero-content w-full flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white">
            <img src={LogoSVG} className="max-w-sm rounded-lg" alt="Logo" />
            <h1 className="text-5xl font-bold mt-4">Login now!</h1>
            <p className="text-xl py-6">Join us and start selling today</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
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
                <button className="btn btn-accent">Login</button>
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

export default AdminLogin;
