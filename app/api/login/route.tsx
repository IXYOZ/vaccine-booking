import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Find existing user by phone
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      return NextResponse.json({ message: "Login Failed" }, { status: 404 });
    } else {
      return NextResponse.json({
        message: "User found",

        name: user.name,
        phone: user.phone,
        role: user.role,
      });
    }
    // 2. If not found, create new user (auto-register)
    // if (!user) {
    //   user = await prisma.user.create({
    //     data: {
    //       name,
    //       phone,
    //       role: "user", // default role
    //     },
    //   });
    // }

    // 3. Create booking linked to the user
    // const booking = await prisma.booking.create({
    //   data: {
    //     name,
    //     phone,
    //     datetime: new Date(datetime),
    //     note,
    //     userId: user.id,
    //   },
    // });

    return NextResponse.json({ message: "Booking successful" });
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    let bookings;
    if (phone) {
      bookings = await prisma.booking.findMany({
        where: { phone },
        orderBy: { datetime: "asc" },
      });
    } else {
      bookings = await prisma.booking.findMany({
        orderBy: { datetime: "asc" },
      });
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("GET /api/booking error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
