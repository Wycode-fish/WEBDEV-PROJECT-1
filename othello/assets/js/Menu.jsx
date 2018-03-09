import React, { Component } from 'react';

export default function(props) {
  const turn = () => {
    return props.current == 1 ? props.player1 + "'s Turn" : props.player2 + "'s Turn"
  }
  const listInfo = () => {
    return (
      <div>
        {_.map(props.info, (item, index) => <p key={index}>{item}</p>)}
      </div>
    )
  }
  return (
    <div className="scores">
      <h3>White: {props.whiteScore}</h3>
      <h3>Black: {props.blackScore}</h3>
      <h3>{turn()}</h3>
      <h3>Information:</h3>
      {listInfo()}
    </div>
  )
}
