const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').value;

    const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage
    };

    // Send the new product to the Node.js server
    fetch('https://shubhamstore.azurewebsites.net/api/products', { // Ensure this matches the server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data);
        productForm.reset();
        alert('Product added successfully!');
    })
    .catch((error) => {
        console.error('Error adding product:', error);
    });
});
