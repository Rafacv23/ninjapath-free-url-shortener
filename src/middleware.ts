import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server"

const isProtectedRoute = createRouteMatcher([`/archive(.*)`])

export const onRequest = clerkMiddleware((auth, context) => {
  const { redirectToSignIn, userId } = auth()

  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn()
  }
})
