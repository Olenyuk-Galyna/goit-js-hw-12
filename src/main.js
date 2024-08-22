import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getPhotoService } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

const form = document.querySelector('.serch-form');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', getPhoto);

function getPhoto(evt) {
  evt.preventDefault();
  const { serchInput } = evt.currentTarget.elements;
  const trimedValue = serchInput.value.trim();
  gallery.innerHTML = '';
  if (trimedValue === '') {
    return iziToast.error({
      position: 'topRight',
      message: 'Please fill in the fields',
    });
  }

  loader.classList.remove('hiden');
  getPhotoService(trimedValue)
    .then(data => {
      if (data.hits.length === 0) {
        return iziToast.warning({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      renderImages(data.hits);
      form.reset();
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: error.message,
      });
    })
    .finally(() => {
      loader.classList.add('hiden');
    });
}
