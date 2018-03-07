import React, { Component } from 'react';
import { Col } from 'reactstrap';
import _ from 'underscore';
import $ from 'jquery'

// import Black from 'black.jpg';
// import White from 'white.jpg';


export default function(props) {


  let blackUrl = '../images/black.png';
  let whiteUrl = '../images/white.png';
  let black2 = '../images/black2.jpg'
  let white2 = '../images/white2.jpg'


  var blackTileStyle = {
    backgroundImage: 'url('+blackUrl+')'
  }

  var whiteTileStyle = {
    backgroundImage: 'url('+whiteUrl+')'
  }

  // var blackOpaque = {
  //   className: 'blackOpaque'
  // }
  //
  // var whiteOpaque = {
  //   className: 'whiteOpaque'
  // }
  //
  // const onHoverChange = () => {
  //   $()
  // }

  const showContent = (content) => {
    if (content == 0) {
      // let x = Math.floor(props.index / 8)
      // let y = props.index % 8
      // let flag = false;
      // props.availables.forEach((a) => {
      //   if (a[0] == x && a[1] == y) flag = true;
      // })
      // if (flag && props.current == 1) return blackOpaque;
      // else if (flag && props.current == 2) return whiteOpaque;
      // else return;

    } else if (content == 1) {
      return blackTileStyle;
    } else {
      return whiteTileStyle;
    }
  };

  const onEnterChange = () => {
    console.log("enter");
    // if (props.current == 1) $(this).addClass('blackOpaque');
    // else if(props.current == 2) $(this).addClass('whiteOpaque');
  }

  const onLeaveChange = () => {
    console.log("leave");
    // if (props.current == 1) $(this).removeClass('blackOpaque');
    // else if(props.current == 2) $(this).removeClass('whiteOpaque');
  }

  return (
    <div className="tile" onClick={() => props.clickTile(props.index)}
       onMouseEnter={onEnterChange} onMouseLeave={onLeaveChange} style={showContent(props.content)}>
    </div>
  )
}
