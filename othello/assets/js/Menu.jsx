import React, { Component } from 'react';

export default function(props) {
  const turn = () => {
    return props.current == 1 ? props.player1 + "'s Turn" : props.player2 + "'s Turn"
  }
  // const listInfo = () => {
  //   return (
  //     <div>
  //       {_.map(props.info, (item, index) => <p key={index}>{item}</p>)}
  //     </div>
  //   )
  // }
  const userinfo = () => {
    if (props.player1 == play_cfg.user) {
      return "You Are Black"
    } else if (props.player2 == play_cfg.user) {
      return "You Are White"
    } else {
      return "You Are Observer"
    }
  }
  return (
    <div className="scores">
      <h3>{userinfo()}</h3>
      <div className="btn-pick">
        <button onClick={() => props.pickWhite()} className="pick-white btn btn-md btn-primary">Pick White</button>
        <button onClick={() => props.pickBlack()} className="pick-black btn btn-md btn-primary">Pick Black</button>
        <button onClick={() => props.observe()} className="pick-observer btn btn-md btn-warning">Observe</button>
      </div>
      <h3>{props.player2}  White: {props.whiteScore}</h3>
      <h3>{props.player1}  Black: {props.blackScore}</h3>
      <h3>{turn()}</h3>
    </div>
  )
}
