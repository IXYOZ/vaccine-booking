

import { NextResponse } from "next/server"

//let bookedSlots: string[] = ["2025-09-01T09:00", "2025-09-01T10:00"]

export async function GET() {

    const now = new Date()

    const plus15 = new Date(now.getTime() + 15 * 60 * 1000)
    const plus60 = new Date(now.getTime() + 60 * 60 * 1000)

    const bookedSlots = [
        plus15.toISOString().slice(0,16),
        plus60.toISOString().slice(0.16),
    ]

    return NextResponse.json({bookedSlots})
}