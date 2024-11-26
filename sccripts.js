const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    alert("Не удалось загрузить товары. Пожалуйста, попробуйте позже.");
  }
}

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <p>Категория: ${product.category}</p>
            <button class="delete-button" onclick="deleteProduct(${product.id})">Удалить товар</button>
        `;
    productList.appendChild(productCard);
  });
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

    if (!response.ok) {
      throw new Error("Ошибка при добавлении товара");
    }

    const addedProduct = await response.json();
    alert("Товар успешно добавлен!");
    fetchProducts();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось добавить товар. Пожалуйста, попробуйте позже.");
  }
}
async function deleteProduct(productId) {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/${product.id}",
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при удалении товара");
    }

    alert("Товар успешно удален!");
    fetchProducts();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить товар. Пожалуйста, попробуйте позже.");
  }
}
addProductForm.addEventListener("submit", addProduct);
fetchProducts();