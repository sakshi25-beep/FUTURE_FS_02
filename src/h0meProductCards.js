 import { addToCart }from"./addToCart";
 import { homeQuantityToggle } from "./homeQuantityToggle";
 export const showProductContainer = (products) => {
  if (!products) return false;

  products.forEach((curProd) => {
    // 1. Sabse pehle 'id' ko destructure karein
    const { id, category, name, image, stock, price, description } = curProd;

    const productClone = document.importNode(productTemplate.content, true);

    // 2. Case-Sensitive Fix: HTML mein 'cardvalue' hai, toh wahi use karein
    const cardElement = productClone.querySelector("#cardvalue");
    if (cardElement) {
        cardElement.setAttribute("id", `card${id}`);
    }

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productDescription").textContent = description;
    productClone.querySelector(".productPrice").textContent = `₹${price}`;
    productClone.querySelector(".productActualPrice").textContent = `₹${price * 4}`; // Example discount
    productClone.querySelector(".productStock").textContent = stock;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productImage").alt = name;

    // 3. Click listener se extra space hatayein ("click")
    productClone.querySelector(".stockElement").addEventListener("click", (event) => {
      homeQuantityToggle(event, id, stock);
    });
productClone
.querySelector(".add-to-cart-button")
.addEventListener("click",(event)=>{
  addToCart(event,id,stock);
});

    productContainer.append(productClone);
  });
};