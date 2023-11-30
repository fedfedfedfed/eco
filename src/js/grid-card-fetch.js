import { fetchCards } from "./API/grid-cards-api";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const elements = {
  cards: document.querySelector(".list-recipes"),
};

let currentlimit = 6;

setCardsLimit();

function setCardsLimit() {
  if (window.screen.width >= 768 && window.screen.width < 1200) {
    currentlimit = 8;
    defaultData();
  } else if (window.screen.width >= 1200) {
    currentlimit = 9;
    defaultData();
  }
  setCardsLimitResizer();
}

function setCardsLimitResizer() {
  window.addEventListener("resize", function () {
    if (window.screen.width >= 768 && window.screen.width < 1200) {
      currentlimit = 8;
      defaultData();
    } else if (window.screen.width >= 1200) {
      currentlimit = 9;
      defaultData();
    } else {
      currentlimit = 6;
      defaultData();
    }
  });
}

async function defaultData() {
  try {
    const result = await fetchCards(currentlimit);
    // console.log(result.results);
    elements.cards.innerHTML = createMarkupGridCard(result.results);
  } catch {
    Notify.failure("Oops! Something went wrong! Try reloading the page!");
  }
}

function createMarkupGridCard(arr) {
  return arr
    .map(
      ({
        _id,
        title,
        description,
        rating,
        thumb,
      }) => `<li className="item-recipes">
    <div className="wrap-recipes">
      <button type="button" className="button-favorite-recipes" name="${_id}">
          <svg className="icon-favorite-recipes" width="22" height="22">
            <use href="./sprite.svg#heart-favorite"></use>
          </svg>
      </button>
      <img
        className="img-recipes"
        src="${thumb}"
        alt="${title}"
        width="335"
        height="335"
      />
      <div className="thumb-desc-recipes">
        <h3 className="title-recipes">${title}</h3>
        <p className="description-recipes">${description}</p>
        <div className="thumb-btn-rating">
          <p className="rating-recipes">${rating}</p>
          <div className="wrap-stars-rating">
            <svg className="icon-rating-recipes">
              <use href="./sprite.svg#rating-star"></use>
            </svg>
            <svg className="icon-rating-recipes">
              <use href="./sprite.svg#rating-star"></use>
            </svg>
            <svg className="icon-rating-recipes">
              <use href="./sprite.svg#rating-star"></use>
            </svg>
            <svg className="icon-rating-recipes">
              <use href="./sprite.svg#rating-star"></use>
            </svg>
            <svg className="icon-rating-recipes">
              <use href="./sprite.svg#rating-star"></use>
            </svg>
          </div>

          <button
            type="button"
            className="btn btn-primary button-recipes"
            data-modal-popup-open
            id="${_id}"
          >
            See recipe
          </button>
        </div>
      </div>
    </div>
  </li>`
    )
    .join("");
}

export {
  createMarkupGridCard,
  setCardsLimit,
  setCardsLimitResizer,
  defaultData,
};
