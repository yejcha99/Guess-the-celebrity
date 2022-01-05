/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AddPlayer from './components/AddPlayer';
import Game from './components/Game';
import Result from './components/Result';
import Leaderboard from './components/Leaderboard';
import './App.css';
import './components/Register.css';
import ShowPlayers from './components/ShowPlayers';

function App() {
  const [show, setShow] = useState(true);
  const [start, setStart] = useState(false);
  const [name, setUser] = useState('');
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState(false);
  const [showPlayers, setShowPlayers] = useState(false);
  const [leaders, setLeaders] = useState([]);
  const [score, setScore] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);
  const [globalHighest, setGlobalHighest] = useState(0);
  const [id, setID] = useState(0);
  const register = () => {
    setShow(false);
    setStart(true);
  };
  const question = [
    { question: './images/barbara-palvin.jpeg', answerChoices: [{ answer: 'Ariana Grande', correct: false }, { answer: 'Kendall Jenner', correct: false }, { answer: 'Barbara Palvin', correct: true }, { answer: 'Cardi B', correct: false }] },
    { question: './images/blake-lively.jpeg', answerChoices: [{ answer: 'Emma Stone', correct: false }, { answer: 'Emma Watson', correct: false }, { answer: 'Selena Gomez', correct: false }, { answer: 'Blake Lively', correct: true }] },
    { question: './images/charli-damelio.jpeg', answerChoices: [{ answer: 'Dixie Damelio', correct: false }, { answer: 'Addison Rae', correct: false }, { answer: 'Charli Damelio', correct: true }, { answer: 'Charlie Puth', correct: false }] },
    { question: './images/chris-evans.jpeg', answerChoices: [{ answer: 'Mark Ruffalo', correct: false }, { answer: 'Chris Evans', correct: true }, { answer: 'Chris Hemsworth', correct: false }, { answer: 'Chris Pratt', correct: false }] },
    { question: './images/doja-cat.jpeg', answerChoices: [{ answer: 'Doja Cat', correct: true }, { answer: 'Nicki Minaj', correct: false }, { answer: 'Saweetie', correct: false }, { answer: 'Megan Thee Stallion', correct: false }] },
    { question: './images/Gigi_Hadid.jpeg', answerChoices: [{ answer: 'Bella Hadid', correct: false }, { answer: 'Gigi Hadid', correct: true }, { answer: 'Kris Jenner', correct: false }, { answer: 'Kim Kardashian', correct: false }] },
    { question: './images/harry-styles.jpeg', answerChoices: [{ answer: 'Zayn Malik', correct: false }, { answer: 'Ross Lynch', correct: false }, { answer: 'Shawn Mendes', correct: false }, { answer: 'Harry Styles', correct: true }] },
    { question: './images/lee-jungjae.jpeg', answerChoices: [{ answer: 'Psy', correct: false }, { answer: 'BTS', correct: false }, { answer: 'Lee Jungjae', correct: true }, { answer: 'Lee Minho', correct: false }] },
    { question: './images/olivia-rodrigo.jpeg', answerChoices: [{ answer: 'Taylor Swift', correct: false }, { answer: 'Olivia Rodrigo', correct: true }, { answer: 'Olivia Ponton', correct: false }, { answer: 'NIKI', correct: false }] },
    { question: './images/timothee-chalamet.jpeg', answerChoices: [{ answer: 'Zac Efron', correct: false }, { answer: 'Leonardo DiCaprio', correct: false }, { answer: 'Ryan Gosling', correct: false }, { answer: 'Timothee Chalamet', correct: true }] },
    { question: './images/tom-holland.jpg', answerChoices: [{ answer: 'Tom Holland', correct: true }, { answer: 'Benedict Cumberbatch', correct: false }, { answer: 'Matt Damon', correct: false }, { answer: 'Brad Pitt', correct: false }] },
  ];
  const randomOrder = [];
  const [questions, setQuestions] = useState(question);
  while (randomOrder.length < questions.length) {
    const r = Math.floor(Math.random() * questions.length);
    if (randomOrder.indexOf(r) === -1) randomOrder.push(r);
  }

  return (
    <div className="App">
      {show
        ? (
          <>
            <div className="container">
              <h1> Guess The Celebrity Game </h1>
              <div className="row">
                <button type="button" className="enterButton" onClick={() => register()}>Enter Game</button>
              </div>
            </div>
          </>
        )
        : null}
      {start
        ? (
          <div>
            <AddPlayer
              setUser={setUser}
              setGameStatus={setGameStatus}
              setStart={setStart}
              setPersonalBest={setPersonalBest}
              setGlobalHighest={setGlobalHighest}
              setID={setID}
              setPlayer={setPlayer}
            />
          </div>
        )
        : null}
      {gameStatus ? (
        <Game
          setScore={setScore}
          name={name}
          score={score}
          personalBest={personalBest}
          globalHighest={globalHighest}
          setGameOver={setGameOver}
          setGameStatus={setGameStatus}
          questions={questions}
          setQuestions={setQuestions}
          randomOrder={randomOrder}
          setID={setID}
          id={id}
        />
      )
        : null}
      {gameOver ? (
        <Result
          name={name}
          score={score}
          personalBest={personalBest}
          globalHighest={globalHighest}
          setLeaderBoard={setLeaderBoard}
          setGameOver={setGameOver}
          setShowPlayers={setShowPlayers}
          setLeaders={setLeaders}
          setPlayers={setPlayers}
        />
      )
        : null}
      {leaderBoard ? (
        <Leaderboard
          setShowPlayers={setShowPlayers}
          setShow={setShow}
          setLeaderBoard={setLeaderBoard}
          leaders={leaders}
          setPlayers={setPlayers}
        />
      )
        : null}
      {showPlayers ? (
        <ShowPlayers
          id={id}
          setShowPlayers={setShowPlayers}
          setShow={setShow}
          setLeaderBoard={setLeaderBoard}
          players={players}
          setLeaders={setLeaders}
        />
      ) : null}
    </div>
  );
}

export default App;
