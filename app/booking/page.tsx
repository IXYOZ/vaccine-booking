'use client'

import Link from 'next/link'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TimeTable from '../components/TimeTable'
import { set } from 'date-fns'

export default function BookingPage() {
    const router = useRouter()
    const [isSelf,setIsSelf] = useState(true)
    const [phone, setPhone] = useState<string>()
    const [form,setForm] = useState({
    name:'',
    datetime:'',
    phone:'',
    note:'',
  })
  useEffect(() => {
    const storePhone = localStorage.getItem("phone") || "";
    const name = localStorage.getItem("name") || "";

    if(storePhone) setPhone(storePhone)
    const askBookingFor = async () => {
      // const isSelf = window.confirm("are you want to booking for yourself?");
      if (isSelf) {
        setForm((prev) => ({ ...prev, name, phone: storePhone }));
      } else {
        setForm((prev) => ({ ...prev, name: '', phone: '' }));
      }
    };
    // askBookingFor();
  }, [isSelf]);

  const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setForm({ ...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, datetime, note } = form;
  
    console.log("Submitting:", { name, phone, datetime, note });
  
    const res = await fetch("/api/mock-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, datetime, note }),
    });
  
    const data = await res.json();
    console.log("Response:", data);
  
    if (res.ok) {
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
      await router.push("/login");
    } else {
      alert("Registration/Booking failed: " + data.message);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      {!phone && <p className='text-sm text-red-500'>Not member? we'll register you automatically!</p>}
        <h1 className="text-2xl font-bold mb-4">Book a Vaccine Appointment</h1>
      {/* Toggle */}
      <div className="flex items-center space-x-2 mb-4">
        <label className="text-white font-medium">For yourself</label>
        <input
          type="checkbox"
          checked={isSelf}
          onChange={(e) => setIsSelf(e.target.checked)}
          className="w-5 h-5"
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-500 rounded"
          required
        />
        <TimeTable onSelect={(datetime) => setForm({...form,datetime})}></TimeTable>
        
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-500 rounded"
        />
        <textarea
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-500 rounded"
        />
        <button
          type="submit"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          Submit
        </button>
        <Link href={'/'}>
            <span className="inline-block bg-white text-black px-4 py-2 rounded hover:bg-gray-300 cursor-pointer">
            Cancel
            </span>
        </Link>
        <button
          type="button"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
          onClick={() =>
            setForm({
              name: '',
              datetime: '',
              phone:'',
              note: '',
            })
          }
        >
          Clear
        </button>
      </form>
      {/* {successMsg && (
    <div className="text-green-500 mt-2">{successMsg}</div>
)} */}

    </div>
    
  )
}