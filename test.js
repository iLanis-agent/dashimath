const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.kombu) { let r; try { r = M.kombu(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'kombu ' + c.in); }
for (const c of E.bonito) { let r; try { r = M.bonito(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'bonito ' + c.in); }
for (const c of E.servings) { let r; try { r = M.servings(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'servings ' + c.in); }
// anchors
eq(M.kombu(1000, 1).kombuG, 10, 'anchor kombu');
eq(M.bonito(1000, 2.5).flakesG, 25, 'anchor bonito');
const sv = M.servings(4, 170);
eq(sv.stockMl, 680, 'anchor stock'); eq(sv.flakesG, 17, 'anchor flakes');
// invariant: kombu scales linearly
n++;
{ const a = M.kombu(333, 1.1), b = M.kombu(666, 1.1); if (Math.abs(a.kombuG * 2 - b.kombuG) > 0.02) { fail++; console.error('FAIL linear invariant'); } }
// errors
const errs = [
  () => M.kombu(0, 1), () => M.kombu(1000, 0), () => M.kombu(1000, 3),
  () => M.bonito(0, 2.5), () => M.bonito(1000, 0), () => M.bonito(1000, 6),
  () => M.servings(0, 170), () => M.servings(101, 170), () => M.servings(4, 50),
];
const msgs = ['water must be positive','kombu percent must be positive','over 2.5% kombu steeps bitter (labeled)',
  'water must be positive','bonito percent must be positive','over 5% flakes and the pot is breakfast (labeled)',
  'at least one serving','catering is a spreadsheet, not a card (labeled)','serving size outside the labeled 100-300 mL band'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
