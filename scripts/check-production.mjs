import { readFile } from "node:fs/promises";

const files = ["index.html", "legal.html", "privacy.html", "cookies.html", "config/company.json"];
const findings = [];

for (const file of files) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  if (/G-[A-Z0-9]{8,}|googletagmanager\.com|google-analytics\.com/i.test(text)) {
    findings.push(`${file}: analytics/tracking reference found`);
  }
  if (/Antwerpsestraat 13/i.test(text)) findings.push(`${file}: stale address 13 found`);
  if (/TODO[_: ]/i.test(text)) findings.push(`${file}: unresolved business/legal placeholder`);
  if (/<form\b/i.test(text)) findings.push(`${file}: form introduced; server-side review required`);
}

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
for (const required of ["/legal.html", "/privacy.html", "/cookies.html", "Content-Security-Policy"]) {
  if (!index.includes(required)) findings.push(`index.html: missing ${required}`);
}

if (findings.length) {
  console.error("Production check failed:\n- " + findings.join("\n- "));
  process.exitCode = 1;
} else {
  console.log("Production check passed: no blockers found.");
}
