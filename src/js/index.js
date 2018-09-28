import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView';
import { elements, renderSpinner, hideSpinner } from './views/base';
/******* GLOBAL STATE OF THIS APP **********
 *
 * SEARCH OBJECT
 * CURRENT RECIPE OBJECT
 * SHOPPING LIST OBJECT
 * LIKED RECIPES
 *
 *******************************************/
const state = {};

const searchHandler = async() => {
    // 1) Get query from view
    const query = searchView.getInput(); // TODO
    if (query) {
        // 2) add new search object to state
        state.search = new Search(query);

        // 3) prepare UI to get new results data
        searchView.clearInput();
        searchView.clearResults();
        renderSpinner(elements.searchResults);
        // 4) search for recipes
        await state.search.getResult();
        hideSpinner();
        // 5) render results on UI
        searchView.renderResults(state.search.recipes_list);
    }
};
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchHandler();
});


elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes_list, goToPage);
    }
})


const r = new Recipe(46956);
r.getRecipe();
console.log(r);