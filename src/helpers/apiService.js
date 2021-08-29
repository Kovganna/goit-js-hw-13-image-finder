import axios from 'axios';

const MY_API_KEY = '23083473-2d7790ee8b7206f8dabf03b90';
axios.defaults.baceUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export async function getPictures(query, page) {
  const {
    data: { hits },
  } = await axios.get(`&q=${query}&page=${page}&per_page=12&key=${MY_API_KEY}`);

  return hits;
}