import { createRevalidateHandler } from "@better-i18n/next";

export const POST = createRevalidateHandler({
  secret: process.env.BETTER_I18N_WEBHOOK_SECRET!,
});
