export const homeQuantityToggle = (event, id, stock) => {
    // ID se dhoondne ke bajaye 'closest' use karein
    // Ye button se upar ja kar sabse paas wala '.cards' div dhoond lega
    const currentCardElement = event.target.closest(".cards");

    if (!currentCardElement) return; // Guard clause

    const productQuantity = currentCardElement.querySelector(".productQuantity");

    // InnerText se current value lein agar attribute missing ho
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || parseInt(productQuantity.innerText) || 1;

    if (event.target.classList.contains("cartIncrement")) {
        if (quantity < stock) {
            quantity += 1;
        } else {
            quantity = stock;
        }
    }

    if (event.target.classList.contains("cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        }
    }

    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity);
};