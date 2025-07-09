'use client'

import {format} from 'date-fns'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
interface Booking{
    id: number
    name: string
    datetime: string
    phone: string
    note?: string
    createAt: string
}

export default function AdminPage(){
    const [bookings, setBookings] = useState<Booking[]>([])
    const router = useRouter()
    useEffect(() =>{
        const admin = localStorage.getItem('admin')
        localStorage.setItem('admin','true')
        if(admin !== 'true'){
          alert('Welcome Admin')
          router.push('/dashboard')
        }
    })

    useEffect(() =>{
        const fetchBookings = async () =>{
            const res = await fetch('/api/booking')

            if(!res.ok){
                return
            }
            const data = await res.json()
            setBookings(data.bookings || [])
            // alert(data.message || 'Welcome Admin');
            
        }
        fetchBookings()
    },[])

    return(
        <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin - All Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li key={b.id} className="border border-gray-700 rounded p-4">
              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Phone:</strong> {b.phone}</p>
              <p><strong>Date:</strong> {format(new Date(b.datetime), 'dd MMM yyyy HH:mm')}</p>
              <p><strong>Note:</strong> {b.note}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
    )
}