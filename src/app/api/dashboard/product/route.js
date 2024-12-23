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
  const prisma = new PrismaClient();

  try {
    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");

    if (product_id) {
      // Fetch a single product by ID if the ID is provided
      const result = await prisma.products.findUnique({
        where: {
          id: parseInt(product_id), // Ensure the ID is a number
        },
        include: {
          orders: true,
        },
      });

      if (!result) {
        return NextResponse.json({ status: "Fail", data: "Product not found" });
      }

      return NextResponse.json({ status: "Success", data: result });
    } else {
      // Fetch all products if no ID is provided
      const result = await prisma.products.findMany({
        include: {
          orders: true,
        },
      });

      return NextResponse.json({ status: "Success", data: result });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ status: "Fail", data: "Internal server error" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
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
    let { title, subTitle, photo } = await req.json();

    let { searchParams } = new URL(req.url);
    let product_id = searchParams.get("id");

    const prisma = new PrismaClient();

    const result = await prisma.products.update({
      where: {
        id: parseInt(product_id),
      },
      data: {
        title,
        subTitle,
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

    if (!result) {
      return NextResponse.json({ status: "Fail", data: "Product not found" });
    }

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error fetching single product:", error);
    return NextResponse.json({
      status: "Fail",
      data: "Error fetching product",
    });
  }
}
