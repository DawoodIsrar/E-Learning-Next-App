import NextAuth from "next-auth";
import jwt from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";
import { URL } from "./../../../utils/endpoints";

const tokenUpdated = async (token, refreshToken) => {
  try {
    const refreshAPI = await fetch(`${URL}/api/token/refresh`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });
    const response = await refreshAPI.json();
    return response?.data?.access_token;
  } catch (error) {
    console.log("refresh token error", error);
  }
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const {
          access_token,
          refresh_token,
          email,
          icon_url,
          id,
          role,
          social_login,
          username,
        } = credentials;
        const token = {
          accessToken: access_token,
          refreshToken: refresh_token,
          // Add other custom data as needed
        };

        // Store the tokens in the token object

        // return token;
        const user = {
          email,
          icon_url,
          id,
          role,
          social_login,
          username,
        };

        return { name: user, email: token };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, trigger, session }) {
      if (token.email.accessToken) {
        var decodedToken = jwt(token.email.accessToken, { complete: true });
        var dateNow = new Date();
        if (decodedToken.exp * 1000 < dateNow.getTime()) {
          const newToken = await tokenUpdated(
            token.email.accessToken,
            token.email.refreshToken
          );

          token.email.accessToken = newToken
        }
      }
      token.hello = "Here i am ";

      if (trigger === "update") {
        token.name = session;
      }
      // Persist the OAuth access_token to the token right after signin

      return token;
    },
    async session({ session, token, user }) {
      const currentDate = new Date();
      const expiresDate = new Date(session.expires);

      if (currentDate > expiresDate) {
        // If the session has expired, return null to invalidate the session
        return null;
      }
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.email.accessToken;
      session.refreshToken = token.email.refreshToken;
      session.user = token.name;
      return session;
    },
    async redirect({ url }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${process.env.NEXTAUTH_URL}${url}`;
      return process.env.NEXTAUTH_URL;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    signOut: "/logout",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
