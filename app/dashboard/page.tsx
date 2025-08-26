"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  id: number;
  name: string;
  datetime: string;
  phone: string;
  note?: string;
  createAt: string;
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [phone, setPhone] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    const storedName = localStorage.getItem("name")
    const storedRole = localStorage.getItem("role")
    console.log("Local phone", phone);
    
    if (!storedPhone || !storedRole) {
      router.push("/login");
      return;
    }

    setPhone(storedPhone)
    setRole(storedRole)
    setIsLoaded(true)

    const fetchBookings = async () => {
      const queryParam = storedRole === "admin"? "?role=admin":`?phone=${storedPhone}`;
      const res = await fetch(`/api/mock-booking${queryParam}`)
      const data = await res.json();
      setBookings(data.bookings || []);
    };
    fetchBookings();

  }, [router]);

  const handleCancel = async (id: number) => {
    const confirmed = confirm("Are you sure want to cancel this booking?");
    if (!confirmed) return;

    const res = await fetch(`/api/mock-booking/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBookings(bookings.filter((b) => b.id !== id));
      alert("Cancel succeed");
    } else {
      alert("Failed to cancel booking");
    }
  };

  if(!isLoaded)return <p className="text-white p-4">Loading...</p>
  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4"> My Appointments</h1>
      <div className="py-4">
      <button className="bg-white text-black rounded px-2 " >
        <Link href="/booking"> Book</Link>
      </button>
      </div>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="border border-gray-70 rounded p-4">
              <p>
                <strong>Name: </strong>
                {b.name}
              </p>
              <p>
                <strong>Phone: </strong>
                {b.phone}
              </p>
              <p>
                <strong>Note: </strong>
                {b.note}
              </p>
              <p>
                <strong>Date: </strong>
                {format(new Date(b.datetime), "dd MMM yyyy HH:mm")}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handleCancel(b.id);
                  }}
                  className="text-black hover: text-white-600 bg-white rounded"
                >
                  Cancel
                </button>
                <button className="bg-gray-600 text-white rounded px-3 py-1">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
    </main>
  );
}
