import axios from 'axios';

const API_URL = process.env.REACT_APP_GITHUB_API_URL;

export const searchUsers = async (username: string) => {
  const response = await axios.get(`${API_URL}/search/users`, {
    params: {
      q: username,
      per_page: 5,
    },
  });
  return response.data.items;
};
