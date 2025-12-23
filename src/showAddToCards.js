
import { getCartProductFromLS } from "./getCartProducts.js";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { removeProdFromCart } from "./removeProdFromCart.js";
import { incrementDecrement} from "./incrementDecrement.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";
let cartProducts = getCartProductFromLS();
let products = [];

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  let filterProducts = products.filter((curProd) => {
    return cartProducts.some((curElem) => curElem.id === curProd.id);
  });

  cartElement.innerHTML = "";

  if (filterProducts.length === 0) {
    cartElement.innerHTML = "<h3>Cart is Empty 🛒</h3>";
    return;
  }

  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;
    let productClone = document.importNode(templateContainer.content, true);

    const LSActualData = fetchQuantityFromCartLS(id, price);

  
    
    let cardElement = productClone.querySelector(".cards") || productClone.querySelector(".card");
    
    if(cardElement) {
        cardElement.setAttribute("id", `card${id}`);
    } else {
        console.error("Card element nahi mila! Template check karo.");
    }
    // ---------------------------------------------

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent = LSActualData.quantity;
    productClone.querySelector(".productPrice").textContent = `₹${LSActualData.price}`;

    productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
      incrementDecrement(event,id,stock,price);
    });





    productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => {
      removeProdFromCart(id);
    });

    cartElement.appendChild(productClone);
  });
};


fetch("/api/products.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    showCartProduct();
  })
  .catch((error) => console.error("Error:", error));
  updateCartProductTotal();