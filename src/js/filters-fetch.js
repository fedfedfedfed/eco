import { fetchCardsWithFilters } from './API/filters-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'debounce';
import { createMarkupGridCard, defaultData } from './grid-card-fetch';
import SlimSelect from 'slim-select';

let currentlimit = 6;

const elements = {
  cards: document.querySelector('.list-recipes'),
  searchInput: document.querySelector('.filter-search'),
  resetButton: document.querySelector('.js-reset-filters'),
};

if (elements.searchInput) {
  elements.searchInput.addEventListener(
    'input',
    debounce(getQueryNameRecipes, 1000)
  );
}

function getQueryNameRecipes(e) {
  const inpunValue = e.target.value.trim();
  console.log(inpunValue);
  if (inpunValue === '') {
    elements.searchInput.innerHTML = '';
    elements.cards.innerHTML = defaultData();
    elements.resetButton.classList.add('js-reset-filters');
    Notify.info('Your query is empty. Please try again');
    return;
  }
  console.dir(elements.resetButton);
  elements.resetButton.classList.remove('js-reset-filters');
  cardsWithFiltersData(inpunValue, currentlimit);
}

if (elements.resetButton) {
  elements.resetButton.addEventListener('click', clearSearchInput);
}

function clearSearchInput(e) {
  if (e.target) {
    elements.searchInput.value = '';
    elements.cards.innerHTML = defaultData();
    elements.resetButton.classList.add('js-reset-filters');
  }
}

async function cardsWithFiltersData(nameRecipe, currentlimit) {
  try {
    if (window.screen.width >= 768 && window.screen.width < 1200) {
      currentlimit = 8;
    } else if (window.screen.width >= 1200) {
      currentlimit = 9;
    }
    const result = await fetchCardsWithFilters(nameRecipe);

    const filterRecipes = result.filter(({ title }) =>
      title.toLowerCase().includes(nameRecipe.toLowerCase())
    );
    console.log(filterRecipes);

    if (filterRecipes.length === 0) {
      elements.cards.innerHTML = defaultData();
      Notify.warning('Nothing was found for your request!');
      return;
    }

    const recipesOnPage = filterRecipes.splice(0, currentlimit);
    console.log(currentlimit);

    elements.cards.innerHTML = createMarkupGridCard(recipesOnPage);
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}
