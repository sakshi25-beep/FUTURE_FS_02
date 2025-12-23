import { updateCartValue } from "./updateCartValue.js";
import { getCartProductFromLS } from "./getCartProducts.js";

// Page load hone par Cart number update karo
updateCartValue(getCartProductFromLS());