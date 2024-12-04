import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server"

const isProtectedRoute = createRouteMatcher([`/archive(.*)`])

export const onRequest = clerkMiddleware((auth, context) => {
  const { redirectToSignIn, userId } = auth()

  context.locals.currentUser = auth().userId

  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn()
  }
})
