import axios from 'axios';

const API_KEY = '45519676-8baf865f5b6a7e52cd4b281c8';

export async function getPhotoService(userQuery, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  const { data } = await axios(`https://pixabay.com/api/?${params}`);
  return data;
}
