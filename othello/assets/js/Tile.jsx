import React, { Component } from 'react';
import { Col } from 'reactstrap';
import _ from 'underscore';

export default function(props) {
  const showContent = (content) => {
    if (content == 0) {
      let x = Math.floor(props.index / 8)
      let y = props.index % 8
      let flag = false;
      props.availables.forEach((a) => {
        if (a[0] == x && a[1] == y) flag = true;
      })
      if (flag) return "*";
      else return;

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
