# Gazda3D

Webstránka 3D tlače **Gazda3D** (Rača, Slovensko) — teraz s e‑shopom: katalóg
s cenami, košík a pokladňa. Čistý statický web (HTML/CSS/JS), bez build kroku,
hostovaný na GitHub Pages.

## Súbory

```
index.html      Úvod, katalóg, „ako to funguje“, formulár na vlastný projekt + košík (drawer)
pokladna.html   Pokladňa — súhrn košíka + objednávkový formulár (Formspree)
css/styles.css  Všetky štýly (pôvodný dizajn Gazda3D + štýly e‑shopu)
js/cart.js      Košík (localStorage) + zdieľané dáta produktov
favicon.svg, logo.svg, logo-1.svg
```

## Ako to funguje

- **Katalóg** – každý produkt má príkladovú cenu a tlačidlo „Do košíka“.
- **Košík** – vysúvací panel (drawer) vpravo, úprava množstva, medzisúčet,
  uložený v `localStorage` (prežije obnovenie stránky).
- **Pokladňa** (`pokladna.html`) – súhrn objednávky + kontaktný/dodací formulár.
  Po odoslaní sa objednávka pošle cez **Formspree** (rovnaký endpoint ako pôvodný
  formulár) a zobrazí sa potvrdenie. Platba prebieha pri prevzatí.

## Úprava cien a produktov

Ceny aj produkty sú na jednom mieste — pole `PRODUCTS` v `js/cart.js`. Stačí
upraviť `price` (číslo v EUR) alebo `name`/`desc`. Cenu zobrazenú v karte katalógu
uprav aj v `index.html` (`<span class="product-price">`). Príkladové ceny sú
orientačné — pokojne ich nahraď reálnymi.

## Lokálne spustenie

```bash
python3 -m http.server 8000
# otvor http://localhost:8000
```

## Nasadenie

Web je nasadený cez GitHub Pages na
<https://lukagazda8.github.io/gazda3d>.
