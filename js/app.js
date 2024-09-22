document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then(createProducts)
    .catch((error) => console.error("Error fetching products:", error));

  function createProducts(products) {
    products.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);

      const counterElement = productElement.querySelector(
        ".product__counter span"
      );
      const button = productElement.querySelector("button");

      startCountdown(
        counterElement,
        button,
        Math.floor(Math.random() * 10 * 60) + 1
      );
    });
  }

  function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
              <img class="product__image" src="${product.image}" alt="${product.title}">  

              <h2 class="product__title">${product.title}</h2>
              <p class="product__price">$${product.price}</p>  

              <div class="product__actions">
                <div class="product__counter">Tiempo: <span></span></div>
                <button class="product__button">Comprar</button>
              </div>
            `;

    return productElement;
  }

  function startCountdown(counterElement, button, time) {
    const intervalId = setInterval(() => {
      if (time > 0) {
        time--;
        counterElement.textContent = formatTime(time);
      } else {
        button.disabled = true;
        clearInterval(intervalId);
      }
    }, 1000);
  }
});
