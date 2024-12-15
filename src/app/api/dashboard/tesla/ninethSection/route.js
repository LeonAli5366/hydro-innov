import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE ninethSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.ninethSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL ninethSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.ninethSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE ninethSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let ninethSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.ninethSection.delete({
      where: {
        id: parseInt(ninethSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE ninethSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, photo } = await req.json();

    const ninethSection = await prisma.ninethSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!ninethSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No ninethSection found for the given Page",
      });
    }

    // Update the ninethSection
    const updatedninethSection = await prisma.ninethSection.update({
      where: { id: ninethSection.id },
      data: {
        title,
        subtitle,
        photo,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedninethSection,
    });
  } catch (error) {
    console.error("Error in PATCH ninethSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE ninethSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let nineth_id = searchParams.get("id");

    const ninethSection = await prisma.ninethSection.findFirst({
      where: {
        id: parseInt(nineth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!ninethSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No ninethSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: ninethSection,
    });
  } catch (error) {
    console.error("Error in PATCH ninethSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
