import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE PRODUCT
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.products.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL PRODUCT
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();

    // Fetch all orders with related product details
    const result = await prisma.orders.findMany({
      include: {
        product: true, 
      },
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE PRODUCT
export async function DELETE(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.products.delete({
      where: {
        id: parseInt(product_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE PRODUCT
export async function PUT(req, res) {
  try {
    let { title, subtitle, photo } = await req.json();

    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");

    const prisma = new PrismaClient();

    const result = await prisma.products.update({
      where: {
        id: parseInt(product_id),
      },
      data: {
        title,
        subtitle,
        photo,
      },
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET SINGLE PRODUCT
export async function PATCH(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");

    const prisma = new PrismaClient();
    const result = await prisma.products.findUnique({
      where: {
        id: parseInt(product_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}
