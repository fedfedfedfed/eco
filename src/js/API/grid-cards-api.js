import { BASE_URL } from "./config";
import axios from "axios";

const GRID_CARDS_ENDPOINT = "/recipes";
document
  .getElementById("test")
  .addEventListener("click", () =>
    axios.get(`${BASE_URL}`).then((responce) => console.log(responce.data))
  );

const fetchCards = async (currentlimit) => {
  const params = new URLSearchParams({
    page: 1,
    limit: currentlimit,
  });

  const response = await axios.get(
    `${BASE_URL}${GRID_CARDS_ENDPOINT}?${params}`
  );
  console.log(response.data);
  return response.data;
};

export { fetchCards };
