const phoneNumber = '355682048887';
const products = [
  {cat:'iphone', name:'iPhone 16 Pro Max', storage:'256GB', color:'Natural Titanium', price:'from 1,349€', finish:'#bfc2c7', type:'phone'},
  {cat:'iphone', name:'iPhone 16 Pro', storage:'128GB / 256GB', color:'Black Titanium', price:'from 1,149€', finish:'#3b3d42', type:'phone'},
  {cat:'iphone', name:'iPhone 16 Plus', storage:'128GB', color:'Ultramarine', price:'from 949€', finish:'#7ba7ff', type:'phone'},
  {cat:'iphone', name:'iPhone 16', storage:'128GB', color:'White / Black', price:'from 849€', finish:'#f4f4f4', type:'phone'},
  {cat:'iphone', name:'iPhone 15 Pro Max', storage:'256GB', color:'Blue Titanium', price:'Ask availability', finish:'#586478', type:'phone'},
  {cat:'airpods', name:'AirPods Pro 2', storage:'USB-C Case', color:'White', price:'from 249€', finish:'#ffffff', type:'pods'},
  {cat:'airpods', name:'AirPods Max', storage:'Over‑Ear', color:'Space Gray', price:'from 579€', finish:'#55585f', type:'pods'},
  {cat:'watch', name:'Apple Watch Ultra', storage:'49mm GPS + Cellular', color:'Titanium', price:'from 799€', finish:'#c5c1b7', type:'watch'},
  {cat:'watch', name:'Apple Watch Series 10', storage:'GPS / Cellular', color:'Jet Black', price:'from 429€', finish:'#151515', type:'watch'},
  {cat:'mac', name:'MacBook Air M3', storage:'13” / 15”', color:'Midnight', price:'from 1,099€', finish:'#2d3442', type:'mac'},
  {cat:'mac', name:'MacBook Pro M4', storage:'14” / 16”', color:'Space Black', price:'from 1,899€', finish:'#1e1f22', type:'mac'},
  {cat:'airpods', name:'MagSafe Accessories', storage:'Cases / Chargers', color:'White', price:'from 29€', finish:'#fafafa', type:'pods'}
];

function whatsappLink(message){ return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; }

function renderProducts(filter='all'){
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <article class="product-card reveal" data-category="${p.cat}" id="${p.cat}">
      <div class="product-visual">
        <div class="mock-device ${p.type}" style="--finish:${p.finish}"></div>
      </div>
      <div class="product-info">
        <span class="badge">Available / Reserve now</span>
        <h3>${p.name}</h3>
        <div class="specs"><span>${p.storage}</span><span>${p.color}</span><span>Europe CE</span><span>Warranty</span></div>
        <div class="price-row"><span class="price">${p.price}</span><button class="whatsapp-card" data-product="${p.name} ${p.storage} ${p.color}">Reserve</button></div>
      </div>
    </article>
  `).join('');
  bindProductButtons();
  revealNow();
}

function bindProductButtons(){
  document.querySelectorAll('[data-product]').forEach(btn => {
    const product = btn.dataset.product;
    btn.onclick = () => { window.open(whatsappLink(`Hi Molla Shop, I want to reserve ${product}. Is it available today?`), '_blank'); };
  });
}

function revealNow(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); } });
  },{threshold:.14});
  document.querySelectorAll('.reveal:not(.show)').forEach(el=>obs.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>document.querySelector('.loader')?.classList.add('hide'), 750);
  renderProducts();
  revealNow();

  document.querySelectorAll('[data-whatsapp]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      window.open(whatsappLink(a.dataset.whatsapp), '_blank');
    });
  });

  document.querySelectorAll('.filter').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });

  const stack = document.querySelector('[data-parallax]');
  if(stack){
    window.addEventListener('mousemove', e=>{
      const x = (e.clientX / innerWidth - .5) * 18;
      const y = (e.clientY / innerHeight - .5) * -18;
      stack.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }
});
