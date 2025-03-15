document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("navigation");


    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

});