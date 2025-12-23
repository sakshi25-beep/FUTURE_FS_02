import { getCartProductFromLS } from "./getCartProducts.js"; // .js lagaya
import { showToast } from "./showToast.js"; // Spelling sahi ki (small 's')
import { updateCartValue } from "./updateCartValue.js"; // .js lagaya

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProductElement = document.querySelector(`#card${id}`);
  
  // Element verification
  if (!currentProductElement) return;

  // Data uthana DOM se
  let quantity = currentProductElement.querySelector(".productQuantity").innerText;
  let price = currentProductElement.querySelector(".productPrice").innerText;

  // Clean the price string (₹ hata diya)
  price = price.replace("₹", "");

  let existingProd = arrLocalStorageProduct.find(
    (curProd) => curProd.id === id
  );

  // LOGIC 1: Agar Product Pehle se Cart mein hai
  if (existingProd) {
    // Quantity update karein (Purani + Nayi)
    quantity = Number(existingProd.quantity) + Number(quantity);
    
    // Price update: Unit Price * New Total Quantity
    price = Number(price * quantity); 
    
    // Naya object banaya update ke liye
    let updatedCart = { id, quantity, price };

    // Purane array mein nayi value replace ki
    updatedCart = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
    
    // Navbar aur Toast update
    updateCartValue(updatedCart); 
    showToast("add", id); // Small 's' use kiya
    
    return; // Yahin ruk jao
  }

  // LOGIC 2: Agar Product Naya hai (First time adding)
  price = Number(price * quantity);
  quantity = Number(quantity);

  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  // Navbar aur Toast update
  updateCartValue(arrLocalStorageProduct);
  showToast("add", id); 
};