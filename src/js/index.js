import Search from "./models/Search";
import * as searchView from './views/searchView';
import { elements } from './views/base';
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

        // 4) search for recipes
        await state.search.getResult();
        // 5) render results on UI
        searchView.renderResults(state.search.recipes_list);
    }
};
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchHandler();
});