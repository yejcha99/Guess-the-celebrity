/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-alert */
import React from 'react';
import getLeaders from './getLeaders';
import createPlayer from './createPlayer';

const AddPlayer = (props) => {
  const nameValidate = async () => {
    const username = document.getElementById('name').value;
    if (username.match(/^[0-9a-zA-Z]+$/i)) {
      props.setUser(username);
      console.log(username);
      const playerInfo = {
        name:username,
        points:0,
        maxpoints:0,
      };
      const id = await createPlayer(playerInfo);
      if (id) {
        props.setID(id.insertedId);
        console.log(id.insertedId);
      }
      const top = await getLeaders(1);
      props.setGlobalHighest(top.data[0].maxpoints);
      props.setGameStatus(true);
      props.setStart(false);
    } else {
      alert('The name is not alphanumeric');
    }
  };

  return (
    <div className="container">
      <h1>Celebrity Guessing Game</h1>
      <form>
        <input type="text" id="name" name="name" placeholder="What is your name?" required />
        <button type="button" className="enterButton" onClick={() => nameValidate()}>Enter Game</button>
      </form>
    </div>
  );
};

export default AddPlayer;
