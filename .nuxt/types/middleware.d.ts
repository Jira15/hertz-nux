import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "proxy"
declare module "/home/jiradev/Documents/web/hertz-nux/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}