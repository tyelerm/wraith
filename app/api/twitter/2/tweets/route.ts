import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        let accessToken = await getToken({ req }).then((token: any) => {
            return token.access_token;
        });

        console.log("accessT: ", accessToken);

        const tweetText = await req.text();
        const tweet = { text: tweetText };
        console.log(tweet);

        // MAKE REQUEST USING twitter-api-v2
        // const client = await new TwitterApi(accessToken);
        // console.log("client: ", client);
        // client.v2.tweet(tweet).then((r) => {
        //     console.log();
        //     console.log("using twitter api v2 client: ", r);
        // });

        // MAKE REQUEST USING FETCH API

        let r = await fetch("https://api.twitter.com/2/tweets", {
            method: "POST",
            body: JSON.stringify(tweet),
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

        return NextResponse.json({ data: null }, { status: 200 });
    } catch (e: any) {
        console.log(e);
        return NextResponse.json(
            { error: "Unexpected error" },
            { status: 400 }
        );
    }
}
