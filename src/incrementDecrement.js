import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue } from "./updateCartValue.js"; // Header update ke liye zaroori hai
import { updateCartProductTotal} from "./updateCartProductTotal.js";
export const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = 0;

  // LocalStorage se purana data lana
  let localCartProducts = getCartProductFromLS();
  let existingProd = localCartProducts.find((curProd) => curProd.id === id);

  if (existingProd) {
    quantity = existingProd.quantity;
    localStoragePrice = existingProd.price;
  } else {
    localStoragePrice = price;
  }

  // --- Increment Logic ---
  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;
      localStoragePrice = price * stock;
    }
  }

  // --- Decrement Logic ---
  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  // --- Price Calculation (Fixed 'Price' typo) ---
  // Humesha Unit Price * Quantity karo
  localStoragePrice = price * quantity;
  localStoragePrice = Number(localStoragePrice.toFixed(2));

  // --- Updating LocalStorage (Fixed Map Logic) ---
  let updatedCart = { id, quantity, price: localStoragePrice };

  // Yahan spelling aur variable names thik kiye hain
  let updatedCartData = localCartProducts.map((curProd) => {
    return curProd.id === id ? updatedCart : curProd;
  });

  localStorage.setItem("cartProductLS", JSON.stringify(updatedCartData));

  // --- Updating Screen ---
  productQuantity.innerText = quantity;
  productPrice.innerText = `₹${localStoragePrice}`; // Currency symbol added

  // Navbar Cart Total update karna
  updateCartValue(updatedCartData);
  updateCartProductTotal();
};