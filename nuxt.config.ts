// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    cookie: 'cookie',
  },
  devtools: {
    enabled: true,
  },
  modules: [
    (!process.env.AUTH_DISABLE_AUTHJS || undefined) && '@hebilicious/authjs-nuxt',
    (!process.env.AUTH_DISABLE_SESSION || undefined) && '@sidebase/nuxt-session',
    (!process.env.AUTH_DISABLE_SECURITY || undefined) && 'nuxt-security',
  ],
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET // You can generate one with `openssl rand -base64 32`
    },
    github: {
      clientId: process.env.NUXT_GITHUB_CLIENT_ID,
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET
    },
    public: {
      baseURL: process.env.NUXT_BASE_URL,
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true // whether to hit the /auth/session endpoint on every client request
      }
    }
  },
})
