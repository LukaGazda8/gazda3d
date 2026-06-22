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
  formulár) a zobrazí sa potvrdenie.
- **Doručenie**: Osobný odber (Rača, zdarma) alebo **Packeta Z‑BOX** (cez oficiálny
  widget na výber výdajného miesta; pripočíta poplatok za dopravu).
- **Platba**: Hotovosť pri prevzatí, Bankový prevod alebo **PayPal**
  (PayPal Smart Buttons – platba priamo na stránke).

## Konfigurácia platby a dopravy

Na začiatku `<script>` v `pokladna.html` sú konštanty (verejné kľúče, vkladajú sa
priamo do stránky):

```js
const PAYPAL_CLIENT_ID = "TODO_PAYPAL_CLIENT_ID"; // Live client-id z developer.paypal.com
const PACKETA_API_KEY  = "TODO_PACKETA_API_KEY";  // API kľúč widgetu z Packeta klientskej zóny
const PACKETA_SHIPPING = 2.99;                      // cena dopravy Z-BOX (€)
```

Kým nie sú kľúče vyplnené, PayPal aj Packeta sa zobrazia, ale slušne upozornia, že
chýba konfigurácia. Po doplnení reálnych kľúčov fungujú naživo.

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
