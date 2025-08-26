"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OTP from "../components/OTP";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  const [mockOTP, setMockOTP] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/mock-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, name }),
    });
    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (error) {
      data = {};
    }
    if (res.ok) {
      localStorage.clear();
      localStorage.setItem("name", data.name);
      localStorage.setItem("phone", data.phone); // Display OTP mock then redirect
      localStorage.setItem("role", data.role);

      //mock
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setMockOTP(otp);

      alert(`Your OTP is ${otp}`);
      setShowOTP(true);

      ///////////////////////////////////////
      // if(data.role === "admin"){
      //   router.push("/admin")
      //   }else{
      //     router.push("/dashboard");

      //    }
    } else if (res.status === 404) {
      alert("User not found. Redirecting to register...");
      router.push(`/register?phone=${phone}`);
    } else {
      alert(data.message || "Login failed");
    }
  };

  const handleVerifyOTP = (inputOtp: string) => {
    if (inputOtp === mockOTP) {
      const role = localStorage.getItem("role");
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      alert("Invalid OTP");
    }
  };
  return (
    <main className=" text-center py-2">
      <h1>Login with Phone</h1>

      {!showOTP && (
        <form onSubmit={handleSendOTP} className="py-2">
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-l p-2 text-center bg-black border border-gray-500 rounded"
            required
          />
          <div className="py-2">
            <button type="submit" className="bg-gray-400 rounded">
              Send OTP
            </button>
          </div>
          <div className="text-green-400">For mock up phone number</div>
          <div>0123456789</div>
          <div>0987654321</div>
        </form>
      )}

      {showOTP && <OTP onVerify={handleVerifyOTP} />}
      {msg && <p className="mt-4 text-green-500">{msg}</p>}
    </main>
  );
}
