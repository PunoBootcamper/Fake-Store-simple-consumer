// app.js
document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                let time = Math.floor(Math.random() * 10 * 60) + 1;

                productElement.innerHTML = `
                    <img class="product__image" src="${product.image}" alt="${product.title} >
                    <h2 class="product__title">${product.title}</h2>
                    <p class="product__price">$${product.price}</p>
                    <div class="product__actions">
                        <div class="product__counter">Tiempo: <span>${formatTime(time)}</span></div>
                        <button class="product__button">Comprar</button>
                    </div>
                `;

                const button = productElement.querySelector('button');
                const counterElement = productElement.querySelector('.product__counter span');

                const interval = setInterval(() => {
                    if (time > 0) {
                        time--;
                        counterElement.textContent = formatTime(time);
                        if (time === 0) {
                            button.disabled = true;
                            clearInterval(interval);
                        }
                    }
                }, 1000);

                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function formatTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
});