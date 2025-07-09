"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("")
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone,name }),
    });
    const text = await res.text()
    let data;

    try {
      data = JSON.parse(text)
    } catch (error) {
      data ={}
    }
    if (res.ok) {
      localStorage.clear();
      localStorage.setItem("name",data.name)
      localStorage.setItem("phone",data.phone) // Display OTP mock then redirect
      localStorage.setItem("role",data.role)
      
      if(data.role === "admin"){
        router.push("/admin")
        }else{
          router.push("/dashboard");
          
          }

    } else if (res.status === 404) {
      alert("User not found. Redirecting to register...");
      router.push(`/register?phone=${phone}`);
    } else {
      alert(data.message || "Login failed");
    }

  };
  return (
    <main className="">
      <h1>Login with Phone</h1>
      <form onSubmit={handleSubmit} className="py-2">
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 bg-black border border-gray-500 rounded"
          required
        />
        <button type="submit" className="bg-gray-400 rounded">Send OTP</button>
      </form>
      {msg && <p className="mt-4 text-green-500">{msg}</p>}
    </main>
  );
}
