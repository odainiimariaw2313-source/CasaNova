'use strict';

const page = document.body.dataset.page;
const pages = [
  ['home', 'index.html', 'Pagina principală'],
  ['about', 'despre.html', 'Despre noi'],
  ['products', 'produse.html', 'Produse'],
  ['services', 'servicii.html', 'Servicii'],
  ['contact', 'contact.html', 'Contact'],
  ['reviews', 'recenzii.html', 'Recenzii']
];

const header = document.querySelector('#site-header');
header.innerHTML = `<div class="topbar container">
  <a class="brand" href="index.html" aria-label="CasaNova Design, pagina principală"><span class="brand-mark">CD</span><span>CasaNova Design</span></a>
  <form class="search" action="produse.html" role="search"><input type="search" name="q" placeholder="Caută" aria-label="Caută produse"><button aria-label="Caută" type="submit"><i class="bi bi-search" aria-hidden="true"></i></button></form>
  <div class="header-icons"><span title="Favorite — în curând" aria-label="Favorite — în curând"><i class="bi bi-heart" aria-hidden="true"></i></span><span title="Cont — în curând" aria-label="Cont — în curând"><i class="bi bi-person-circle" aria-hidden="true"></i></span><span title="Coș demonstrativ" aria-label="Coș demonstrativ"><i class="bi bi-cart3" aria-hidden="true"></i><small id="cart-count"></small></span><span title="Limba română" aria-label="Limba română"><i class="bi bi-globe" aria-hidden="true"></i><small>RO</small></span></div>
</div><nav class="nav" aria-label="Navigare principală"><div class="nav-inner">${pages.map(([key, url, label]) => `<a href="${url}"${page === key || (page === 'product' && key === 'products') ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</div></nav>`;

document.querySelector('#site-footer').innerHTML = `<div class="footer"><div class="container"><div class="footer-grid">
  <div><a class="brand" href="index.html"><span class="brand-mark">CD</span><span>CasaNova Design</span></a><p><i class="bi bi-telephone-fill" aria-hidden="true"></i> &nbsp; <a href="tel:+37368123456" style="display:inline">+373 68 123 456</a></p><p><i class="bi bi-envelope-fill" aria-hidden="true"></i> &nbsp; <a href="mailto:contact@casanovadesign.md" style="display:inline">contact@casanovadesign.md</a></p><p aria-label="Instagram, Pinterest, Facebook, LinkedIn, Twitter"><i class="bi bi-instagram" aria-hidden="true"></i> &nbsp; <i class="bi bi-pinterest" aria-hidden="true"></i> &nbsp; <i class="bi bi-facebook" aria-hidden="true"></i> &nbsp; <i class="bi bi-linkedin" aria-hidden="true"></i> &nbsp; <i class="bi bi-twitter" aria-hidden="true"></i></p></div>
  <div>Contul meu<br>Autentificare<br>Creați cont<br>Comenzi<br>Favorite<br>Compară produse</div>
  <div>Info Center<a href="despre.html">Despre noi</a><a href="contact.html">Contact</a><a href="servicii.html">Servicii</a><a href="recenzii.html">Recenzii</a></div>
  <div>Termeni și condiții generale<br>Politica de confidențialitate<br>Procedura de reclamații<br>Modificarea acordului privind cookie-urile</div>
  </div><p class="copyright">© 2025 CASANOVA DESIGN S.R.L. Toate drepturile rezervate.</p></div></div>`;

const heroContent = {
  home: ['CasaNova Design', 'De la idee la realitate — CasaNova Design îți oferă mobilier personalizat, creat pentru stilul tău de viață.'],
  about: ['Despre noi', 'La CasaNova Design, transformăm spațiile în locuri care inspiră. Suntem aici pentru a aduce armonie în fiecare colț al casei tale.'],
  products: ['Catalog', 'Explorează catalogul nostru complet și găsește mobilierul perfect pentru fiecare cameră. Stiluri moderne, linii curate și materiale premium — tot ce ai nevoie pentru un interior armonios.'],
  services: ['Servicii', 'La CasaNova Design, îți oferim soluții complete – de la mobilier la comandă, la proiectare 3D și montaj profesionist – pentru a transforma orice spațiu într-un loc funcțional, armonios și plin de personalitate.'],
  contact: ['Contact', 'Ai întrebări, ai nevoie de o ofertă personalizată sau vrei să discutăm despre proiectul tău de mobilier? Echipa CasaNova Design îți răspunde rapid și cu drag. Scrie-ne, sună-ne sau vizitează-ne în showroom — și facem împreună primul pas către spațiul tău perfect.'],
  reviews: ['Recenzii', 'Descoperă experiențele clienților noștri și poveștile din spatele proiectelor CasaNova Design.']
};
const hero = document.querySelector('#hero');
if (hero && heroContent[page]) {
  const [title, description] = heroContent[page];
  hero.innerHTML = `<section class="hero"><div class="hero-inner container"><div class="hero-copy"><h1>${title}</h1><em>Simplicitate. Lumină. Armonie.</em><p>${description}</p></div><div class="hero-images"><img class="hero-kitchen" src="assets/hero-kitchen.jpg" alt="Bucătărie modernă"><img class="hero-living" src="assets/hero-living.jpg" alt="Living confortabil"><div class="hero-badge"><strong>1000+</strong>Vânzări anuale</div></div></div></section>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));
}
function imageUrl(value) {
  try {
    const url = new URL(value, location.href);
    if (url.protocol === 'https:' || url.origin === location.origin) return escapeHtml(url.href);
  } catch (error) {
    console.error('Adresă imagine invalidă:', error);
  }
  return '';
}
function productCard(product, recommendation = false) {
  const name = escapeHtml(product.name);
  const description = escapeHtml(product.description);
  const price = escapeHtml(product.price);
  const url = `produs.html?id=${encodeURIComponent(product.id)}`;
  const image = `<img class="catalog-image" src="${imageUrl(product.image_url)}" alt="${name}" loading="lazy">`;
  if (recommendation) return `<article class="recommendation"><a href="${url}">${image}<h3>${name}</h3></a><p>${description}</p><p>Preț demonstrativ: ${price} lei</p><a href="${url}">Află mai mult</a></article>`;
  return `<article class="product-card"><a href="${url}">${image}<h3>${name}</h3></a><strong>${price} lei</strong></article>`;
}
async function getProducts(params) {
  let response;
  let data;
  try {
    response = await fetch(`api/products.php?${params}`);
    data = await response.json();
  } catch (error) {
    console.error('Eroare la conectarea la API:', error);
    throw new Error('Catalogul nu este disponibil momentan. Verifică conexiunea sau încearcă mai târziu.');
  }
  if (!response.ok) throw new Error(data.error || 'Catalogul nu este disponibil momentan.');
  return data;
}
function showCatalogError(element, error) {
  console.error('Eroare catalog:', error);
  element.innerHTML = `<p class="catalog-error" role="alert">${escapeHtml(error.message || 'Catalogul nu este disponibil momentan.')}</p>`;
}
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement && event.target.classList.contains('catalog-image')) {
    const message = document.createElement('p');
    message.className = 'catalog-error';
    message.textContent = 'Imaginea produsului nu este disponibilă.';
    event.target.replaceWith(message);
  }
}, true);
const catalog = document.querySelector('#catalog-results');
const productFilters = document.querySelector('#product-filters');
if (catalog && productFilters) {
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const initialCategory = [...productFilters.elements.category].find(input => input.value === category);
  if (initialCategory) initialCategory.checked = true;
  let searchTerm = (params.get('q') || '').trim().toLocaleLowerCase('ro');
  let requestNumber = 0;
  async function renderCatalog(pageNumber = 1) {
    const request = ++requestNumber;
    const data = new FormData(productFilters);
    const query = new URLSearchParams({page: String(pageNumber), q: searchTerm});
    data.getAll('category').forEach(value => query.append('category[]', value));
    for (const name of ['min', 'max']) if (data.get(name) !== '') query.set(name, data.get(name));
    catalog.innerHTML = '<p>Se încarcă produsele...</p>';
    try {
      const result = await getProducts(query);
      if (request !== requestNumber) return;
      if (!result.products.length) {
        catalog.innerHTML = '<p>Nu am găsit produse pentru criteriile selectate.</p>';
        return;
      }
      const totalPages = Math.ceil(result.total / result.limit);
      catalog.innerHTML = `<p>${result.total} produse demonstrative</p><div class="product-grid">${result.products.map(product => productCard(product)).join('')}</div><div class="pagination"><button class="button" type="button" data-page-number="${pageNumber - 1}" ${pageNumber <= 1 ? 'disabled' : ''}>Înapoi</button><span>Pagina ${pageNumber} din ${totalPages}</span><button class="button" type="button" data-page-number="${pageNumber + 1}" ${pageNumber >= totalPages ? 'disabled' : ''}>Înainte</button></div>`;
    } catch (error) {
      if (request === requestNumber) showCatalogError(catalog, error);
    }
  }
  catalog.addEventListener('click', event => {
    const button = event.target.closest('[data-page-number]');
    if (button) renderCatalog(Number(button.dataset.pageNumber));
  });
  productFilters.addEventListener('submit', event => { event.preventDefault(); renderCatalog(1); });
  productFilters.addEventListener('reset', () => { searchTerm = ''; setTimeout(() => renderCatalog(1), 0); });
  renderCatalog();
}
const recommended = document.querySelector('#recommended');
if (recommended) {
  recommended.innerHTML = '<p>Se încarcă produsele...</p>';
  getProducts(new URLSearchParams({limit: '4'}))
    .then(result => { recommended.innerHTML = result.products.length ? result.products.map(product => productCard(product, true)).join('') : '<p>Nu există produse în catalog.</p>'; })
    .catch(error => showCatalogError(recommended, error));
}
const productDetail = document.querySelector('#product-detail');
if (productDetail) {
  const id = new URLSearchParams(location.search).get('id');
  if (!id) {
    productDetail.innerHTML = '<p>Selectează un produs din <a href="produse.html">catalog</a>.</p>';
  } else {
    getProducts(new URLSearchParams({id})).then(({product}) => {
      document.title = `CasaNova Design | ${product.name}`;
      const name = escapeHtml(product.name);
      productDetail.innerHTML = `<div class="product-layout"><div class="product-image-wrap"><img class="product-main-image catalog-image" src="${imageUrl(product.image_url)}" alt="${name}"><div class="product-details"><section><h2><i class="bi bi-clipboard2-check" aria-hidden="true"></i> &nbsp; Descrierea produsului</h2><p class="product-detail-text">${escapeHtml(product.description)}</p></section></div></div><aside class="product-aside"><h1>${name}</h1><p>${escapeHtml(product.category)} / ${escapeHtml(product.product_group)}</p><p>Produs demonstrativ. Prețul și descrierea nu reprezintă o ofertă comercială.</p><div class="purchase"><strong>${escapeHtml(product.price)} lei</strong><div class="purchase-actions"><label>Cantitate <input id="quantity" type="number" min="1" value="1"></label><button type="button" data-add-cart>Adaugă în coș</button></div><div><h2><i class="bi bi-truck" aria-hidden="true"></i> &nbsp; Livrare</h2><p>Informațiile despre livrare vor fi disponibile ulterior.</p></div></div></aside></div>`;
    }).catch(error => showCatalogError(productDetail, error));
  }
}

