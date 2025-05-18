// import { defineMiddleware } from "astro:middleware";

// export const onRequest = defineMiddleware((context, next) => {
//   console.log("Middleware triggered");
//   const lang = context.request.headers.get("accept-language");
//   console.log("Language:", lang);
//   return next();
// });

import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoute = createRouteMatcher(['/retos(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth(); // Recuperamos el userId

  // Validamos las rutas protegidas
  if (isProtectedRoute(context.request) && !userId) {
    // Redireccionamos la respuesta a la raíz
    // return Response.redirect(new URL('/', context.request.url));
    return redirectToSignIn(); // Redireccionamos a inicio se sesión
  }
});
