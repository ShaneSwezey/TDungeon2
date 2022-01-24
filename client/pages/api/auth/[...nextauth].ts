import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

export default NextAuth({
  secret: "aklshdflkjasdlkjflkadsjf",
  // Configure one or more authentication providers
  jwt: {
    secret: "aklshdflkjasdlkjflkadsjf",
    maxAge: 60 * 60 * 24
  },
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
})