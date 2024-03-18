# Nuxt 3 Auth Layer

Nuxt 3 preset layer for auth & session manager.

----

[![npm](https://img.shields.io/npm/v/@alexsun-top/nuxt-auth-layer?style=flat-square)](https://www.npmjs.com/package/@alexsun-top/nuxt-auth-layer)

- [Auth.js](https://nuxt.com/modules/authjs)
- [Nuxt Session](https://nuxt.com/modules/session)
- [Nuxt Security](https://nuxt.com/modules/security)

## Usage

Add `@alexsun-top/nuxt-auth-layer` to your project:

```bash
pnpm add -D @alexsun-top/nuxt-auth-layer
```

Add the layer to your Nuxt project:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // ...
  extends: [
    '@alexsun-top/nuxt-auth-layer',
  ],
})
```

## Configuration

You can disable some of the dependencies by setting the following environment variables:

| Environment Variable    | Package                    |
| ----------------------- | -------------------------- |
| `AUTH_DISABLE_AUTHJS`   | `@hebilicious/authjs-nuxt` |
| `AUTH_DISABLE_SESSION`  | `@sidebase/nuxt-session`   |
| `AUTH_DISABLE_SECURITY` | `nuxt-security`            |

## License

[MIT](./LICENSE).
