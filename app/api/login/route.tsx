import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const body = await req.json()
    const {phone} = body

    // Normally: generate OTP, send SMS
    // Now: store in-memory/mock
    if(!phone){
        return NextResponse.json({message:"Phone number is required"}, {status: 400})
    }

    console.log(`Sending OTP to ${phone}`);

    return NextResponse.json({message: 'OTP sent (Mocked)'})

    
    
}