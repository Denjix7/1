const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm");
const loudBtn = document.querySelector(".btn-more");
const DelBtn = document.querySelector(".delete-button");

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
    productList.appendChild(productCard);
  });
}

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=6");
    const products = await response.json();
    displayProducts(products);
    return products;
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
    const response = await fetch("https://fakestoreapi.com/products/1", {
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
      "https://fakestoreapi.com/products?limit=6/${product.id}",
      {
        method: "DELETE",
      }
    );
    then((res) => res.json()).then((json) => console.log(json));
    if (!res.ok) {
      throw new Error("Ошибка при удалении товара");
    }
    alert("Товар успешно удален!");
    fetchProducts();
  } catch (error) {
    console.error("Ошибка:", error);
    alert("Не удалось удалить товар. Пожалуйста, попробуйте позже.");
  }
}

loudBtn.addEventListener("click", fetchProducts);
DelBtn.addEventListener("click", deleteProduct);
addProductForm.addEventListener("submit", addProduct);
fetchProducts();
