const API_KEY = '45519676-8baf865f5b6a7e52cd4b281c8';

export function getPhotoService(userQuery) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: userQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
