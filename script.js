const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipesContainer = document.getElementById("recipes");
const messageDiv = document.getElementById("message");
async function fetchRecipes(query) {
  try {
    messageDiv.textContent = "Loading...";

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    if (!response.ok) {
      throw new Error("API Failed");
    }

    const data = await response.json();

    if (!data.meals) {
      showMessage("No recipes found.");
      return;
    }

    displayRecipes(data.meals);
    messageDiv.textContent = "";

  } catch (error) {
    showMessage("Something went wrong. Please try again.");
  }
}
function displayRecipes(meals) {
  recipesContainer.innerHTML = "";

  meals.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${meal.strMealThumb}" />
      <h3>${meal.strMeal}</h3>
      <button data-id="${meal.idMeal}">❤️ Favorite</button>
    `;

    recipesContainer.appendChild(card);
  });
}
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});
function saveFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
  }
}
function showMessage(msg) {
  recipesContainer.innerHTML = "";
  messageDiv.textContent = msg;
}
