import axios from "axios";

const optionsAxios = {
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40200855-3a192acac81e17bb872cbbb4e',
    image_type: 'photo',
    safesearch: 'true',
    per_page: 12,
  },
};

export async function fetchPictures (searchValue, page){
   return await axios.get(`?q=${searchValue}&page=${page}`, optionsAxios);
}
