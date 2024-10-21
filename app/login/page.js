"use client";
import { useEffect, useState } from "react";
import axios from "../../utils/axios"; // Adjust the import path if necessary
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        username,
        password,
      });
      // Assuming the token is returned on successful login
      const token = response.data.access_token;
      localStorage.setItem("token", token); // Store the token as needed
      // Redirect or perform any other action after login
      router.push("/todos");
    } catch (err) {
      setError(err.response?.data.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col justify-around items-center">
      <h1 className="text-3xl p-2">Login</h1>
      <form onSubmit={handleLogin} className="space-y-2">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
            className="p-2 pr-24  rounded-md bg-zinc-200"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="p-2 pr-24 rounded-md bg-zinc-200"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex justify-between">
          <button type="submit" className="hover:bg-slate-200 p-2">
            Login
          </button>
          <Link href="/" className="hover:bg-slate-200 p-2">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
