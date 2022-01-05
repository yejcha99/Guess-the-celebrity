/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import getLeaders from './getLeaders';
import getPlayers from './getPlayers';

function Result(props) {
  const leader = async () => {
    const leaders = await getLeaders(5);
    console.log(leaders)
    props.setLeaders(leaders);
    props.setLeaderBoard(true);
    props.setGameOver(false);
  };
  const players = async () => {
    const allPlayers = await getPlayers();
    props.setPlayers(allPlayers);
    props.setShowPlayers(true);
    props.setGameOver(false);
  };
  return (
    <div className="container">
      <h1>Celebrity Guessing Game</h1>
      <div className="title" id="title">
        <h2>Final Result</h2>
        <h3>
          Hi,
          {props.name}
          !
          {' '}
          <br />
          Score:
          {props.score}
          {' '}
          <br />
          Personal Best:
          {props.score}
          {' '}
          <br />
          Global Best:
          {props.globalHighest}
          {' '}
          <br />
        </h3>
      </div>
      <button type="button" className="enterButton" onClick={() => leader()}>Show Top 5 Players</button>
      <button type="button" className="enterButton" onClick={() => players()}>Show All Players</button>
    </div>
  );
}
export default Result;
