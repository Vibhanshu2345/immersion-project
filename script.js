let products = [];
let currentProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  products = data.products;
  currentProducts = [...products];
  displayProducts(currentProducts);
}

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Price: ₹${product.price}</p>
        <p>Rating: ${product.rating}</p>
      </div>
    `;
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Search field cannot be empty!");
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.products) {
        currentProducts = data.products;
        displayProducts(currentProducts);
      } else {
        currentProducts = [];
        displayProducts([]);
      }
    });
}

function sortProducts() {
  const sortBy = document.getElementById("sortBy").value;
  let sorted = [...currentProducts];

  if (sortBy === "priceAsc") sorted.sort((a, b) => a.price - b.price);
  else if (sortBy === "priceDesc") sorted.sort((a, b) => b.price - a.price);
  else if (sortBy === "ratingAsc") sorted.sort((a, b) => a.rating - b.rating);
  else if (sortBy === "ratingDesc") sorted.sort((a, b) => b.rating - a.rating);

  currentProducts = sorted;
  displayProducts(currentProducts);
}