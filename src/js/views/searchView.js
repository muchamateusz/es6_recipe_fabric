import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
        elements.searchResultsList.innerHTML = '';
    }
    // const limit RecipeTitle = (title, limit = 17) => {
    //     if (title.length > limit) {

//     }
//     return title;
// }
const renderRecipe = recipe => {
    const markup = `
  <li>
    <a class="likes__link" href="${recipe.recipe_id}">
        <figure class="likes__fig">
            <img src=${recipe.image_url} alt=${recipe.title}>
        </figure>
        <div class="likes__data">
            <h4 class="likes__name" title="${recipe.title}">${recipe.title}</h4>
            <p class="likes__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>
  `;
    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};