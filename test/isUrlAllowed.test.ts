import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

import { isUrlAllowed } from "../helpers/allowed-urls-helper.ts";

Deno.test("rule without trailing slash matches exactly with url (e.g. rule: https://duck.com/, url: https://duck.com)", () => {
  const rules = "http://bar.xyz/,https://foo.bar/".split(',');
  const rulesWithoutTrailingSlash = "http://bar.xyz,https://foo.bar".split(',');
  const url = "https://foo.bar";
  const illegalUrl = "https://doesnt.exist";

  assertEquals(isUrlAllowed(url, rulesWithoutTrailingSlash), true);
  assertEquals(isUrlAllowed(url, rules), true);
  assertEquals(isUrlAllowed(url + "/", rulesWithoutTrailingSlash), true);
  assertEquals(isUrlAllowed(url + "/", rules), true);

  // check for non-existing url
  assertEquals(isUrlAllowed(illegalUrl, rulesWithoutTrailingSlash), false);
  assertEquals(isUrlAllowed(illegalUrl, rules), false);
  assertEquals(
    isUrlAllowed(illegalUrl + "/", rulesWithoutTrailingSlash),
    false,
  );
  assertEquals(isUrlAllowed(illegalUrl + "/", rules), false);
});

Deno.test("url starts with rule (including trailing slash; e.g. rule: https://example.com, url: https://example.com/path1)", () => {
  const rules = "http://bar.xyz/,https://foo.bar/".split(',');
  const rulesWithoutTrailingSlash = "http://bar.xyz,https://foo.bar".split(',');
  const url = "https://foo.bar/blob";

  assertEquals(isUrlAllowed(url, rulesWithoutTrailingSlash), true);
  assertEquals(isUrlAllowed(url, rules), true);
  assertEquals(isUrlAllowed(url + "/", rulesWithoutTrailingSlash), true);
  assertEquals(isUrlAllowed(url + "/", rules), true);
});

Deno.test("url starts with rule without trailing slash (to avoid using rule as subdomain, e.g. https://duck.com.example.com/)", () => {
  const rules = "http://bar.xyz,https://foo.bar".split(',');
  const url = "https://foo.bar";
  const illegalUrl = "https://foo.bar.impostor.com";

  assertEquals(isUrlAllowed(url, rules), true);
  assertEquals(isUrlAllowed(illegalUrl, rules), false);
});

Deno.test("url starts with rule without trailing slash (rule: https://example.com/path1, url: https://example.com/path123)", () => {
  const rules = "http://bar.xyz,https://foo.bar/path".split(',');
  const url = "https://foo.bar";

  assertEquals(isUrlAllowed(url + "/path", rules), true);
  assertEquals(isUrlAllowed(url + "/path12", rules), true);
  assertEquals(isUrlAllowed(url + "/wrong", rules), false);
  assertEquals(isUrlAllowed(url + "/", rules), false);
  assertEquals(isUrlAllowed(url, rules), false);
});

Deno.test("url starts with rule and trailing slash (rule: https://example.com/path1/, url: https://example.com/path1/12)", () => {
  const rules = "http://bar.xyz,https://foo.bar/path/".split(',');
  const url = "https://foo.bar";

  assertEquals(isUrlAllowed(url + "/path", rules), true);
  assertEquals(isUrlAllowed(url + "/path/12", rules), true);
  assertEquals(isUrlAllowed(url + "/path12", rules), false);
  assertEquals(isUrlAllowed(url + "/path12/", rules), false);
  assertEquals(isUrlAllowed(url + "/wrong", rules), false);
  assertEquals(isUrlAllowed(url + "/", rules), false);
  assertEquals(isUrlAllowed(url, rules), false);
});

// every url is allowed when no rule is given
Deno.test("no rules given", () => {
  const rules = "".split(',');
  const url = "https://foo.bar";

  assertEquals(isUrlAllowed(url + "/path", rules), true);
  assertEquals(isUrlAllowed(url + "/path12", rules), true);
  assertEquals(isUrlAllowed(url + "/wrong", rules), true);
  assertEquals(isUrlAllowed(url + "/", rules), true);
  assertEquals(isUrlAllowed(url + "", rules), true);
  assertEquals(isUrlAllowed("https://foo.bar.impostor.com", rules), true);
  assertEquals(isUrlAllowed("http://test.test", rules), true);
});
