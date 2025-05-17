// import { defineMiddleware } from "astro:middleware";

// export const onRequest = defineMiddleware((context, next) => {
//   console.log("Middleware triggered");
//   const lang = context.request.headers.get("accept-language");
//   console.log("Language:", lang);
//   return next();
// });

import { clerkMiddleware } from "@clerk/astro/server";

export const onRequest = clerkMiddleware();
