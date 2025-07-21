// const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php"
const form = document.querySelector("form");
const input = document.querySelector("form input");
const resultSection = document.querySelector(".recipe-section");
const resultHead = document.querySelector(".recipe-section");
const resultBox = document.querySelector(".recipe-container");

const searchRecipies = async (query) => {
    try {
        resultBox.innerHTML = "";
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();
        if (data.meals) {
            data.meals.forEach(meal => {
                const card = document.createElement("div");
                card.className = "recipe-card";
                card.innerHTML = `
                     <div class="img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </div>
                    <h3 class="name">${meal.strMeal}</h3>
            `
                resultBox.appendChild(card)
            });
    
        } else {
            resultSection.innerHTML = `<h2 class="error">No recipes found for "${query}"</h2>`;
        }
    } catch (error) {
        console.error("Error loading recipes",error)
        resultSection.innerHTML= ` <h2 class="error">Could not load featured recipe. Please try again later.</h2>`
    }
}

// Show Random Featured Recipe
async function loadFeaturedRecipe() {
    try {
        const res = await fetch(RANDOM_URL);
        if (!res.ok) {
            throw new Error("Error ehile fetchin API")
        }
        const data = await res.json();
        const meal = data.meals[0];

        const featuredContent = document.querySelector(".feature-section")
        featuredContent.innerHTML = `
        <h1 class="feature-heading">Featured <span class="coral">Recipe</span></h1>
        <section class="feature-container">
            <div class="feature-text">
                <h2 class="">${meal.strMeal}</h2>
                <p>${meal.strInstructions.slice(0, 200)}...</p>
                <div class="btn-box">
                    <button>View Recipe</button>
                    <button> <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a></button>
                </div>
            </div>
            <div class="feature-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            `;
    } catch (error) {
        console.error("Error loading featured recipe:", error);

        const featuredContent = document.querySelector(".feature-section");
        featuredContent.innerHTML = `
            <h2 class="error">Could not load featured recipe. Please try again later.</h2>
        `;
    }



}
loadFeaturedRecipe()

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) {
        resultSection.innerHTML = `<h2>Please Enter a value</h2>`
        return;
    }
    searchRecipies(query);
})

