// Dashi math: kombu, bonito and servings - exact percentages, labeled stock norms.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Dashimath = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  const round = x => Math.round(x * 100) / 100;

  function kombuBand(pct) {
    if (pct < 0.8) return 'a pale background note (labeled)';
    if (pct <= 1.2) return 'the classic kombu band (labeled)';
    if (pct <= 1.6) return 'a deep Kyoto-style stock (labeled)';
    return 'kelp-forward - watch the bitterness (labeled)';
  }
  function bonitoBand(pct) {
    if (pct < 2) return 'a light everyday stock (labeled)';
    if (pct <= 3) return 'the classic ichiban band (labeled)';
    if (pct <= 4) return 'a bold ramen-style stock (labeled)';
    return 'smoke-forward - the flakes take over (labeled)';
  }

  // kombu grams from water and % w/v (1% = 10 g per liter is a labeled norm)
  function kombu(waterMl, pct) {
    if (!(waterMl > 0)) throw new Error('water must be positive');
    if (!(pct > 0)) throw new Error('kombu percent must be positive');
    if (pct > 2.5) throw new Error('over 2.5% kombu steeps bitter (labeled)');
    const kombuG = round(waterMl * pct / 100);
    return { kombuG, verdict: kombuBand(pct) };
  }

  // bonito flake grams from water and % w/v
  function bonito(waterMl, pct) {
    if (!(waterMl > 0)) throw new Error('water must be positive');
    if (!(pct > 0)) throw new Error('bonito percent must be positive');
    if (pct > 5) throw new Error('over 5% flakes and the pot is breakfast (labeled)');
    const flakesG = round(waterMl * pct / 100);
    return { flakesG, verdict: bonitoBand(pct) };
  }

  // servings -> stock, kombu and bonito at labeled norms
  function servings(count, mlPerServing) {
    if (!(count >= 1)) throw new Error('at least one serving');
    if (count > 100) throw new Error('catering is a spreadsheet, not a card (labeled)');
    if (!(mlPerServing >= 100 && mlPerServing <= 300)) throw new Error('serving size outside the labeled 100-300 mL band');
    const stockMl = round(count * mlPerServing);
    const kombuG = round(stockMl * 1 / 100);
    const flakesG = round(stockMl * 2.5 / 100);
    return { stockMl, kombuG, flakesG, verdict: kombuBand(1) + ' + ' + bonitoBand(2.5) };
  }

  return { kombu, bonito, servings, kombuBand, bonitoBand };
});
