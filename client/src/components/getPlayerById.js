/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';

async function getPlayerById(id) {
  const url = `/player/${id}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export default getPlayerById;
