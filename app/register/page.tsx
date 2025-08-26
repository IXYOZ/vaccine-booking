"use client";

import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  // const searchParams = useSearchParams()
  // const initialPhone = searchParams.get('phone') || ''
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
  
    if (res.ok || res.status === 409) {
      // บันทึกลง localStorage เพื่อใช้ตอน booking
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      localStorage.setItem("role", "user");
      
      // ไปต่อที่ dashboard
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert("Registration failed: " + data.message);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Register to Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 text-white rounded border-white"
          />
        </div>
        <div>
          <label className=" mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 text-white rounded border-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200"
        >
          Submit
        </button>
      </form>
    </main>
  );
}