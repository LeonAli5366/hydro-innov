import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE eighthSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.eighthSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL eighthSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.eighthSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE eighthSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let eighthSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.eighthSection.delete({
      where: {
        id: parseInt(eighthSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE eighthSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const {
      pageId,
      title,
      subtitle,
      titleone,
      subtitleone,
      titletwo,
      subtitletwo,
      titlethree,
      subtitlethree,
      photo
    } = await req.json();

    const eighthSection = await prisma.eighthSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!eighthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No eighthSection found for the given Page",
      });
    }

    // Update the eighthSection
    const updatedeighthSection = await prisma.eighthSection.update({
      where: { id: eighthSection.id },
      data: {
        title,
        subtitle,
        titleone,
        subtitleone,
        titletwo,
        subtitletwo,
        titlethree,
        subtitlethree,
        photo
      },
    });

    return NextResponse.json({
      status: "Success",
      data: updatedeighthSection,
    });
  } catch (error) {
    console.error("Error in PATCH eighthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE eighthSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let eighth_id = searchParams.get("id");

    const eighthSection = await prisma.eighthSection.findFirst({
      where: {
        id: parseInt(eighth_id),
        pageId: parseInt(pageId),
      },
    });

    if (!eighthSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No eighthSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: eighthSection,
    });
  } catch (error) {
    console.error("Error in PATCH eighthSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
