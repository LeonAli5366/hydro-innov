import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE PAGE
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.page.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET SINGLE PAGE DATA
export async function GET(req) {
  const prisma = new PrismaClient();

  try {
    // Extract `id` from query parameters
    const { searchParams } = new URL(req.url);
    const pageId = searchParams.get("id");

    // Validate `id`
    if (!pageId || isNaN(pageId)) {
      return NextResponse.json({
        status: "Fail",
        message: "Invalid or missing page ID",
      });
    }

    // Fetch the page and all related sections
    const result = await prisma.page.findUnique({
      where: { id: parseInt(pageId) },
      include: {
        firstSection: true,
        secondSection: true,
        thirdSection: true,
        fourthSection: true,
        fifthSection: true,
        sixthSection: true,
        seventhSection: true,
        eighthSection: true,
        ninethSection: true,
        tenthSection: true,
      },
    });

    // Check if the page exists
    if (!result) {
      return NextResponse.json({
        status: "Fail",
        message: "Page not found",
      });
    }

    // Return the fetched data
    return NextResponse.json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json({
      status: "Fail",
      message: "An error occurred while fetching data",
    });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// DELETE PAGE
export async function DELETE(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let page_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.page.delete({
      where: {
        id: parseInt(page_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE PAGE
export async function PUT(req, res) {
  try {
    let reqBody = await req.json();

    let { searchParams } = new URL(req.url);
    let page_id = searchParams.get("id");

    const prisma = new PrismaClient();

    const result = await prisma.page.update({
      where: {
        id: parseInt(page_id),
      },
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET SINGLE PAGE
export async function PATCH(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let page_id = searchParams.get("id");

    const prisma = new PrismaClient();
    const result = await prisma.page.findUnique({
      where: {
        id: parseInt(page_id),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}
