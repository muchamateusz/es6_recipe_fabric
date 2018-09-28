import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
}
export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResultsPages.innerHTML = '';
}

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

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


const renderButtons = (page, numberOfResults, resutlsPerPage) => {
    const pages = Math.ceil(numberOfResults / resutlsPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }
    elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resutlsPerPage = 10) => {
    const start = (page - 1) * resutlsPerPage;
    const end = page * resutlsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resutlsPerPage);
};