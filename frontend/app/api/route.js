import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    return NextResponse.json({ session });
}