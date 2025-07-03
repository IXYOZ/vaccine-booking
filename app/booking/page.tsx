'use client'

import Link from 'next/link'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TimeTable from '../components/TimeTable'
import { set } from 'date-fns'

export default function BookingPage() {
    const router = useRouter()
    const [successMsg, setSuccessMsg] = useState('')
    const [form,setForm] = useState({
    name:'',
    datetime:'',
    phone:'',
    note:'',
  })
  const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setForm({ ...form, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e: React.FormEvent)=>{
    e.preventDefault()

    const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // ✅ ใช้ C ใหญ่ ถูกต้อง
        },
        body: JSON.stringify(form),
      })
    
    const data = await res.json()
    if (res.status === 201){
      setSuccessMsg(data.message) // ถ้ามี message กลับมา
      console.log('Response',data)
      router.push('/dashboard')
    }else{
      alert(data.message || 'Error occurred')
    }
    
  }
  

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Book a Vaccine Appointment</h1>
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
              phone: '',
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
