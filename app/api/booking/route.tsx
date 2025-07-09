
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, phone, datetime, note } = await req.json();

    if (!phone || !datetime) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Find existing user by phone
    let user = await prisma.user.findUnique({ where: { phone } });

    // 2. If not found, create new user (auto-register)
    if (!user && name) {
      user = await prisma.user.create({
        data: {
          name,
          phone,
          role: "user",
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found. Please register first." },
        { status: 404 }
      );
    }

    // 3. Create booking linked to the user
    const booking = await prisma.booking.create({
      data: {
        name: user.name,
        phone,
        datetime: new Date(datetime),
        note,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Booking successful", booking });
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");
    const role = searchParams.get("role");

    let bookings;
    if (role === "admin") {
      bookings = await prisma.booking.findMany({
        orderBy: { datetime: "asc" },
      });
    } else if (phone) {
      bookings = await prisma.booking.findMany({
        where: { phone },
        orderBy: { datetime: "asc" },
      });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
