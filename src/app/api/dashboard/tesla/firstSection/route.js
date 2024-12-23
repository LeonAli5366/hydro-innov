import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE firstSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.firstSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL firstSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.firstSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE firstSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let firstSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.firstSection.delete({
      where: {
        id: parseInt(firstSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE firstSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, video } = await req.json();

    const firstSection = await prisma.firstSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!firstSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No firstSection found for the given Page",
      });
    }

    // Update the firstSection
    const updatedfirstSection = await prisma.firstSection.update({
      where: { id: firstSection.id },
      data: {
        title,
        subtitle,
        video,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedfirstSection,
    });
  } catch (error) {
    console.error("Error in PATCH firstSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE firstSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let first_id = searchParams.get("id");

    const firstSection = await prisma.firstSection.findUnique({
      where: {
        id: parseInt(first_id),
        pageId: parseInt(pageId),
      },
    });

    if (!firstSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No firstSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: firstSection,
    });
  } catch (error) {
    console.error("Error in PATCH firstSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
