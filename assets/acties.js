(function () {
  'use strict';
  // These offers were supplied for the November campaign. Remove them after
  // its review date unless the shop confirms that they are still current.
  const end = Date.parse('2026-11-09T23:59:59+01:00');
  const products = [
    ['Kippenvleugels','2,49','per kg','/assets/images/meat-catalog/tavuk-kanat.jpg'],
    ['Kipfilet','5,49','per kg','/assets/images/meat-catalog/tavuk-gogus.jpg'],
    ['Kipfilet 10 kg','49,99','per 10 kg · geldig t.e.m. 9 november','/assets/images/meat-catalog/tavuk-gogus.jpg'],
    ['Lamsbout','12,99','per kg','/assets/images/meat-catalog/kuzu-but.jpg'],
    ['Verse eieren','4,99','30 stuks','/assets/images/acties/eieren.png'],
    ['Ayran','5,99','20 stuks','/assets/images/acties/ayran.png'],
    ['Mis zonnebloemolie','1,99','900 ml','/assets/images/acties/zonnebloemolie.png'],
    ['Mr. Milk Böreklik','1,99','800 g','/assets/images/acties/boreklik.png'],
    ['Mr. Milk White Combi','1,99','800 g','/assets/images/acties/white-combi.png']
  ];
  function mount() {
    const existing = document.getElementById('helin-acties');
    if (Date.now() > end) { if (existing) existing.remove(); return; }
    const anchor = document.querySelector('#promoties');
    if (!anchor || existing) return;
    const section = document.createElement('section');
    section.id = 'helin-acties';
    section.className = 'helin-acties';
    section.setAttribute('aria-labelledby','helin-acties-title');
    section.innerHTML = '<div class="helin-acties-inner"><div class="helin-acties-head"><div><p class="helin-acties-kicker">HELIN SUPERMARKT &amp; SLAGERIJ</p><h2 id="helin-acties-title">Onze promoties</h2><p>Ontdek onze aanbiedingen in de winkel in Mortsel.</p></div><p class="helin-acties-place">Antwerpsestraat 11<br>2640 Mortsel</p></div><div class="helin-acties-grid">' + products.map(function(p) {
      return '<article class="helin-actie"><img src="' + p[3] + '" alt="' + p[0] + '" loading="lazy"><div class="helin-actie-body"><h3>' + p[0] + '</h3><div class="helin-actie-price">€ ' + p[1] + '</div><p>' + p[2] + '</p></div></article>';
    }).join('') + '</div></div>';
    anchor.parentNode.insertBefore(section, anchor);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount); else mount();
  new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});
  setInterval(mount, 60000);
}());
