import React, { Component } from 'react';

export default function(props) {
  const turn = () => {
    console.log(props.player1)
    return props.current == 1 ? props.player1 + "'s Turn" : props.player2 + "'s Turn"
  }
  return (
    <div className="scores">
      <p>White: {props.whiteScore}</p >
      <p>Black: {props.blackScore}</p >
      <p>{turn()}</p >
    </div>
  )
}
