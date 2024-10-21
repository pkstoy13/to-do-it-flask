"use client";
import { useEffect, useState } from "react";
import axios from "../../utils/axios"; // Adjust the import path if necessary
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/todos");
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        username,
        password,
      });
      // Optionally redirect after successful registration
      window.location.href = "/login"; // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col justify-around items-center">
      <h1 className="text-3xl p-2">Register</h1>
      <form onSubmit={handleRegister} className="space-y-2">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 pr-24  rounded-md bg-zinc-200"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 pr-24  rounded-md bg-zinc-200"
            placeholder="Password"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex justify-between">
          <button type="submit" className="hover:bg-slate-200 p-2">
            Register
          </button>
          <Link href="/" className="hover:bg-slate-200 p-2">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
