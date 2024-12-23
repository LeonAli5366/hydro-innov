import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// CREATE thirdSection
export async function POST(req, res) {
  try {
    let reqBody = await req.json();

    const prisma = new PrismaClient();

    const result = await prisma.thirdSection.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// GET ALL thirdSection
export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.thirdSection.findMany();
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// DELETE thirdSection
export async function DELETE(req, res) {
  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let thirdSection_id = searchParams.get("id");
    const prisma = new PrismaClient();
    const result = await prisma.thirdSection.delete({
      where: {
        id: parseInt(thirdSection_id),
        pageId: parseInt(pageId),
      },
    });
    return NextResponse.json({ status: "Success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "Fail", data: "no data" });
  }
}

// UPDATE thirdSection
export async function PUT(req) {
  const prisma = new PrismaClient();

  try {
    const {
      pageId,
      titleone,
      subtitleone,

      titletwo,
      subtitletwo,

      titlthree,
      subtitlthree,
    } = await req.json();

    const thirdSection = await prisma.thirdSection.findFirst({
      where: {
        pageId: parseInt(pageId),
      },
    });

    if (!thirdSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No thirdSection found for the given Page",
      });
    }

    // Update the thirdSection
    const updatedthirdSection = await prisma.thirdSection.update({
      where: { id: thirdSection.id },
      data: {
        titleone,
        subtitleone,

        titletwo,
        subtitletwo,

        titlthree,
        subtitlthree,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: {
        titleone,
        subtitleone,
        titletwo,
        subtitletwo,
        titlthree,
        subtitlthree,
      },
    });
  } catch (error) {
    console.error("Error in PATCH thirdSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// GET SINGLE thirdSection
export async function PATCH(req) {
  const prisma = new PrismaClient();

  try {
    const { pageId } = await req.json();
    let { searchParams } = new URL(req.url);
    let second_id = searchParams.get("id");

    const thirdSection = await prisma.thirdSection.findFirst({
      where: {
        id: parseInt(second_id),
        pageId: parseInt(pageId),
      },
    });

    if (!thirdSection) {
      return NextResponse.json({
        status: "Fail",
        message: "No thirdSection found for the given Page",
      });
    }

    return NextResponse.json({
      status: "Success",
      data: thirdSection,
    });
  } catch (error) {
    console.error("Error in PATCH thirdSection:", error);
    return NextResponse.json({
      status: "Fail",
      message: error.message || "An error occurred",
    });
  } finally {
    await prisma.$disconnect();
  }
}
