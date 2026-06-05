import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [contact, SetContact] = useState("");
  const [password, SetPassword] = useState("");
  const [confirm_password, SetConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          contact,
          password,
          confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    

      SetName("");
      SetEmail("");
      SetContact("");
      SetPassword("");
      SetConfirmPassword("");

      navigate("/login");
    } catch (error) {
    console.log(error)
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "650px" }}>
        <h3 className="text-center mb-3 fw-bold">CREATE ACCOUNT</h3>

        <hr />

        <form onSubmit={register}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">NAME *</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(value)) SetName(value);
                }}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">CONTACT *</label>
              <input
                type="text"
                maxLength={10}
                className="form-control"
                value={contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) SetContact(value);
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">EMAIL *</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">PASSWORD *</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">
                CONFIRM PASSWORD *
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  value={confirm_password}
                  onChange={(e) => SetConfirmPassword(e.target.value)}
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
          </div>

          <button className="btn btn-dark w-100 mt-2 fw-bold">
            REGISTER
          </button>
        </form>

        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-link text-decoration-none fw-bold"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>

          <button
            className="btn btn-link text-decoration-none fw-bold"
            onClick={() => navigate(-1)}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;