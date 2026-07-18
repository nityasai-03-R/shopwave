const cartItems=document.getElementById("cartItems");

let cart=JSON.parse(localStorage.getItem("cart"))||[];

displayCart();

function displayCart(){

    cartItems.innerHTML="";

    let subtotal=0;

    cart.forEach((product,index)=>{

        subtotal+=product.price*product.quantity;

        cartItems.innerHTML+=`

        <div class="item">

            <img src="${product.image}">

            <div>

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

            </div>

            <div>

                <button onclick="decrease(${index})">-</button>

                ${product.quantity}

                <button onclick="increase(${index})">+</button>

            </div>

            <button onclick="removeItem(${index})">🗑️</button>

        </div>

        `;

    });

    document.getElementById("subtotal").innerText=subtotal.toFixed(2);

    const tax=subtotal*0.10;

    document.getElementById("tax").innerText=tax.toFixed(2);

    document.getElementById("total").innerText=(subtotal+tax).toFixed(2);

}

function increase(index){

    cart[index].quantity++;

    save();

}

function decrease(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    save();

}

function removeItem(index){

    cart.splice(index,1);

    save();

}

function save(){

    localStorage.setItem("cart",JSON.stringify(cart));

    displayCart();

}