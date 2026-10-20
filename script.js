/* ===== EDITE AQUI: antes = preço antigo (opcional, pode apagar) ===== */
const produtos = [
  {nome:"Fone Bluetooth sem fio",         cat:"Eletrônicos", preco:39.90, antes:79.90, emoji:"🎧", cor:"#BFD9FF", link:"https://shopee.com.br/"},
  {nome:"Kit organizador de gavetas",     cat:"Casa",        preco:24.90, antes:39.90, emoji:"🧺", cor:"#FFD9A8", link:"https://shopee.com.br/"},
  {nome:"Sérum facial vitamina C",        cat:"Beleza",      preco:29.90, antes:59.90, emoji:"🧴", cor:"#FFC2D6", link:"https://shopee.com.br/"},
  {nome:"Luminária LED de mesa",          cat:"Casa",        preco:34.90, antes:54.90, emoji:"💡", cor:"#FFF0A6", link:"https://shopee.com.br/"},
  {nome:"Capinha transparente reforçada", cat:"Eletrônicos", preco:12.90,               emoji:"📱", cor:"#C8F2DA", link:"https://shopee.com.br/"},
  {nome:"Garrafa térmica 500 ml",         cat:"Casa",        preco:27.90, antes:44.90, emoji:"🥤", cor:"#D9CCFF", link:"https://shopee.com.br/"},
  {nome:"Kit de pincéis de maquiagem",    cat:"Beleza",      preco:19.90, antes:35.90, emoji:"🖌️", cor:"#FFCFE9", link:"https://shopee.com.br/"},
  {nome:"Mini caixa de som portátil",     cat:"Eletrônicos", preco:44.90, antes:89.90, emoji:"🔊", cor:"#FFD2C2", link:"https://shopee.com.br/"}
];
/* ================================================================= */
// Atalho para pegar um elemento da página pelo id
const $=id=>document.getElementById(id);
const cats=["Todos",...new Set(produtos.map(p=>p.cat))];
let atual="Todos", termo="";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const brl=n=>n.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});

// Desenha os botões de categoria (Todos, Casa, Beleza...)
function chips(){
  $("chips").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===atual}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
}
// Filtra os produtos pela categoria e pela busca e desenha os cards
function lista(){
  const t=termo.trim().toLowerCase();
  const f=produtos.filter(p=>(atual==="Todos"||p.cat===atual)&&(!t||p.nome.toLowerCase().includes(t)));
  $("count").textContent=atual==="Todos"?"Ofertas de hoje":atual;
  $("grid").innerHTML=f.length?f.map(p=>{
    const d=p.antes?Math.round((1-p.preco/p.antes)*100):0;
    return `<article class="card">
      <div class="pic" style="background:${p.cor}" aria-hidden="true">${p.emoji}${d>0?`<span class="off">-${d}%</span>`:""}</div>
      <div class="body">
        <h3 class="name">${esc(p.nome)}</h3>
        <span class="cat">${esc(p.cat)}</span>
        ${p.antes?`<span class="old">R$ ${brl(p.antes)}</span>`:""}
        <span class="price"><small>R$</small> ${brl(p.preco)}</span>
        <a class="buy" href="${esc(p.link)}" target="_blank" rel="noopener sponsored">Comprar na Shopee</a>
      </div></article>`}).join(""):`<p class="vazio">Nenhum produto encontrado. Tente outra busca.</p>`;
}
// Quando clica numa categoria, guarda ela e redesenha
$("chips").addEventListener("click",e=>{const b=e.target.closest(".chip");if(b){atual=b.dataset.c;chips();lista()}});
// Quando digita na busca, redesenha a lista
$("busca").addEventListener("input",e=>{termo=e.target.value;lista()});
// Primeira vez que a página abre
chips();lista();
