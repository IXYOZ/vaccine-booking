

import { NextResponse } from "next/server"

let mockBookings: any[] = []

export async function POST(req:Request) {
    
    try {
        const {name, phone, datetime,note} = await req.json()
        if(!name || !phone || !datetime){
            return NextResponse.json({message: "Missing fields"},{status:400})
        }

        const newBooking = {id: mockBookings.length +1, name, phone, datetime, note}
        mockBookings.push(newBooking)

        return NextResponse.json({message:"Booking successful", booking: newBooking})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Server error"},{status: 500})
        
    }
}

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const phone = searchParams.get("phone")

        let bookings = phone ? mockBookings.filter(b => b.phone === phone): mockBookings

        return NextResponse.json({bookings})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Failed to fetch bookings"},{status: 500})
        
    }
}