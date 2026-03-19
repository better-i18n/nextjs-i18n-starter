import { createRevalidateHandler } from "@better-i18n/next/revalidate";

export const POST = createRevalidateHandler({
  secret: process.env.BETTER_I18N_WEBHOOK_SECRET!,
});
