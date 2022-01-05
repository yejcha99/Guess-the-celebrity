/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';

async function getPlayers() {
  const url = '/players';
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export default getPlayers;
