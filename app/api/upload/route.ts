import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${file.name}`,
      folder: "/products",
    });

    return NextResponse.json({
      url: result.url,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Upload gagal" },
      { status: 500 }
    );
  }
}