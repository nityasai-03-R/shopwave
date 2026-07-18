const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");
const pagination = document.getElementById("pagination");

let allProducts = [];
let currentProducts = [];

let currentPage = 1;
const productsPerPage = 5;

function showSkeleton() {

    productContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {

        const skeleton = document.createElement("div");

        skeleton.className = "skeleton-card";

        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text small"></div>
            <div class="skeleton-text small"></div>
        `;

        productContainer.appendChild(skeleton);
    }

}

function getWishlist() {

    return JSON.parse(localStorage.getItem("wishlist")) || [];

}

function saveWishlist(wishlist) {

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

}

function toggleWishlist(product) {

    let wishlist = getWishlist();

    const index = wishlist.findIndex(item => item.id === product.id);

    if (index === -1) {

        wishlist.push(product);

    } else {

        wishlist.splice(index, 1);

    }

    saveWishlist(wishlist);

    displayProducts(currentProducts);

}


async function fetchProducts() {

    try {

        showSkeleton();

        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {

            throw new Error("Failed to fetch products");

        }

        allProducts = await response.json();

        currentProducts = allProducts;

        displayProducts(currentProducts);

    }

    catch (error) {

        productContainer.innerHTML = `<h2>${error.message}</h2>`;

    }

}


function displayProducts(products) {

    productContainer.innerHTML = "";

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach(product => {

        const wishlist = getWishlist();

        const isWishlisted = wishlist.some(item => item.id === product.id);

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p class="price">$${product.price}</p>

            <p class="category">${product.category}</p>

            <button onclick="viewDetails(${product.id})">
                View Details
            </button>

            <button onclick='toggleWishlist(${JSON.stringify(product)})'>
                ${isWishlisted ? "❤️ Remove Wishlist" : "🤍 Add Wishlist"}
            </button>
            <button onclick='addToCart(${JSON.stringify(product)})'>
    🛒 Add to Cart
</button>
        `;

        productContainer.appendChild(card);

    });

    setupPagination(products);

}
function addToCart(product){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.id === product.id);

    if(index !== -1){

        cart[index].quantity++;

    }else{

        product.quantity = 1;

        cart.push(product);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
}

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    currentProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;

    displayProducts(currentProducts);

});


async function fetchCategories() {

    try {

        const response = await fetch("https://fakestoreapi.com/products/categories");

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const categories = await response.json();

        categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            categoryFilter.appendChild(option);

        });

    } catch (error) {

        console.log(error);

    }

}

// =======================
// Filter By Category
// =======================

categoryFilter.addEventListener("change", async function () {

    const selectedCategory = this.value;

    currentPage = 1;

    if (selectedCategory === "all") {

        currentProducts = allProducts;

        displayProducts(currentProducts);

        return;

    }

    try {

        showSkeleton();

        const response = await fetch(
            `https://fakestoreapi.com/products/category/${selectedCategory}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch category");
        }

        currentProducts = await response.json();

        displayProducts(currentProducts);

    } catch (error) {

        console.log(error);

    }

});

// =======================
// Pagination
// =======================

function setupPagination(products) {

    pagination.innerHTML = "";

    const pageCount = Math.ceil(products.length / productsPerPage);

    for (let i = 1; i <= pageCount; i++) {

        const button = document.createElement("button");

        button.innerText = i;

        if (i === currentPage) {

            button.classList.add("active");

        }

        button.addEventListener("click", function () {

            currentPage = i;

            displayProducts(products);

        });

        pagination.appendChild(button);

    }

}

// =======================
// View Product Details
// =======================

function viewDetails(id) {

    window.location.href = `product.html?id=${id}`;

}

// =======================
// Initial Function Calls
// =======================

fetchProducts();
fetchCategories();