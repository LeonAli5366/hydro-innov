import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE seventhSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.seventhSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL seventhSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.seventhSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE seventhSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let seventhSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.seventhSection.delete({
      where: {
        id: parseInt(seventhSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE seventhSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, photo } = await req.json();

    const seventhSection = await prisma.seventhSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!seventhSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No seventhSection found for the given Page",
      });
    }

    // Update the seventhSection
    const updatedseventhSection = await prisma.seventhSection.update({
      where: { id: seventhSection.id },
      data: {
        title,
        subtitle,
        photo,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedseventhSection,
    });
  } catch (error) {
    console.error("Error in PATCH seventhSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE seventhSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let seventh_id = searchParams.get("id");

    const seventhSection = await prisma.seventhSection.findFirst({
      where: {
        id: parseInt(seventh_id),
        pageId: parseInt(pageId),
      },
    });

    if (!seventhSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No seventhSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: seventhSection,
    });
  } catch (error) {
    console.error("Error in PATCH seventhSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
