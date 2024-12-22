import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE OREDR
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.orders.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL OREDR
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();

    const result = await prisma.orders.findMany();

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE OREDR
export async function DELETE(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.orders.delete({
      where: {
        id: parseInt(product_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET SINGLE PRODUCT
export async function PATCH(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");

    const prisma = new PrismaClient();
    const result = await prisma.orders.findUnique({
      where: {
        id: parseInt(product_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}
