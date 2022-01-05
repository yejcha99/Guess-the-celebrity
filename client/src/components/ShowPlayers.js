/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import deletePlayer from './deletePlayer';
import getPlayers from './getPlayers';
import getLeaders from './getLeaders';

function ShowPlayers(props) {
  const [players, setPlayers] = useState(props.players);
  const deleteplayer = async () => {
    await deletePlayer(props.id);
    const updated = await getPlayers();
    setPlayers(updated);
  };
  const replay = () => {
    props.setShowPlayers(false);
    props.setShow(true);
  };
  const showLeaders = async () => {
    const leaders = await getLeaders(5);
    props.setLeaders(leaders);
    props.setLeaderBoard(true);
    props.setShowPlayers(false);
  };
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Points</th>
            <th>Max Points</th>
          </tr>
        </thead>
        <tbody>
          {props.players !== null ? (
            players.data.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                <td>{player.points}</td>
                <td>{player.maxpoints}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Players</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button type="button" className="enterButton" onClick={() => deleteplayer()}>Delete</button>
        <button type="button" className="enterButton" onClick={() => replay()}>Play Again</button>
        <button type="button" className="enterButton" onClick={() => showLeaders()}>Show Top 5 Players</button>
      </div>
    </div>
  );
}
export default ShowPlayers;
