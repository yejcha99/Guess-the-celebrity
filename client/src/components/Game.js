/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import './Register.css';
import updatePlayer from './updatePlayer';

function Game(props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const updateInfo = async () => {
    console.log(score);
    await updatePlayer({ id: props.id, name: props.name, points: score });
    props.setScore(score);
    props.setGameOver(true);
    props.setGameStatus(false);
  };
  const handleCheckAnswer = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    const next = currentQ + 1;
    if (next < props.questions.length) {
      setCurrentQ(next);
    } else {
      updateInfo();
    }
  };

  return (
    <div className="container">
      <h1>Celebrity Guessing Game</h1>
      <div>
        <h3>
          Hi,
          {props.name}
          !
          <br />
          Score:
          {score}
          <br />
          Personal Best:
          {score}
          <br />
          Global Best:
          {props.globalHighest}
        </h3>
      </div>
      <div className="question-number">
        <span>
          Question
          {' '}
          {currentQ + 1}
        </span>
      </div>
      <div>
        <img src={props.questions[props.randomOrder[currentQ]].question} alt="celebrity" height={200} width={200} />
        <div className="answer">
          {props.questions[props.randomOrder[currentQ]].answerChoices.map((answerChoice) => (
            <button type="button" className="answerButton" onClick={() => handleCheckAnswer(answerChoice.correct)}>{answerChoice.answer}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Game;
