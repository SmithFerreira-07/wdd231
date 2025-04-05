document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const membersContainer = document.getElementById("members");
const toggleButton = document.getElementById("toggleView");
const hamburgerButton = document.getElementById("mobileMenu");
const mainNav = document.getElementById("navigation");

hamburgerButton.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    if (mainNav.classList.contains("active")) {
        mobileMenu.innerHTML = "x";
    } else {
        mobileMenu.innerHTML ="≡";
    }
});

