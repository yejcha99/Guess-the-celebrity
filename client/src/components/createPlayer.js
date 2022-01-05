/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';

async function createPlayer(playerInfo) {
  try {
    const player = playerInfo;
    console.log(player);
    const url = '/player';
    const res = await axios.post(url, player);
    return res.data.id;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export default createPlayer;
