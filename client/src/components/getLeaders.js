/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';

async function getLeaders(num) {
  const url = `/leaders/${num}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
    return "No leaders";
  }
}
export default getLeaders;
