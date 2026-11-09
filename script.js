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
  <form class="search" action="produse.html" role="search"><input type="search" name="q" placeholder="Caută" aria-label="Caută produse"><button aria-label="Caută" type="submit">⌕</button></form>
  <div class="header-icons"><span title="Favorite — în curând" aria-label="Favorite — în curând">♡</span><span title="Cont — în curând" aria-label="Cont — în curând">♙</span><span title="Coș demonstrativ" aria-label="Coș demonstrativ">🛒<small id="cart-count"></small></span><span title="Limba română" aria-label="Limba română">◎<small>RO</small></span></div>
</div><nav class="nav" aria-label="Navigare principală"><div class="nav-inner">${pages.map(([key, url, label]) => `<a href="${url}"${page === key || (page === 'product' && key === 'products') ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</div></nav>`;

document.querySelector('#site-footer').innerHTML = `<div class="footer"><div class="container"><div class="footer-grid">
  <div><a class="brand" href="index.html"><span class="brand-mark">CD</span><span>CasaNova Design</span></a><p>☏ &nbsp; <a href="tel:+37368123456" style="display:inline">+373 68 123 456</a></p><p>✉ &nbsp; <a href="mailto:contact@casanovadesign.md" style="display:inline">contact@casanovadesign.md</a></p><p>◎ &nbsp; ◉ &nbsp; f &nbsp; in</p></div>
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

const products = [
  {name:'Scaun „Nordic Comfort”', price:450, rating:'4.0 (76)', category:'Bucătărie', group:'Scaune', image:'chairs-1', detail:true},
  {name:'Scaun „Albion Modern”', price:349, rating:'4.9 (36)', category:'Bucătărie', group:'Scaune', image:'chairs-2'},
  {name:'Celeste Upholstered Dining Chair', price:500, rating:'4.9 (28)', category:'Bucătărie', group:'Scaune', image:'chairs-3'},
  {name:'Wayne Dining Arm Chair', price:350, rating:'4.0 (45)', category:'Bucătărie', group:'Scaune', image:'chairs-4'},
  {name:'Delmar side chair', price:400, rating:'3.8 (6)', category:'Bucătărie', group:'Scaune', image:'chairs-5'},
  {name:'Designer Dining Chairs', price:370, rating:'5.0 (70)', category:'Bucătărie', group:'Scaune', image:'chairs-6'},
  {name:'Canapeaua Stockholm', price:3600, rating:'3.8 (19)', category:'Living', group:'Canapele', image:'sofas-1'},
  {name:'Designer sofa living', price:1000, rating:'5.0 (0)', category:'Living', group:'Canapele', image:'sofas-2'},
  {name:'JASIWAY Cotton Line Beige Sofa', price:4500, rating:'4.9 (28)', category:'Living', group:'Canapele', image:'sofas-3'},
  {name:'Canapea modernă', price:3500, rating:'4.0 (45)', category:'Living', group:'Canapele', image:'sofas-4'},
  {name:'Sunroom Sofa and Daybed', price:6900, rating:'3.8 (6)', category:'Living', group:'Canapele', image:'sofas-5'},
  {name:'Canapea elegantă', price:3700, rating:'5.0 (70)', category:'Living', group:'Canapele', image:'sofas-6'},
  {name:'Wall Hooks With Shelf Oak Wood', price:250, rating:'4.4 (20)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-1'},
  {name:'Ceramic Wall Planters', price:190, rating:'5.0 (35)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-2'},
  {name:'2 Pack White Ceramic Wall Vases', price:150, rating:'4.9 (28)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-3'},
  {name:'One high dark shelf', price:290, rating:'3.8 (6)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-4'},
  {name:'Multi-functional doorway shelf', price:550, rating:'5.0 (70)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-5'},
  {name:'Tapestry - 3D Model for VRay', price:270, rating:'5.0 (70)', category:'Decorațiuni', group:'Decorațiuni', image:'decor-6'}
];
function productCard(product) {
  const content = `<img src="assets/${product.image}.jpg" alt="${product.name}" loading="lazy"><span class="stars">★</span> ${product.rating}<h3>${product.name}</h3>`;
  return `<article class="product-card">${product.detail ? `<a href="produs.html">${content}</a>` : content}<strong>${product.price} lei</strong></article>`;
}
const catalog = document.querySelector('#catalog-results');
const productFilters = document.querySelector('#product-filters');
if (catalog && productFilters) {
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const initialCategory = [...productFilters.elements.category].find(input => input.value === category);
  if (initialCategory) initialCategory.checked = true;
  let searchTerm = (params.get('q') || '').trim().toLocaleLowerCase('ro');
  function renderCatalog() {
    const data = new FormData(productFilters);
    const selected = data.getAll('category');
    const min = data.get('min') === '' ? 0 : Number(data.get('min'));
    const max = data.get('max') === '' ? Infinity : Number(data.get('max'));
    const filtered = products.filter(p => (!selected.length || selected.includes(p.category)) && p.price >= min && p.price <= max && (!searchTerm || `${p.name} ${p.category} ${p.group}`.toLocaleLowerCase('ro').includes(searchTerm)));
    catalog.innerHTML = filtered.length ? [...new Set(filtered.map(p => p.group))].map(group => {
      const items = filtered.filter(p => p.group === group);
      return `<section class="catalog-group"><h2>${items[0].category}</h2><h3>${group}</h3><div class="product-grid">${items.map(productCard).join('')}</div></section>`;
    }).join('') : '<p>Nu am găsit produse pentru criteriile selectate.</p>';
  }
  productFilters.addEventListener('submit', event => { event.preventDefault(); renderCatalog(); });
  productFilters.addEventListener('reset', () => { searchTerm = ''; setTimeout(renderCatalog, 0); });
  renderCatalog();
}
const recommended = document.querySelector('#recommended');
if (recommended) {
  const items = [
    ['Scaun „Nordic Line”', 'Lemn natural + material textil rezistent.', '450'],
    ['Canapea „SoftSense”', 'Design scandinav, confort premium.', '4900'],
    ['Căsuță „HomeLight”', 'Element decorativ din lemn pentru living sau dormitor.', '1100'],
    ['Căsuță decorativă', 'Element decorativ din lemn pentru living sau dormitor.', '750']
  ];
  recommended.innerHTML = items.map(([name, description, price], i) => `<article class="recommendation"><img src="assets/recommended-${i + 1}.jpg" alt="${name}" loading="lazy"><h3>${name}</h3><p>${description}</p><p>Preț: ${price} lei</p><a href="produse.html">Vezi catalogul</a></article>`).join('');
}
const similar = document.querySelector('#similar-products');
if (similar) similar.innerHTML = products.slice(2, 6).map(productCard).join('');

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
  return `<article class="review-card"><span class="stars">★ ${review.rating}</span><h3>${review.name}</h3><p class="review-meta">${review.date}, Moldova</p><blockquote>„${review.text}”</blockquote><p>Achiziție verificată</p></article>`;
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
const productReviews = document.querySelector('#product-reviews');
if (productReviews) productReviews.innerHTML = [
  {name:'Ana Rotaru', date:'05.2025', rating:5, text:'Foarte comod și elegant — s-a potrivit perfect cu masa mea din bucătărie.'},
  {name:'Sofia Cârnaț', date:'02.2025', rating:5, text:'Lemn de calitate și montaj extrem de ușor, recomand cu încredere.'},
  {name:'Elisei Mazur', date:'02.2025', rating:5, text:'Culoarea este exact ca în poze, iar materialul șezutului se simte premium.'},
  {name:'Emil Vrănescu', date:'09.2025', rating:5, text:'Un scaun stabil și ergonomic, ideal pentru lucrul la birou.'}
].map(reviewCard).join('');

document.querySelectorAll('[data-contact-form]').forEach(container => {
  container.innerHTML = `<form class="contact-form"><div class="form-row"><label>Nume/Prenume<input name="name" autocomplete="name" required></label><label>Email<input type="email" name="email" autocomplete="email" required></label></div><label>Tipul serviciului<input name="service" required></label><label>Mesaj (opțional)<textarea name="message"></textarea></label><button class="button" type="submit">Trimite</button><p class="form-message" role="status"></p></form>`;
  container.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    container.querySelector('.form-message').textContent = 'Formularul este demonstrativ și nu trimite încă mesaje. Integrarea va fi disponibilă ulterior.';
  });
});
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#product-image').src = button.dataset.image;
}));
const cartButton = document.querySelector('[data-add-cart]');
if (cartButton) cartButton.addEventListener('click', () => {
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
