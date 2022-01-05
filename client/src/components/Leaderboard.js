/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import getPlayers from './getPlayers';

function Leaderboard(props) {
  const replay = () => {
    props.setShow(true);
    props.setLeaderBoard(false);
  };
  const showAllPlayers = async () => {
    const allPlayers = await getPlayers();
    props.setPlayers(allPlayers);
    props.setLeaderBoard(false);
    props.setShowPlayers(true);
  };
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {props.leaders !== null ? (
            props.leaders.data.map((leader) => (
              <tr key={leader.id}>
                <td>{leader.name}</td>
                <td>{leader.maxpoints}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )}
        </tbody>
      </table>
      <button type="button" className="enterButton" onClick={() => replay()}>Play Again</button>
      <button type="button" className="enterButton" onClick={() => showAllPlayers()}>Show All Players</button>
    </div>
  );
}
export default Leaderboard;
