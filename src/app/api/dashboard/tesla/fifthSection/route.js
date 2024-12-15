import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE fifthSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.fifthSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL fifthSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.fifthSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE fifthSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let fifthSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.fifthSection.delete({
      where: {
        id: parseInt(fifthSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE fifthSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId, title, subtitle, photo } = await req.json();

    const fifthSection = await prisma.fifthSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!fifthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No fifthSection found for the given Page",
      });
    }

    // Update the fifthSection
    const updatedfifthSection = await prisma.fifthSection.update({
      where: { id: fifthSection.id },
      data: { title, subtitle, photo },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedfifthSection,
    });
  } catch (error) {
    console.error("Error in PATCH fifthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE fifthSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let fifth_id = searchParams.get("id");

    const fifthSection = await prisma.fifthSection.findFirst({
      where: {
        id: parseInt(fifth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!fifthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No fifthSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: fifthSection,
    });
  } catch (error) {
    console.error("Error in PATCH fifthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
