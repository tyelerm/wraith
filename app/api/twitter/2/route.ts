import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// test route example of using next reqeusts and for viewing session and token output
export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOptions as any);
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log("session", session);
    console.log("token", token);

    try {
        return NextResponse.json({ data: "successs" }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json(
            { error: "Unexpected error" },
            { status: 400 }
        );
    }
}
