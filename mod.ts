import { parseArgs } from "@std/cli/parse-args";
import { getValueFromEnv } from "./helpers/conf-helper.ts";
import { config } from "./config.ts";
import { showHelpMessage } from "./helpers/help-helper.ts";
import { run } from "./server.ts";

const args = parseArgs(Deno.args, {
  string: [
    config.route.argsLong,
    config.route.argsShort,
    config.port.argsLong,
    config.port.argsShort,
    config.allowedUrls.argsLong,
    config.allowedUrls.argsShort,
    config.allowedOrigins.argsLong,
    config.allowedOrigins.argsShort,
    config.allowedHeaders.argsLong,
    config.allowedHeaders.argsShort,
  ]
});

if (args.help) {
  showHelpMessage();
  Deno.exit();
}

const port = Number(
  args[config.port.argsLong]
  ?? args[config.port.argsShort]
  ?? getValueFromEnv(config.port.env)
  ?? config.port.default,
);

const corsRoutePrefix =
  args[config.route.argsLong]
  ?? args[config.route.argsShort]
  ?? getValueFromEnv(config.route.env)
  ?? config.route.default;

const allowedUrls =
  args[config.allowedUrls.argsLong]
  ?? args[config.allowedUrls.argsShort]
  ?? getValueFromEnv(config.allowedUrls.env)
  ?? config.allowedUrls.default;

const allowedOrigins =
  args[config.allowedOrigins.argsLong]
  ?? args[config.allowedOrigins.argsShort]
  ?? getValueFromEnv(config.allowedOrigins.env)
  ?? config.allowedOrigins.default;

const allowedHeaders = (
  args[config.allowedOrigins.argsLong]
  ?? args[config.allowedOrigins.argsShort]
  ?? getValueFromEnv(config.allowedOrigins.env)
  ?? config.allowedOrigins.default
) || undefined;

run(port, corsRoutePrefix, allowedUrls, allowedOrigins, allowedHeaders);
