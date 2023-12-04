import { BASE_URL } from './config';
import axios from 'axios';


const HERO_ENDPOINT = '/events';

const fetchEvents = async findData => {
  const response = await axios.get(`${BASE_URL}${HERO_ENDPOINT}`);
  return response.data;
};

export { fetchEvents };
