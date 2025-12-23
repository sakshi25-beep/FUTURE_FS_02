import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");

  let localCartProducts = getCartProductFromLS();
  let initialValue = 0;

  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    // We use curElem.price because in incrementDecrement.js 
    // you already calculated (Unit Price * Quantity) before saving to LS.
    let productPrice = parseInt(curElem.price) || 0;
    return accum + productPrice;
  }, initialValue);

  if (productSubTotal && productFinalTotal) {
    productSubTotal.textContent = `₹${totalProductPrice}`;
    productFinalTotal.textContent = `₹${totalProductPrice + 50}`;
  }
};