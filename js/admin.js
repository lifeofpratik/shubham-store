window.onload = function() {
    const addProductForm = document.getElementById('addProductForm');
    
    if (addProductForm) {
        // Add event listener to the form for the submit event
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get the product details from the form
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productImage = document.getElementById('productImage').files[0];

            // Ensure all fields are filled
            if (productName && productPrice && productImage) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const productData = {
                        name: productName,
                        price: productPrice,
                        image: e.target.result // Base64 encoded image
                    };

                    // Retrieve the products array from localStorage or create a new one
                    let products = JSON.parse(localStorage.getItem('products')) || [];
                    products.push(productData); // Add new product to the array

                    // Save the updated products array to localStorage
                    localStorage.setItem('products', JSON.stringify(products));

                    // Display success message and clear the form
                    document.getElementById('productMessage').style.display = 'block';
                    addProductForm.reset(); // Reset the form fields
                };

                // Read the selected image file as a base64 string
                reader.readAsDataURL(productImage);
            } else {
                alert('Please fill out all fields.');
            }
        });
    } else {
        console.error("Form element not found");
    }
};
