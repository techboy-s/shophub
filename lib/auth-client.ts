import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Change this when you deploy!
});

export const { useSession, signIn, signOut } = authClient;