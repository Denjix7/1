const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");
const loudBtn = document.querySelector(".btn-more");

const BtnCat1 = document.querySelector(".nav-btn--e");
const BtnCat2 = document.querySelector(".nav-btn--j");
const BtnCat3 = document.querySelector(".nav-btn--m");
const BtnCat4 = document.querySelector(".nav-btn--w");

let localProducts = [];

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Цена: ${product.price}</p>
      <p>Категория: ${product.category}</p>
      <button class="delete-button">Удалить товар</button>
    `;

    productCard
      .querySelector(".delete-button")
      .addEventListener("click", () => {
        deleteProduct(product.id);
      });

    productList.appendChild(productCard);
  });
}

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=6");
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

async function addProduct(event) {
  event.preventDefault();

  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productCategory = document.getElementById("productCategory").value;

  const newProduct = {
    title: productName,
    price: parseFloat(productPrice),
    description: productDescription,
    category: productCategory,
  };

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) throw new Error("Ошибка при добавлении товара");
    const addedProduct = await response.json();

    localProducts.push(addedProduct);
    displayProducts(localProducts);

    alert("Товар успешно добавлен!");
    addProductForm.reset();
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    alert("Не удалось добавить товар. Пожалуйста, попробуйте позже.");
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw new Error("Ошибка при удалении товара");

    localProducts = localProducts.filter((product) => product.id !== productId);
    displayProducts(localProducts);

    alert("Товар успешно удален!");
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
    alert("Не удалось удалить товар. Пожалуйста, попробуйте позже.");
  }
}

async function fetchProductsMore() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

loudBtn.addEventListener("click", fetchProductsMore);
addProductForm.addEventListener("submit", addProduct);

fetchProducts();

// Работа с категориями

async function fetchCat1() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

BtnCat1.addEventListener("click", fetchCat1);

async function fetchCat2() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/jewelery"
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

BtnCat2.addEventListener("click", fetchCat2);

async function fetchCat3() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/men's clothing"
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

BtnCat3.addEventListener("click", fetchCat3);

async function fetchCat4() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/women's clothing"
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const products = await response.json();
    localProducts = products; // Сохраняем в локальную переменную
    displayProducts(localProducts);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

BtnCat4.addEventListener("click", fetchCat4);
