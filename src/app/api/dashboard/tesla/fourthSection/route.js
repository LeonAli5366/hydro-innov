import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE fourthSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.fourthSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL fourthSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.fourthSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE fourthSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let fourthSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.fourthSection.delete({
      where: {
        id: parseInt(fourthSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE fourthSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    let { searchParams } = new URL(req.url);
    let fourth_id = searchParams.get("id");
    const { pageId, tag, desc, video } = await req.json();

    const fourthSection = await prisma.fourthSection.findFirst({
      where: {
        id: parseInt(fourth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!fourthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No fourthSection found for the given Page",
      });
    }

    // Update the fourthSection
    const updatedfourthSection = await prisma.fourthSection.update({
      where: { id: fourthSection.id },
      data: {
        tag,
        desc,
        video,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedfourthSection,
    });
  } catch (error) {
    console.error("Error in PATCH fourthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE fourthSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let fourth_id = searchParams.get("id");

    const fourthSection = await prisma.fourthSection.findFirst({
      where: {
        id: parseInt(fourth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!fourthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No fourthSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: fourthSection,
    });
  } catch (error) {
    console.error("Error in PATCH fourthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
