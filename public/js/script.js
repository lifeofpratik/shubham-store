function displayProducts() {
  const productList = document.getElementById('productList');

  database.ref('products').on('value', (snapshot) => {
      const products = snapshot.val() || {};
      productList.innerHTML = '';

      for (const id in products) {
          const product = products[id];
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
      }
  });
}

function addProduct(product) {
  const newProductRef = database.ref('products').push();
  newProductRef.set(product);
}
