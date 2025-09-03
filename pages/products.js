import { buscarProdutos } from "../services/api.js";
import { renderProductCard } from "../components/productCard.js";

export function renderProductsPage() {
  const container = document.createElement("section");
  container.innerHTML = "<h2>Lista de Produtos</h2><div class='grid'></div>";
  const grid = container.querySelector(".grid");

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  function alternarFavorito(produto) {
    const atualizados = favoritos.some(f => f.id === produto.id)
      ? favoritos.filter(f => f.id !== produto.id)
      : [...favoritos, produto];
    localStorage.setItem("favoritos", JSON.stringify(atualizados));
    location.reload();
  }

  buscarProdutos().then(produtos => {
    const filtroCategoria = document.getElementById("categoryFilter");
    const filtroPreco = document.getElementById("priceFilter");
    const campoBusca = document.getElementById("searchInput");

    const categorias = [...new Set(produtos.map(p => p.category))];
    categorias.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      filtroCategoria.appendChild(opt);
    });

    function renderizarLista() {
      grid.innerHTML = "";
      let filtrados = [...produtos];

      if (campoBusca.value) {
        filtrados = filtrados.filter(p => p.title.toLowerCase().includes(campoBusca.value.toLowerCase()));
      }

      if (filtroCategoria.value) {
        filtrados = filtrados.filter(p => p.category === filtroCategoria.value);
      }

      if (filtroPreco.value) {
        filtrados = filtrados.filter(p => {
          if (filtroPreco.value === "low") return p.price <= 50;
          if (filtroPreco.value === "medium") return p.price > 50 && p.price <= 150;
          if (filtroPreco.value === "high") return p.price > 150;
        });
      }

      filtrados.forEach(p => {
        const ehFav = favoritos.some(f => f.id === p.id);
        grid.appendChild(renderProductCard(p, ehFav, alternarFavorito));
      });
    }

    campoBusca.addEventListener("input", renderizarLista);
    filtroCategoria.addEventListener("change", renderizarLista);
    filtroPreco.addEventListener("change", renderizarLista);

    renderizarLista();
  });

  return container;
}