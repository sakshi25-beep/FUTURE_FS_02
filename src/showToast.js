export function showToast(operation, id) {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  // Check operation type
  if (operation === "add") {
    toast.textContent = `Product with ID ${id} has been added.`;
    toast.style.backgroundColor = "green"; 
    toast.style.color = "white"; 
  } else {
    toast.textContent = `Product with ID ${id} has been deleted.`;
    toast.style.backgroundColor = "red";
    toast.style.color = "white";
  }

  document.body.appendChild(toast);

  // Toast ko 2 second baad hata do
  setTimeout(() => {
    toast.remove();
  }, 2000);
}