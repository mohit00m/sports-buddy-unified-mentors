export function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");

  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => container.removeChild(toast), 400);
  }, 3000);
}
export function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

export function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}
