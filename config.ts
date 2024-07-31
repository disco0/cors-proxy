export const config = {
  port: {
    default: "3000",
    env: "PORT",
    argsShort: "p",
    argsLong: "port",
  },
  route: {
    default: "/cors/",
    env: "CORS_ROUTE_PREFIX",
    argsShort: "r",
    argsLong: "route",
  },
  allowedUrls: {
    default: "",
    env: "ALLOWED_URLS",
    argsShort: "u",
    argsLong: "allowed-urls",
  },
  allowedOrigins: {
    default: "*",
    env: "ALLOWED_ORIGINS",
    argsShort: "o",
    argsLong: "allowed-origins",
  },
  allowedHeaders: {
    default: "",
    env: "ALLOWED_HEADERS",
    argsShort: "H",
    argsLong: "allowed-headers",
  },
} as const satisfies {
  [key: string]: {
    default: string;
    env: string;
    argsShort: string;
    argsLong: string;
  };
}