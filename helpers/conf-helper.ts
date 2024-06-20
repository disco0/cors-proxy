let LOGGED_NO_ENV_PERMISSION_WARNING = false;
export function getValueFromEnv(arg: string): string | undefined {
  try {
    if (Deno.env.has(arg)) {
      return Deno.env.get(arg);
    }
  } catch (err) {
    if (
      err.message ===
        "access to environment variables, run again with the --allow-env flag"
    ) {
      if (!LOGGED_NO_ENV_PERMISSION_WARNING) {
        console.warn(
          `No access to environment variables. Run again with the --allow-env flag to use environment variables instead of defaults.`,
        );
        LOGGED_NO_ENV_PERMISSION_WARNING = true;
      }
      return undefined;
    }
    throw err;
  }
}
