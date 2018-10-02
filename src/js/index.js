import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderSpinner, hideSpinner } from "./views/base";
/******* GLOBAL STATE OF THIS APP **********
 *
 * SEARCH OBJECT
 * CURRENT RECIPE OBJECT
 * SHOPPING LIST OBJECT
 * LIKED RECIPES
 *
 *******************************************/
const state = {};

const searchHandler = async () => {
  // 1) Get query from view
  const query = searchView.getInput(); // TODO
  if (query) {
    // 2) add new search object to state
    state.search = new Search(query);

    // 3) prepare UI to get new results data
    searchView.clearInput();
    searchView.clearResults();
    renderSpinner(elements.searchResults);
    try {
      // 4) search for recipes
      await state.search.getResult();
      hideSpinner();
      // 5) render results on UI
      console.log(state.search.recipes_list);
      if (state.search.recipes_list) {
        searchView.renderResults(state.search.recipes_list);
      } else {
        console.error("Error processing search!");
      }
    } catch (error) {
      console.error("Error processing search!", err);
      hideSpinner();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchHandler();
});

elements.searchResultsPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.recipes_list, goToPage);
  }
});

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    // prepare ui
    renderSpinner(elements.recipe);
    // create model
    state.recipe = new Recipe(id);
    try {
      // fill it with data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // calculate
      state.recipe.calcTime();
      state.recipe.calcServings();
      // render to ui
      hideSpinner();
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.error("Error processing recipe!", err);
    }
  }
};
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
