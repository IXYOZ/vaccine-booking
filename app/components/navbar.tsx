"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [phone, setPhone] = useState<string | null>(null);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname(); //filter path has change all time
  
  useEffect(() => {
    setPhone(localStorage.getItem("phone"))
    setIsLoaded(true);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("phone");
    setPhone(null);
    router.push("/");
  };

  return (
    <nav className=" bg-gray-900 text-white p-4 flex gap-4">
      <div className="container mx-auto justify-between flex gap-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          {/* <Link href="/booking">Book</Link> */}
          {/* <Link href="/dashboard">Dashboard</Link> */}
        </div>
        <div className="  text-black bg-white rounded">
          {!isLoaded ? null : phone ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
