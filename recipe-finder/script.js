// const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=";
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php"
const GET_BY_ID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

const form = document.querySelector("form");
const input = document.querySelector("form input");
const resultSection = document.querySelector(".recipe-section");
const resultBox = document.querySelector(".recipe-container");
const modal = document.querySelector(".modal");
// search recipies
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
                    <button class="recipe-btn" data-id="${meal.idMeal}" >View recipe</button>
            `
                resultBox.appendChild(card)
                input.value = ""

            });

        } else {
            resultSection.innerHTML = `<h2 class="error">No recipes found for "${query}"</h2>`;
        }
    } catch (error) {
        console.error("Error loading recipes", error)
        resultSection.innerHTML = ` <h2 class="error">Could not load featured recipe. Please try again later.</h2>`
    }
}

resultBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("recipe-btn")) {
        const id = e.target.dataset.id;
        getSingleRecipe(id)
    }
});
// get by id
const getSingleRecipe = async (id) => {
    try {
        modal.innerHTML = "";
        const res = await fetch(GET_BY_ID + id)
        const data = await res.json();
        const card = document.createElement("div");
        card.classList.add("modal-content");
        card.innerHTML = `
    <button class="close-btn">+</button>
        <h1>${data.meals[0].strMeal}</h1>
        <span>Instructions:</span>
        <p>${data.meals[0].strInstructions}</p>
    `;
        modal.classList.remove("hidden");
        modal.appendChild(card);
        document.querySelector(".close-btn").addEventListener("click", () => {
            modal.classList.add("hidden")
        })
    } catch (error) {
        console.error("Error while fetching recipe details", error);
    }

}


// Show Random Featured Recipe
const loadFeaturedRecipe = async () => {
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
                    <button class="recipe-btn" data-id="${meal.idMeal}">View Recipe</button>
                    <button> <a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a></button>
                </div>
            </div>
            <div class="feature-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            `;
        document.querySelector(".recipe-btn").addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            getSingleRecipe(id)
        });
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

