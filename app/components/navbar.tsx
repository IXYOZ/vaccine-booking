"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Span } from "next/dist/trace";

export default function Navbar() {
  const [phone, setPhone] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname(); //filter path has change all time

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPhone = localStorage.getItem("phone");
      const storedName = localStorage.getItem("name");
      setPhone(storedPhone);
      setName(storedName);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("phone");
    localStorage.removeItem("name");
    setPhone(null);
    setName(null);
    router.push("/");
  };

  return (
    <nav className=" bg-gray-900 text-white p-4 flex gap-4">
      <div className="container mx-auto justify-between flex gap-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          {phone && <Link href={"/dashboard"}>Dashboard</Link>}
          {phone === "admin" && <Link href="/admin">Admin</Link>}
          
        </div>
        <div className="flex items-center gap-5">
          {name && <span className="text-white">{name}</span>}
          {phone ? (
            <button
              onClick={handleLogout}
              className="bg-white text-black px-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="bg-white text-black px-2 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
