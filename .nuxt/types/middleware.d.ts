import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "proxy"
declare module "C:/laragon/www/hertz-nux/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}