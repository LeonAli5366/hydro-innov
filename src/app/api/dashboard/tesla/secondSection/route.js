import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE SECONDSECTION
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.secondSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL SECONDSECTION
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.secondSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE SECONDSECTION
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let secondSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.secondSection.delete({
      where: {
        id: parseInt(secondSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE SECONDSECTION
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, photo } = await req.json();

    const secondSection = await prisma.secondSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!secondSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No secondSection found for the given Page",
      });
    }

    // Update the SECONDSECTION
    const updatedsecondSection = await prisma.secondSection.update({
      where: { id: secondSection.id },
      data: { title, subtitle, photo },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedsecondSection,
    });
  } catch (error) {
    console.error("Error in PATCH secondSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}


// GET SINGLE SECONDSECTION
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let second_id = searchParams.get("id");

    const secondSection = await prisma.secondSection.findFirst({
      where: {
        id: parseInt(second_id),
        pageId: parseInt(pageId),
      },
    });

    if (!secondSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No secondSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: secondSection,
    });
  } catch (error) {
    console.error("Error in PATCH secondSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
