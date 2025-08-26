

import { NextRequest, NextResponse } from "next/server";

//Mock users
const mockUsers = [
    { name: "user1", phone: "0123456789", role: "user"},
    { name: "user2", phone: "0987654321", role: "user"},
]

export async function POST(req: Request){
    try {
        const {phone} = await req.json()
        if(!phone) return NextResponse.json({message: "Missing phone"},{status: 400})
        
        const user = mockUsers.find(u => u.phone === phone)
        if(!user) return NextResponse.json({message: "Login failed"}, {status: 404})

        return NextResponse.json({message: "Login Success", ...user})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Server error"},{status: 500})
        
    }
}