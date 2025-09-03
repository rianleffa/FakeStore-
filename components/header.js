export function renderHeader(rotagemAtual) {
  const cabecalho = document.createElement("header");
  cabecalho.innerHTML = `
    <nav>
      <a href="#produtos" ${rotagemAtual !== "favoritos" ? 'class="active"' : ""}>Produtos</a>
      <a href="#favoritos" ${rotagemAtual === "favoritos" ? 'class="active"' : ""}>Favoritos</a>
    </nav>
    <div class="filters">
      <input type="text" id="searchInput" placeholder="Buscar produto..." />
      <select id="categoryFilter">
        <option value="">Todas as Categorias</option>
      </select>
      <select id="priceFilter">
        <option value="">Todos os Preços</option>
        <option value="low">Até R$50</option>
        <option value="medium">R$50 - R$150</option>
        <option value="high">Acima de R$150</option>
      </select>
    </div>
  `;
  return cabecalho;
}