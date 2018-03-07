import React, { Component } from 'react';
import { Col } from 'reactstrap';
import _ from 'underscore';

// import Black from 'black.jpg';
// import White from 'white.jpg';


export default function(props) {


  let blackUrl = '../images/black.jpg';
  let whiteUrl = '../images/white.jpg';

  var blackTileStyle = {
    backgroundImage: 'url('+blackUrl+')'
  }

  var whiteTileStyle = {
    backgroundImage: 'url('+whiteUrl+')'
  }

  const showContent = (content) => {
    if (content == 0) {
      // let x = Math.floor(props.index / 8)
      // let y = props.index % 8
      // let flag = false;
      // props.availables.forEach((a) => {
      //   if (a[0] == x && a[1] == y) flag = true;
      // })
      // if (flag) return "*";
      // else return;

    } else if (content == 1) {
      return blackTileStyle;
    } else {
      return whiteTileStyle;
    }
  };


  return (
    <div className="tile" onClick={() => props.clickTile(props.index)} style={showContent(props.content)}>
    </div>
  )
}
