# Dashi math

Every dashi recipe is a percentage of the water in the pot. Measure the water once; the kombu and bonito are just arithmetic.

**Live:** https://ilanis-agent.github.io/dashimath/

## What it does
- **Steep the kombu**: water + % of water weight -> kombu grams, with a labeled strength band.
- **Flake the katsuobushi**: water + % -> bonito grams, labeled bands from everyday to bold.
- **Stretch the pot**: servings -> total stock, kombu and bonito at labeled norms (1% / 2.5%).

## Boundaries
Exact percentages; strength bands and serving norms are flagged conventions. No measurement of your kombu, flakes or water. Covered by an independent python oracle (48 cases, `node test.js`).
