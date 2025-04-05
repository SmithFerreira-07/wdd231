document.addEventListener("DOMContentLoaded", () => {
    const areasInfo = document.getElementById("areas");
    const hamburgerButton = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("navigation");
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
    
    hamburgerButton.addEventListener("click", () => {
        mainNav.classList.toggle("active");
        hamburgerButton.innerHTML = mainNav.classList.contains("active") ? "x" : "≡";
    });
    
    fetchAreas();
    
    async function fetchAreas() {
        try {
            const response = await fetch("data/areas.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            displayAreas(data.areas_of_interest);
        } catch (error) {
            console.error("Error fetching json areas:", error);
            areasInfo.innerHTML = "<p>Unable to load areas information. Please try again later.</p>";
        }
    }
    
    function displayAreas(areas) {
        areasInfo.innerHTML = "";
        areas.forEach(area => {
            const card = document.createElement("div");
            card.classList.add("area-card");
            card.innerHTML = `
                <h2>${area.name}</h2>
                <figure>
                    <img src="${area.image_path}" alt="${area.name}" loading="lazy" />
                    <figcaption>${area.name}</figcaption>
                </figure>
                <p>${area.description}</p>
                <a href="${area.link}" target="_blank">Learn more</a>
                
            `;
            areasInfo.appendChild(card);
        });
    }
});

