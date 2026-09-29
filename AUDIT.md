# Production readiness, security and legal audit

Audit date: 25 September 2026

## Scope and architecture

- Static GitHub Pages site on `helinsupermarkt.be`; single generated `index.html` plus local images.
- Embedded React 18.3.1/runtime assets; no package manager, build manifest or server runtime.
- Hash-based product/category routing.
- No form, API, database, account, admin area, authorization, upload, webhook, checkout or payment.
- Contact uses `mailto:`. Google Maps and Instagram are external links, not embeds.
- Google Analytics was present behind a consent banner and has been removed to minimize processing.
- The generated catalogue contained demo prices, crossed-out prices and discount percentages presented as current weekly promotions.

## Findings and disposition

### Completed

- Removed Google Analytics, consent-mode code and consent storage. No cookie banner is needed while the site remains tracker-free.
- Added permanent legal, privacy and cookie links to every application view.
- Added Dutch legal/privacy/cookie pages, plus short Turkish and English notices where useful.
- Corrected stale Antwerpsestraat 13 metadata and structured data to Antwerpsestraat 11.
- Added referrer policy, CSP meta controls, external-link isolation and secret-file ignore rules.
- Added a production gate that detects tracking, stale address, new forms and unresolved legal placeholders.
- Added legal pages to the sitemap.
- Removed all visible demo amounts, crossed-out reference prices, discount percentages and weekly urgency claims. The same products remain visible as a neutral featured selection with price/availability confirmed in store.
- Verified DICLE & FIRAT BV, enterprise/VAT number 0650.951.261 and HELIN establishment unit 2.355.789.510 at Antwerpsestraat 11 in the official KBO Public Search (database state 24 September 2026).

### Open blockers before publishing these changes

- Business telephone number (a second direct contact method).
- FAVV/AFSCA registration, authorisation or approval type and number.
- Confirmed hosting, DNS and email providers, processor terms and international-transfer position.
- Confirmed mailbox/log/back-up retention and deletion procedure.
- HTTP response headers (HSTS, frame-ancestors, nosniff, Permissions-Policy) require hosting/CDN configuration; CSP meta alone cannot provide all protections.

If online promotions are re-enabled later, obtain for every item: exact product/unit, current selling price including applicable taxes, campaign start/end dates, stock/conditions, and the legally correct reference price for the relevant shop/channel. For goods covered by the Belgian reference-price rule, that is generally the lowest price applied during the preceding 30 days; perishable-goods exceptions still remain subject to the ban on misleading practices.

## Security checklist applicability

### The supplied 23-point screenshot

| # | Screenshot item | Result for this stack |
|---:|---|---|
| 1 | Remove keys from the client | Completed: no secret is required or present; common secret patterns were scanned. |
| 2 | Remove `.env` from history | Not applicable: no `.env` or credential was found in tracked files/history; ignore rules now block future accidental commits. |
| 3 | Write permission rules | Not applicable: no authenticated resources or permissions exist. |
| 4 | Keep authorization on the server | Not applicable: there is no server or protected action. |
| 5 | Limit login attempts | Not applicable: there is no login. |
| 6 | Validate input | Not applicable: there is no user-input surface. |
| 7 | Limit uploads | Not applicable: there is no upload. |
| 8 | Lock CORS | Not applicable: there is no credentialed API/private response; GitHub Pages serves public static assets with wildcard ACAO. |
| 9 | Security headers | Partial: CSP/referrer meta controls added; response-only headers need CDN/host support. |
| 10 | Force HTTPS | Completed at the host: live HTTP returns 301 to HTTPS. Keep “Enforce HTTPS” enabled. |
| 11 | Hash passwords | Not applicable: there are no passwords/accounts. |
| 12 | Secure cookies | Completed by removal: the site sets no cookies. |
| 13 | Shorten/sanitize errors | Not applicable to server responses; no API or sensitive server error is exposed. |
| 14 | Clean logs | Operational: no application log pipeline exists; hosting/mail retention and access must be confirmed. |
| 15 | Parameterize queries | Not applicable: there is no database/query. |
| 16 | Escape against XSS | Passed for current model: no untrusted input/sink; an encoded hash payload did not inject markup. Generated runtime CSP remains weaker than ideal. |
| 17 | Verify webhook signatures | Not applicable: no webhook. |
| 18 | Add admin roles | Not applicable: no admin surface. |
| 19 | Audit packages | Checked with limitation: OSV found no advisory for React/ReactDOM 18.3.1; custom export runtime lacks a lockfile. |
| 20 | Automatic backup | Partial/operational: Git history provides source recovery; automated off-site backup and restore drill still need confirmation. |
| 21 | Really delete accounts | Not applicable: there are no accounts. |
| 22 | Configure spending alerts | Not applicable to current static code; set provider billing alerts if paid CDN/API services are introduced. |
| 23 | Test like an attacker | Completed locally: safe route, XSS-hash, open-redirect, tracking/storage, console and mobile overflow smoke tests passed. |

