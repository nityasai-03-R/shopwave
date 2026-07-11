const productDetails = document.getElementById("product-details");

// Get id from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Fetch single product
async function fetchProduct(){

    try{

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        const product = await response.json();

        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <div class="info">
                <h2>${product.title}</h2>

                <p class="price">$${product.price}</p>

                <p><strong>Category:</strong> ${product.category}</p>

                <p><strong>Description:</strong></p>
                <p>${product.description}</p>

                <p><strong>Rating:</strong>
                ${product.rating.rate} ⭐
                (${product.rating.count} Reviews)
                </p>

                <button onclick="history.back()">
                    Back
                </button>
            </div>
        `;

    }
    catch(error){
        productDetails.innerHTML = "<h2>Unable to load product.</h2>";
    }

}

fetchProduct();