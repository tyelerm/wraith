import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        let accessToken = await getToken({ req }).then((token: any) => {
            return token.access_token;
        });

        let r = await fetch("https://api.twitter.com/2/users/me", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((results) => {
                let data = results.json();
                return data;
            })
            .then((data) => {
                console.log(data);
                return data;
            });

        return NextResponse.json({ data: r }, { status: 200 });
    } catch (e: any) {
        console.log(e);
        return NextResponse.json(
            { error: "Unexpected error" },
            { status: 400 }
        );
    }
}
