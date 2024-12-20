import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE tenthSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.tenthSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL tenthSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.tenthSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE tenthSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let tenthSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.tenthSection.delete({
      where: {
        id: parseInt(tenthSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE tenthSection
export async function PUT(req) {
  let { searchParams } = new URL(req.url);
  let tenth_id = searchParams.get("id");
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, photo } = await req.json();

    const tenthSection = await prisma.tenthSection.findFirst({
      where: {
        id: parseInt(tenth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!tenthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No tenthSection found for the given Page",
      });
    }

    // Update the tenthSection
    const updatedtenthSection = await prisma.tenthSection.update({
      where: { id: tenthSection.id },
      data: {
        title, subtitle, photo
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedtenthSection,
    });
  } catch (error) {
    console.error("Error in PATCH tenthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE tenthSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let tenth_id = searchParams.get("id");

    const tenthSection = await prisma.tenthSection.findFirst({
      where: {
        id: parseInt(tenth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!tenthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No tenthSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: tenthSection,
    });
  } catch (error) {
    console.error("Error in PATCH tenthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
