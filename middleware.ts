import { i18n } from "./i18n.config";

export default i18n.betterMiddleware();

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
