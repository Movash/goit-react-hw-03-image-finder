import axios from "axios";
// axios.defaults.baseURL = 'https://pixabay.com/api/';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '38643483-af753ca3e0b3f8d342ebf97e6';

// export const getImagesBySearch = async (q, page, perPage) => {
//   const {data} = await axios ('?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true')
//   return data
// };

export async function getImagesBySearch(q, page) {
  const resp = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${q}&page=${page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`
  );
  console.log('resp.data', resp.data);
  return resp.data;
};

//pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12