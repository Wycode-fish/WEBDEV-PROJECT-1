import React, { Component } from 'react';

export default function(props) {
  const turn = () => {
    console.log(props.player1)
    return props.current == 1 ? props.player1 + "'s Turn" : props.player2 + "'s Turn"
  }
  return (
    <div className="scores">
      <h3>White: {props.whiteScore}</h3>
      <h3>Black: {props.blackScore}</h3>
      <h3>{turn()}</h3>
    </div>
  )
}
