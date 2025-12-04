import { useState } from "react";
import api from "../utils/api";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/products";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div class="login-container">
        <div class="overlay-box">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-field">
                    <input
                        type="email"
                        placeholder="Email"
                        autoComplete="true"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-btn" type="submit">Login</button>
            </form>
        </div>
    </div>
  );
}

export default Login;
