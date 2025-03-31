document.getElementById('timestamp').value = new Date().toISOString();
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
const hamburgerButton = document.getElementById("mobileMenu");
const mainNav = document.getElementById("navigation");

document.addEventListener("DOMContentLoaded", () => {

    
    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        if (mainNav.classList.contains("active")) {
            mobileMenu.innerHTML = "x";
        } else {
            mobileMenu.innerHTML ="≡";
        }
    });
});
