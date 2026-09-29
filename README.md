# helin-supermarkt-website

HELIN Supermarkt &amp; Slagerij — officiële website voor helinsupermarkt.be.

## Publicatiecontrole

De site is een statische GitHub Pages-site zonder formulier, account, API, betaling of online verkoop. Google Analytics is verwijderd; de huidige versie plaatst geen sitecookies of tracking en heeft daarom geen cookiebanner.

Demo-prijzen en kortingsclaims uit de oorspronkelijke export worden niet getoond. Activeer promoties pas opnieuw met bevestigde actuele prijzen, campagnedata en — waar de Belgische referentieprijsregel geldt — de juiste laagste prijs van de voorafgaande 30 dagen.

Voor publicatie:

1. Houd de gegevens in `config/company.json`, `legal.html` en `privacy.html` gelijk aan de actuele bedrijfs- en leveranciersgegevens.
2. Voeg een FAVV-registratie- of toelatingsnummer pas toe nadat dit rechtstreeks met HELIN of de bevoegde autoriteit is bevestigd.
3. Voer `node scripts/check-production.mjs` uit en los alle gemelde blokkers op vóór publicatie.
4. Controleer in GitHub Pages dat **Enforce HTTPS** actief is.
5. Plaats de HTTP-beveiligingsheaders uit `SECURITY.md` bij een CDN/reverse proxy; GitHub Pages biedt hiervoor geen projectconfiguratie.

Deze repository mag nooit geheime sleutels of persoonsgegevens bevatten. De browsercode en alle bestanden op GitHub Pages zijn publiek.
