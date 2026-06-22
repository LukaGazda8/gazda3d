/* ──────────────────────────────────────────────────────────────
   Gazda3D – košík (localStorage) + zdieľané dáta produktov
   Príklady cien sú orientačné, uprav podľa potreby.
   ────────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    id: "menovka-kluce",
    name: "Menovka na kľúče",
    price: 4.9,
    icon: "🔑",
    tag: "3D Tlač",
    desc: "Personalizovaná s tvojím menom, číslom bytu alebo obrázkom.",
  },
  {
    id: "tricko",
    name: "Tlač na tričko",
    price: 14.9,
    icon: "👕",
    tag: "Potlač",
    desc: "Vlastný dizajn, logo alebo fotka priamo vytlačená na tričko.",
  },
  {
    id: "nahradny-diel",
    name: "Náhradný diel",
    price: 6.9,
    icon: "🔧",
    tag: "Na mieru",
    desc: "Úchytky, pánty, kryty — čo sa zlomilo, vytlačíme znova.",
  },
  {
    id: "menovka-dvere",
    name: "Menovka na dvere",
    price: 9.9,
    icon: "🚪",
    tag: "3D Tlač",
    desc: "S menom alebo číslom bytu, rôzne štýly a farby.",
  },
  {
    id: "dekoracia",
    name: "Darček / dekorácia",
    price: 12.9,
    icon: "🎁",
    tag: "Dekorácia",
    desc: "Stojany, figúrky, organizéry — originálny darček na každú príležitosť.",
  },
];

const CART_KEY = "gazda3d_kosik";

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function formatEur(value) {
  return value.toFixed(2).replace(".", ",") + " €";
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function cartCount() {
  return readCart().reduce((n, item) => n + item.qty, 0);
}

function cartTotal() {
  return readCart().reduce((sum, item) => {
    const p = getProduct(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function addToCart(id, qty = 1) {
  const cart = readCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  writeCart(cart);
}

function setQty(id, qty) {
  let cart = readCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = qty;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
  writeCart(cart);
}

function removeItem(id) {
  writeCart(readCart().filter((i) => i.id !== id));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartUI();
}

/* ── Toast ─────────────────────────────────────────────────── */
function toast(message) {
  let host = document.querySelector(".toast-host");
  if (!host) {
    host = document.createElement("div");
    host.className = "toast-host";
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2200);
}

/* ── Vykreslenie košíka ────────────────────────────────────── */
function updateCartUI() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.style.display = count === 0 ? "none" : "inline-flex";
  });

  const body = document.getElementById("drawer-body");
  const footer = document.getElementById("drawer-footer");
  if (!body) return;

  const cart = readCart();
  if (cart.length === 0) {
    body.innerHTML =
      '<div class="drawer-empty"><span class="step-icon">🛒</span><p>Tvoj košík je prázdny.</p></div>';
    if (footer) footer.style.display = "none";
    return;
  }

  body.innerHTML = cart
    .map((item) => {
      const p = getProduct(item.id);
      if (!p) return "";
      return `
      <div class="cart-line" data-id="${p.id}">
        <div class="cart-line-img">${p.icon}</div>
        <div>
          <div class="cart-line-name">${p.name}</div>
          <div class="cart-line-price">${formatEur(p.price)}</div>
          <div class="qty-ctrl">
            <button data-dec aria-label="Menej">−</button>
            <span>${item.qty}</span>
            <button data-inc aria-label="Viac">+</button>
          </div>
        </div>
        <div>
          <div class="cart-line-sub">${formatEur(p.price * item.qty)}</div>
          <button class="cart-line-remove" data-remove>Odstrániť</button>
        </div>
      </div>`;
    })
    .join("");

  body.querySelectorAll(".cart-line").forEach((line) => {
    const id = line.dataset.id;
    const item = readCart().find((i) => i.id === id);
    line.querySelector("[data-inc]").onclick = () => setQty(id, item.qty + 1);
    line.querySelector("[data-dec]").onclick = () => setQty(id, item.qty - 1);
    line.querySelector("[data-remove]").onclick = () => removeItem(id);
  });

  if (footer) {
    footer.style.display = "flex";
    const totalEl = footer.querySelector("[data-cart-total]");
    if (totalEl) totalEl.textContent = formatEur(cartTotal());
  }
}

/* ── Drawer otvor/zavri ────────────────────────────────────── */
function openDrawer() {
  document.querySelector(".drawer-overlay")?.classList.add("open");
  document.querySelector(".drawer")?.classList.add("open");
}
function closeDrawer() {
  document.querySelector(".drawer-overlay")?.classList.remove("open");
  document.querySelector(".drawer")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  document.querySelectorAll("[data-open-cart]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openDrawer();
    })
  );
  document
    .querySelectorAll("[data-close-cart]")
    .forEach((el) => el.addEventListener("click", closeDrawer));

  // Pridať do košíka z katalógu
  document.querySelectorAll("[data-add]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.dataset.add;
      addToCart(id, 1);
      const p = getProduct(id);
      toast(`${p ? p.name : "Produkt"} pridaný do košíka`);
      openDrawer();
    })
  );
});
