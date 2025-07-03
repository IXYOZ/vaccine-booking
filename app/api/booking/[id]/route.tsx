import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function DELETE(
    req: Request,
    {params }: { params: { id: string } }
  ) {
    try {
        const url = new URL(req.url)
        const idStr = url.pathname.split('/').pop()
      const id = parseInt(idStr || '');
  
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