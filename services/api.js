export async function buscarProdutos() {
  const res = await fetch("https://fakestoreapi.com/products");
  const produtos = await res.json();

  const traducoes = {
    "men's clothing": "Roupas Masculinas",
    "women's clothing": "Roupas Femininas",
    "jewelery": "Joias",
    "electronics": "Eletrônicos"
  };

  return produtos.map(p => ({
    ...p,
    category: traducoes[p.category] || p.category,
    title: traduzirTitulo(p.title)
  }));
}

function traduzirTitulo(titulo) {
  const dicionario = {
    "T-Shirt": "Camiseta",
    "Shirt": "Camisa",
    "Jacket": "Jaqueta",
    "Backpack": "Mochila",
    "Shoes": "Sapatos",
    "Bag": "Bolsa",
    "Ring": "Anel",
    "Chain": "Corrente",
    "Laptop": "Notebook",
    "Hard Drive": "HD Externo",
    "Camera": "Câmera",
    "Headphones": "Fones de Ouvido"
  };

  let novoTitulo = titulo;
  Object.entries(dicionario).forEach(([en, pt]) => {
    if (novoTitulo.toLowerCase().includes(en.toLowerCase())) {
      novoTitulo = novoTitulo.replace(new RegExp(en, "ig"), pt);
    }
  });
  return novoTitulo;
}