const year = new Date().getFullYear();
document.getElementById("currentyear").textContent = year;
const lastModification = document.lastModified;
document.getElementById("modification").textContent = lastModification;


document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const mainNav = document.getElementById('homeNav');
    
    menuButton.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
});