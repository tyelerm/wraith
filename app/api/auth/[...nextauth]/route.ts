import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        TwitterProvider({
            clientId: process.env.OAUTH2_CLIENT_ID!,
            clientSecret: process.env.OAUTH2_CLIENT_SECRET!,
            version: "2.0",
            authorization: {
                params: {
                    scope: "users.read tweet.read tweet.write offline.access like.read list.read follows.read",
                },
            },
        }),
    ],
    callbacks: {
        //@ts-ignore
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            console.log("ACCOUNT: ", account);
            console.log("TOKEN: ", token);
            console.log("PROFILE: ", profile);

            if (account) {
                token.access_token = account.access_token;
                token.refresh_token = account.refresh_token;
                token.providerAccountId = account.providerAccountId;
                token.expires_at = account.expires_at;
                token.scope = account.scope;
            }

            if (profile) {
                token.profile = profile;
            }

            return token;
        },
        //@ts-ignore
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.token = token;
            session.profile = token.profile;
            return session;
        },
    },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
