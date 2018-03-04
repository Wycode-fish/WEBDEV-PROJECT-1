import React, { Component } from 'react';
import { Col } from 'reactstrap';


export default function(props) {
  const showContent = (content) => {
    if (content == 0) {
      return;
    } else if (content == 1) {
      return "black";
    } else {
      return "white";
    }
  };
  return (
    <div className="tile" onClick={() => props.clickTile(props.index)}>
      {showContent(props.content)}
    </div>
  )
}
