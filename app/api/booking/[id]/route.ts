import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function DELETE(
    req: NextRequest) {
    try {
        const urlParts = req.nextUrl.pathname.split('/')
        const idStr = urlParts[urlParts.length-1]
      const id = parseInt(idStr,10);
  
      if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
      }
  
      await prisma.booking.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Booking deleted" });
    } catch (err) {
      console.error("DELETE error", err);
      return NextResponse.json(
        { message: "Error deleting booking" },
        { status: 500 }
      );
    }
  }