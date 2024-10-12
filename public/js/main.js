const productList = document.getElementById('productList');

async function displayProducts() {
    const response = await fetch('https://shubhamstore.azurewebsites.net/api/products');
    const products = await response.json();
    renderProducts(products);
}

function renderProducts(products) {
    productList.innerHTML = ''; // Clear the list
    products.forEach(product => {
        const li = document.createElement('li');
        li.className = 'product-item';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.className = 'product-image';

        const details = document.createElement('div');
        details.className = 'product-details';
        details.innerHTML = `<strong>${product.name}</strong><br><span class="product-price">Price: $${product.price} per kg</span>`;

        li.appendChild(img);
        li.appendChild(details);
        productList.appendChild(li);
    });
}

// Initial call to display products
displayProducts();