const reviews = [
  {name:'Mihaela Flori', date:'09.08.2025', category:'Servicii', rating:5, text:'Proiectarea 3D a fost extrem de utilă — am văzut exact cum va arăta mobilierul în casă și am putut ajusta fiecare detaliu înainte de producție.'},
  {name:'Dorin Musteață', date:'07.02.2025', category:'Servicii', rating:5, text:'Echipa de montaj a lucrat impecabil: rapid, curat și profesionist. Totul s-a potrivit perfect în spațiu.'},
  {name:'Cristina Rotaru', date:'12.04.2025', category:'Servicii', rating:4, text:'Consultanța lor m-a ajutat enorm; au propus soluții inteligente pentru un living mic, iar rezultatul final este peste așteptări.'},
  {name:'Fedor Apuseanu', date:'03.09.2025', category:'Produse', rating:4, text:'Canapeaua pe care am comandat-o este super confortabilă, materialul calitativ și finisajul foarte elegant.'},
  {name:'Florin Valentinescu', date:'19.11.2025', category:'Produse', rating:4, text:'Scaunele sunt solide și bine lucrate, exact pe gustul meu. Se potrivesc perfect cu masa din dining.'},
  {name:'George Onofrei', date:'2025', category:'Produse', rating:5, text:'Suportul de perete cu poliță este atât practic, cât și frumos — un detaliu care schimbă complet camera.'},
  {name:'Popescu Ion', date:'27.06.2025', category:'Produse', rating:5, text:'Ghivecele ceramice de perete sunt superbe și adaugă o notă proaspătă și modernă în bucătărie.'}
];
function reviewCard(review) {
  return `<article class="review-card"><span class="stars"><i class="bi bi-star-fill" aria-hidden="true"></i> ${review.rating}</span><h3>${review.name}</h3><p class="review-meta">${review.date}, Moldova</p><blockquote>„${review.text}”</blockquote><p>Achiziție verificată</p></article>`;
}
const reviewFilters = document.querySelector('#review-filters');
if (reviewFilters) {
  function renderReviews() {
    const data = new FormData(reviewFilters);
    const selected = data.getAll('category');
    const filtered = reviews.filter(r => (!selected.length || selected.includes(r.category)) && r.rating >= Number(data.get('rating')));
    for (const [id, category] of [['service-reviews', 'Servicii'], ['store-reviews', 'Produse']]) {
      const items = filtered.filter(r => r.category === category);
      document.getElementById(id).innerHTML = items.length ? items.map(reviewCard).join('') : '<p>Nu există recenzii pentru criteriile selectate.</p>';
    }
  }
  reviewFilters.addEventListener('submit', event => { event.preventDefault(); renderReviews(); });
  reviewFilters.addEventListener('reset', () => setTimeout(renderReviews, 0));
  renderReviews();
}
const aboutReviews = document.querySelector('#about-reviews');
if (aboutReviews) aboutReviews.innerHTML = reviews.slice(0, 6).map(reviewCard).join('');
document.querySelectorAll('[data-contact-form]').forEach(container => {
  container.innerHTML = `<form class="contact-form"><div class="form-row"><label>Nume/Prenume<input name="name" autocomplete="name" required></label><label>Email<input type="email" name="email" autocomplete="email" required></label></div><label>Tipul serviciului<input name="service" required></label><label>Mesaj (opțional)<textarea name="message"></textarea></label><button class="button" type="submit">Trimite</button><p class="form-message" role="status"></p></form>`;
  container.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    container.querySelector('.form-message').textContent = 'Formularul este demonstrativ și nu trimite încă mesaje. Integrarea va fi disponibilă ulterior.';
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('[data-add-cart]')) return;
  const quantity = document.querySelector('#quantity');
  if (!quantity.reportValidity()) return;
  const notice = document.createElement('div');
  notice.className = 'notice';
  notice.setAttribute('role', 'status');
  notice.textContent = 'Coșul este demonstrativ. Comenzile vor fi disponibile după integrare.';
  document.querySelector('.notice')?.remove();
  document.body.append(notice);
  setTimeout(() => notice.remove(), 5000);
});
