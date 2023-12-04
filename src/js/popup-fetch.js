import { fetchPopup } from './API/popup-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

popupData();
async function popupData() {
  try {
    const result = await fetchPopup();
  } catch {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }

  function createMarkupPopup(arr) {
    return arr.map(({ cook }) => ``).join('');
  }
}
