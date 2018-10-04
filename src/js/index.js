import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, renderSpinner, hideSpinner } from "./views/base";
import List from "./models/List";
import Likes from "./models/Likes";
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

const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    // prepare ui
    recipeView.clearRecipe();
    renderSpinner(elements.recipe);
    // create model
    if(state.search) searchView.highlightSelected(id);
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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      console.error("Error processing recipe!", err);
    }
  }
};

const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }
  state.recipe.ingredients.forEach((el, i) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// TESTING
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const id = state.recipe.id;
  if (state.likes.isLiked(id)) {
    state.likes.deleteLike(id);
    likesView.deleteLike(id);
    likesView.toggleLikeBtn(false);
    likesView.toggleLikeMenu(state.likes.getNumLikes());
  } else {
    const newLike = state.likes.addLike(
      id,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.img
    );

    likesView.toggleLikeBtn(true);
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    likesView.renderLike(newLike);
  }
};

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
window.addEventListener("load", () => {
  state.likes = new Likes();
  state.likes.readStorage();
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  state.likes.likes.forEach(like => {
    likesView.renderLike(like);
  });
});

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

elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    if (val >= 0) {
      state.list.updateCount(id, val);
    }
  }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
      // Decrease button is clicked
      if (state.recipe.servings > 1) {
          state.recipe.updateServings('dec');
          recipeView.updateServingsIngredients(state.recipe);
      }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
      // Increase button is clicked
      state.recipe.updateServings('inc');
      recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
      // Add ingredients to shopping list
      controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
      // Like controller
      controlLike();
  }
});
