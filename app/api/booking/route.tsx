// app/api/booking/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function POST(req: Request) {
    
    try{
        
        const body = await req.json()
        console.log('BODY HERE',body);
        
        
        
        const {name,datetime,phone,note} = body
        if(!name || !datetime || !phone || !note){
            return NextResponse.json({message:'Missing required field'},{status:400})
        }

        const booking = await prisma.booking.create({
            data: {name,datetime, phone,note}
        })
        console.log('here');
        return NextResponse.json({message: 'Booking saved', booking}, {status: 201})
    }catch(err: any){
        console.log('API error',err);
        return NextResponse.json({message:'Something went wrong'},{status:500})
    }
}
// ✅ เพิ่มใน route.ts (ต่อจาก POST)

    export async function GET() {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { datetime: 'asc' },
      })
  
      return NextResponse.json({ bookings })
    } catch (err) {
      console.error('GET /api/booking error', err)
      return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
  }