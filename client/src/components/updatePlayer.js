/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import axios from 'axios';

async function updatePlayer(props) {
  const data = { name:props.name,
    points:props.points,
    maxpoints:props.points };
  const url = `/player/${props.id}`;
  try {
    const res = await axios.put(url, data);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
export default updatePlayer;
