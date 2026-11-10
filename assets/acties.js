(function () {
  'use strict';
  // Retired campaign endpoint: cached older pages must not recreate the offers.
  function mount() {
    const existing = document.getElementById('helin-acties');
    if (existing) existing.remove();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',mount); else mount();
}());
