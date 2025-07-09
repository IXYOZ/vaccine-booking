import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req:Request) {
    const {searchParams} = new URL(req.url)
    // const date = searchParams.get("date") //format: YYYY-MM-DD
    const start = searchParams.get("start")
    const end = searchParams.get("end")

    if(!start || !end){
        return NextResponse.json({message: "Missing date range"},{status: 400})
    }

    try {

        const bookings = await prisma.booking.findMany({
            where: {
                datetime:{
                    gte: start,
                    lte: end,
                }
            },
            select: {
                datetime: true
            }
        })
        const slots = bookings.map((b)=> {
            const dt = new Date(b.datetime)
            dt.setSeconds(0)
            dt.setMilliseconds(0)
            return dt.toISOString()
        })
        return NextResponse.json({slots})
    } catch (error) {
        return NextResponse.json({message: "Error fetching slots"},{status: 500})
    }
}