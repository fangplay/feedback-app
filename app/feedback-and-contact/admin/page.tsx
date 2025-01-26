"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token); // Store token in localStorage
        router.push("/feedback-and-contact/admin/feedback-list");
      } else {
        const { message } = await response.json();
        setErrorMessage(message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AdminLogin;
