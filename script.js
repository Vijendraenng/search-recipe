const searchBox = document.querySelector(`.search-box`);
const seachBtn = document.querySelector(`.search-btn`);
const recipeContainer = document.querySelector(`.recipe-container`);
const recipeContainerHeading = document.querySelector(
  `.recipe-container-heading`
);
const recipeDetailsContent = document.querySelector(`.recipe-details-content`);
const recipeColseBtn = document.querySelector(`.recipe-colse-btn`);
const defaultRecipe = document.querySelector(`.default-recipe`);

recipeColseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});
const fetchIngredents = (meal) => {
  console.log(meal);
  // console.log(meal[1]);

  let IngredentsList = "";
  for (let i = 1; i <= 20; i++) {
    const Ingredents = meal[`strIngredient${i}`];
    if (Ingredents) {
      const measure = meal[`strMeasure${i}`];
      IngredentsList += `<li>${measure} ${Ingredents}</li>`;
    } else {
      break;
    }
  }
  return IngredentsList;
};

const popupRecipe = (meal) => {
  recipeDetailsContent.innerHTML = `
  <center><h2>${meal.strMeal}</h2></center>
  <h3>Ingredents</h3>
  <ul>${fetchIngredents(meal)}</ul>
  <p>
  <h3>Instructions</h3>
  ${meal.strInstructions}</p>
   

  `;

  recipeDetailsContent.parentElement.style.display = "block";
};
// function to fech recipe
const fetchRecipe = async (searchValue) => {
  try {
    recipeContainerHeading.innerText = "Fetching Recipe...";
    seachBtn.disabled = true;
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
    );
    const response = await data.json();

    response.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("js-recipe");
      recipeDiv.innerHTML = `<div>
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Blongs to <span>${meal.strCategory}</span> Category</p>  
      
      </div>`;
      recipeContainer.appendChild(recipeDiv);

      const recipeBtn = document.createElement("button");
      recipeBtn.classList.add("js-recipe-btn");
      recipeBtn.innerText = "view recipe";
      recipeBtn.addEventListener("click", () => popupRecipe(meal));
      recipeDiv.appendChild(recipeBtn);
    });
  } catch {
    recipeContainer.innerHTML = `<h2 class="recipe-container-heading">This Recipe is not Avilable</h2>`;
  } finally {
    recipeContainerHeading.innerText = "";
    seachBtn.disabled = false;
  }
};

seachBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchBox.value.trim();
  fetchRecipe(searchValue);
  recipeContainer.innerHTML = ``;

  searchBox.value = "";
});

const loadDefaultRecipe = () => {
  const defaultRecipeNameArr = [
    `Blini Pancakes`,
    `pizza`,
    `Chakchouka`,
    `burger`,
    `Lamb Tzatziki Burgers`,
    `Walnut Roll`,
  ];
  for (let i = 0; i < defaultRecipeNameArr.length; i++) {
    const defaultRecipeName = defaultRecipeNameArr[i]; // Specify your default recipe here
    fetchRecipe(defaultRecipeName);
  }
};
window.addEventListener("DOMContentLoaded", loadDefaultRecipe);
