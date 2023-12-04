import { BASE_URL } from './config';
import axios from 'axios';

const FILTERS_ENDPOINT = '/recipes';

const fetchCardsWithFilters = async () => {
  const params = new URLSearchParams({
    page: 1,
    limit: 10000,
  });

  const response = await axios.get(`${BASE_URL}${FILTERS_ENDPOINT}?${params}`);

  return response.data.results;
};

export { fetchCardsWithFilters };