The checklist is a prompt for threat modelling, not a list of controls that should be added blindly. Adding fake authentication, cookies or server controls to a static brochure site would expand rather than reduce risk.

| Control | Status | Reason |
|---|---|---|
| Secrets absent from client/repository | Completed | No secret is needed; history scan found no credential pattern; ignore rules added. |
| Input validation/sanitization | Not applicable | No user input or form. |
| Server authorization/role checks/admin separation | Not applicable | No server, user or admin surface. |
| Rate limiting | Not applicable | No endpoint. Reassess before forms/API. |
| Upload controls | Not applicable | No upload. |
| CORS allowlist | Not applicable | No credentialed API or private data. GitHub's public static `Access-Control-Allow-Origin: *` does not expose a privileged resource. |
| HTTPS redirect | Hosting check | HTTPS works; ensure GitHub Pages “Enforce HTTPS” remains enabled. |
| Secure cookies | Not applicable | The site sets no cookies. |
| CSRF | Not applicable | No state-changing request/session. |
| CSP and security headers | Partial | Meta CSP/referrer policy implemented; response-only headers require CDN/host. |
| XSS | Low current exposure | No untrusted input/sink. Generated runtime still needs unsafe inline/eval; rebuild recommended. |
| Dependency audit | Checked with limitation | OSV returned no advisory for the identified React 18.3.1 and ReactDOM 18.3.1 packages on 25 September 2026. The custom embedded export runtime has no package/lock manifest, so a reproducible rebuild is still recommended. |
| Error sanitization/logging | Not applicable/limited | No server logs or API errors; browser bundle error overlay contains technical data only. |
| Webhook signatures | Not applicable | No webhooks. |
| Backup/retention/deletion | Operational blocker | Repository backup exists through Git; mailbox/provider procedures must be confirmed and enacted. |
| Open redirect | Passed by inspection | No redirect parameter or navigation to user-controlled URL. |
| IDOR | Not applicable | No object IDs or private records. |

## Safe smoke/security tests

The local test set checks page responses, legal links, lack of tracking/storage/forms, CSP presence, stale addresses, unsafe secret patterns and placeholder blockers. No destructive or external attack is authorized or required for this static site.

## Legal basis for the changes

- FOD Economie requires company identity information to be easily, directly and permanently accessible, including name, address, direct contact methods, enterprise number and VAT number where applicable.
- GDPR Articles 5, 12–14, 24–25 and 32 support transparency, minimization, retention limits, accountability and risk-appropriate security.
- Belgian DPA/GBA guidance requires prior valid consent for non-essential cookies/tracking and an equally easy refusal/withdrawal path. Removing analytics avoids manufacturing an unnecessary consent flow.
- FAVV/AFSCA requires food-chain operators to hold the relevant registration/authorisation/approval and B2C food sellers to display the physical notice visibly at the establishment.
- FOD Economie requires price-reduction advertising to be accurate and, where the reference-price rule applies, to use the lowest price applied during the prior 30 days. The rule also applies to advertising that creates a measurable discount or “promo” impression.

This audit is a technical and operational compliance improvement, not legal advice and not a guarantee against fines or claims.
