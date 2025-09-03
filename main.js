import { renderHeader } from "./components/header.js";
import { renderProductsPage } from "./pages/products.js";
import { renderFavoritesPage } from "./pages/favorites.js";

const app = document.getElementById("app");

function roteador(rotagem) {
  app.innerHTML = "";
  app.appendChild(renderHeader(rotagem));

  if (rotagem === "favoritos") {
    app.appendChild(renderFavoritesPage());
  } else {
    app.appendChild(renderProductsPage());
  }
}

window.addEventListener("hashchange", () => {
  const rotagem = location.hash.replace("#", "");
  roteador(rotagem);
});

roteador(location.hash.replace("#", ""));