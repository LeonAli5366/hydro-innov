import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE sixthSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.sixthSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL sixthSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.sixthSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE sixthSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let sixthSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.sixthSection.delete({
      where: {
        id: parseInt(sixthSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE sixthSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, sixthSectionUpdates } = await req.json();

    const sixthSection = await prisma.sixthSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!sixthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No sixthSection found for the given Page",
      });
    }

    // Update the sixthSection
    const updatedsixthSection = await prisma.sixthSection.update({
      where: { id: sixthSection.id },
      data: sixthSectionUpdates,
    });

    return NextResponse.json({
      status: "Success",
      data: updatedsixthSection,
    });
  } catch (error) {
    console.error("Error in PATCH sixthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE sixthSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let sixth_id = searchParams.get("id");

    const sixthSection = await prisma.sixthSection.findFirst({
      where: {
        id: parseInt(sixth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!sixthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No sixthSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: sixthSection,
    });
  } catch (error) {
    console.error("Error in PATCH sixthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
