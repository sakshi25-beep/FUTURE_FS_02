import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue } from "./updateCartValue.js";
import { showToast } from "./showToast.js"; // 1. Import Add kiya

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProductFromLS();

  // 1. Product ko filter karke hatana
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  // 2. LocalStorage update karna
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  // 3. Screen se div remove karna
  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();
    // 4. Toast dikhana (Correction: 'div' ki jagah 'id' pass kiya)
    showToast("delete", id);
  }

  // 5. Navbar update karna
  updateCartValue(cartProducts);
};