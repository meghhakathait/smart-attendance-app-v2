export const showToast = (type, message) => {
  const toast = document.createElement("div");

  const typeStyles = {
    success: {
      className: "bg-green-100 text-green-700",
      icon: "✓",
      iconClass: "text-green-500",
    },
    info: {
      className: "bg-blue-100 text-blue-700",
      icon: "ⓘ",
      iconClass: "text-blue-500",
    },
    error: {
      className: "bg-red-100 text-red-700",
      icon: "✕",
      iconClass: "text-red-500",
    },
  };

  const style = typeStyles[type] || typeStyles.info;

  toast.className = `
    flex items-center gap-2 p-3 rounded-lg shadow-md
    ${style.className}
    animate-enter
  `;

  const icon = document.createElement("span");
  icon.className = style.iconClass;
  icon.textContent = style.icon;

  const text = document.createElement("span");
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);

  // Create toast container if it doesn't exist
  let container = document.getElementById("toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";

    container.className = `
      fixed top-5 right-5 z-50
      flex flex-col gap-2
    `;

    document.body.appendChild(container);
  }

  container.appendChild(toast);

  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove("animate-enter");
    toast.classList.add("animate-leave");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
};
