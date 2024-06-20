/**
 * Checks whether cors proxy server should serve the url
 * @param url URL to check
 * @param rules String array of rules, e.g. `["https://duck.com", "https://example.com"]`, or `undefined` to allow for
 * any url (best to skip the function call instead).
 */
export function isUrlAllowed(url: string, rules: string[]): boolean {
  if (!rules || rules.length === 0) {
    return true
  }

  return rules.some((rule) => {
    // Catch empty string being passed in from split
    if(rule === '') { return true }

    /**
     * a) rule without trailing slash matches exactly with url (e.g. rule: https://duck.com/, url: https://duck.com)
     * b1) url starts with rule (including trailing slash; e.g. rule: https://example.com, url: https://example.com/path1)
     * b2) url starts with rule without trailing slash (only if rule contains at least one slash for path
     *        (to avoid using rule as subdomain, e.g. https://duck.com.example.com/)
     *        e.g. rule: https://example.com/path1, url: https://example.com/path123)
     */
    const ruleWithoutTrailingSlash = rule.endsWith("/")
      ? rule.substring(0, rule.length - 1)
      : rule;
    const ruleContainsPath = (rule.match(/\//g) || []).length >= 3;
    return url === ruleWithoutTrailingSlash ||
        url.startsWith(
          rule + (ruleContainsPath || rule.endsWith("/") ? "" : "/"),
        );
  });
}
