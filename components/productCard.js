export function renderProductCard(produto, ehFavorito, alternarFavorito) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${produto.image}" alt="${produto.title}" />
    <h3>${produto.title}</h3>
    <p>Preço: R$ ${produto.price}</p>
    <button>${ehFavorito ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}</button>
  `;

  card.querySelector("button").addEventListener("click", () => alternarFavorito(produto));
  return card;
}