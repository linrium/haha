import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { v7 as uuidv7 } from "uuid"
import { db } from "@/db"
import * as schema from "@/db/schema"

export const auth = betterAuth({
  plugins: [nextCookies()],
  experimental: {
    joins: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  advanced: {
    database: {
      generateId: () => uuidv7(),
    },
  },
})
