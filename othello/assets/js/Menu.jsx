import React, { Component } from 'react';

export default function(props) {
  return (
    <div>
      <p>White: {props.whiteScore}</p>
      <p>Black: {props.blackScore}</p>
    </div>
  )
}
