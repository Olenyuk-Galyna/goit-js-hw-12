import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotoService } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.serch-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', getPhoto);
loadMoreBtn.addEventListener('click', onLoadMore);
let trimedValue = '';
let currentPage = 1;

async function getPhoto(evt) {
  evt.preventDefault();
  const { serchInput } = evt.currentTarget.elements;
  trimedValue = serchInput.value.trim();
  gallery.innerHTML = '';
  currentPage = 1;
  if (trimedValue === '') {
    return iziToast.error({
      position: 'topRight',
      message: 'Please fill in the fields',
    });
  }

  loader.classList.remove('hiden');
  try {
    const data = await getPhotoService(trimedValue, currentPage);
    if (data.hits.length === 0) {
      loadMoreBtn.classList.add('hiden');
      return iziToast.warning({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    renderImages(data.hits);
    smoothScroll();
    form.reset();
    if (data.totalHits > 15) {
      loadMoreBtn.classList.remove('hiden');
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    loader.classList.add('hiden');
  }
}

async function onLoadMore() {
  loader.classList.remove('hiden');
  currentPage += 1;
  try {
    const data = await getPhotoService(trimedValue, currentPage);
    renderImages(data.hits);
    smoothScroll();
    if (Math.ceil(data.totalHits / 15) === currentPage) {
      loadMoreBtn.classList.add('hiden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      message: error.message,
    });
  } finally {
    loader.classList.add('hiden');
  }
}
function smoothScroll() {
  const { height } = gallery.lastElementChild.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
