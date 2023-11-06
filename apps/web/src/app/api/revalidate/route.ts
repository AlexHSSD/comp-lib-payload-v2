import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  // const path = request.nextUrl.searchParams.get("path") || "/";
  const secret = request.nextUrl.searchParams.get("secret") || "";
  const tag = request.nextUrl.searchParams.get("tag") || "";
  if (secret === process.env.NEXT_PRIVATE_REGENERATION_SECRET) {
    if (tag) {
      revalidateTag(tag);
    }
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } else {
    return NextResponse.json({
      revalidated: false,
      message: "You are not authorized.",
      now: Date.now(),
    });
  }
}
