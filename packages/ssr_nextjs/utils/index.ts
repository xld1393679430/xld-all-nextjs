import { AppContext } from "next/app";

export const getIsMobile = (context: AppContext) => {
  const { headers = {} } = context.ctx.req || {};
  return /mobile|android|iphone|ipad|phone/i.test((headers["user-agent"] || "").toLowerCase());
};
