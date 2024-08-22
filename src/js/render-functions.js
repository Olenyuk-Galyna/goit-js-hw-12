import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('#gallery');

export function renderImages(images) {
  const markup = images
    .map(image => {
      return `
     <li class="image-card">
            <a href="${image.largeImageURL}"><img src="${image.webformatURL}" class="card-img" alt="${image.tags}" /></a>
        <ul class="description">
        <li><p>likes:</p><p>${image.likes}</p></li>
        <li><p>views:</p><p>${image.views}</p></li>
        <li><p>comments:</p><p>${image.comments}</p></li>
        <li><p>downloads:</p><p>${image.downloads}</p></li>
        </ul>
        </li>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
const lightbox = new SimpleLightbox('.image-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});
