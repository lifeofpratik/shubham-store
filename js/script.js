// Dynamically load products on page load
window.onload = function () {
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    const productList = document.getElementById('product-list');
    products.forEach(function (product) {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <p class="product-name">${product.name}</p>
        <p class="product-price">₹${product.price} per kg</p>
      `;
      productList.appendChild(productDiv);
    });
  };
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', function () {
    let filter = this.value.toLowerCase();
    let products = document.querySelectorAll('.product');
  
    products.forEach(function (product) {
      let productName = product.querySelector('.product-name').textContent.toLowerCase();
      if (productName.indexOf(filter) > -1) {
        product.style.display = '';
      } else {
        product.style.display = 'none';
      }
    });
  });
  