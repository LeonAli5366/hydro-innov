import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE PRODUCT
export async function POST(req) {
  const prisma = new PrismaClient();

  try {
    const { title, subTitle, photo, pageId } = await req.json();

    if (!title || !subTitle || !pageId) {
      return NextResponse.json({
        status: "Fail",
        message: "Title, Subtitle, and Page ID are required.",
      });
    }

    const newProduct = await prisma.products.create({
      data: {
        title,
        subTitle,
        photo,
        pageId,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "Failed to create product",
    });
  } finally {
    await prisma.$disconnect();
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
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { id, title, subTitle, photo } = await req.json();
    console.log("Received ID:", id); // Debugging

    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) }, // Ensure `id` is properly handled
    });

    if (!product) {
      return NextResponse.json({
        status: "Fail",
        message: "Product not found for the given ID",
      });
    }

    const updatedProduct = await prisma.products.update({
      where: { id: product.id },
      data: { title, subTitle, photo },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error in PUT products:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
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
