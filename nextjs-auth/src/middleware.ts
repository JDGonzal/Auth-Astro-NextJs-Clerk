import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/protected(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Mira directamente si tiene autorizacion o no
  if (isProtectedRoute(req)) await auth.protect(has => {
    if (!has) {
      return false; // User does not have permission
    }
    return true; // User has permission
  }); 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
