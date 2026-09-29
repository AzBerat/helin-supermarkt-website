# Security and operations

## Current threat model

This is a public, static brochure site. There is no application server, database, authentication, admin role, contact form, upload, webhook, payment, session cookie or user-owned object. Controls for server-side authorization, IDOR, CSRF, API rate limiting, CORS credentials and upload validation are therefore not applicable to the current version. Reassess before adding any of those features.

## Implemented in the repository

- Analytics and consent storage removed; no tracking request is made by the site.
- Google Maps and Instagram remain click-only external links, not embedded third-party frames.
- External HTTPS links receive `rel="noopener noreferrer"`.
- Referrer policy is `strict-origin-when-cross-origin`.
- A restrictive best-effort CSP meta policy blocks frames, objects and network connections. The generated single-file runtime still requires inline styles/scripts, `unsafe-eval` and `blob:`; a future rebuild without the export runtime is needed for a strict nonce/hash CSP.
- Legal pages use no JavaScript and a stricter CSP.
- `.gitignore` blocks common secret/key files. No environment file or secret is required.
- The production check fails on tracking, a stale address, forms or unresolved legal placeholders.

## Required hosting controls

GitHub Pages currently serves HTTPS but does not let this repository define arbitrary response headers. Put the domain behind a provider that supports response headers, then set and verify at least:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self' blob: data:; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'none'; form-action 'self' mailto:; connect-src 'self'; img-src 'self' blob: data:; font-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
```

Prefer CSP `frame-ancestors 'none'` over the legacy `X-Frame-Options: DENY`; sending both is acceptable for legacy clients. Do not enable HSTS `preload` until every current and future subdomain is confirmed HTTPS-only.

## Operational privacy and resilience

- Confirm the actual hosting, DNS and email providers; record any processor terms, data locations and transfer mechanism.
- Configure mailbox access with MFA and named accounts; do not share passwords.
- Apply the privacy retention rule to the real mailbox and backups, not only the website text.
- Keep at least one recoverable repository backup and periodically test restoration and domain access.
- Review the FAVV/AFSCA registration/authorisation and make sure the required physical notice is visible at the shop.
- Re-run the full audit before adding analytics, embedded maps/social media, forms, a CMS, product sync, accounts or online ordering.

## Reporting

Security issues should be reported privately to the confirmed business contact. Do not include customer data, credentials or exploit payloads in public GitHub issues.
