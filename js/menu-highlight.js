// js/menu-highlight.js
export function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll(".menu-link");
  
    links.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("border-2", "border-blue-600");
      }
    });
  }
  