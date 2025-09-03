import { renderProductCard } from "../components/productCard.js";

export function renderFavoritesPage() {
  const container = document.createElement("section");
  container.innerHTML = "<h2>Seus Favoritos</h2><div class='grid'></div>";
  const grid = container.querySelector(".grid");

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  function alternarFavorito(produto) {
    const atualizados = favoritos.filter(f => f.id !== produto.id);
    localStorage.setItem("favoritos", JSON.stringify(atualizados));
    location.reload();
  }

  favoritos.forEach(p => {
    grid.appendChild(renderProductCard(p, true, alternarFavorito));
  });

  return container;
}