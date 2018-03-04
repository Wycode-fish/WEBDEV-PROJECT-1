import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Col, Row } from 'reactstrap';
import _ from 'underscore';
import Tile from './Tile';
import Menu from './Menu'
import { searchPos, nextAvailables, nextBoard, list2Arr, getScore, arr2List } from './logic'

// Global Constants
let TOP_LEFT 	= 1;
let TOP 	 	= 2;
let TOP_RIGHT 	= 3;
let RIGHT 		= 4;
let DOWN_RIGHT 	= 5;
let DOWN 		= 6;
let DOWN_LEFT 	= 7;
let LEFT 		= 8;
let SIZE = 8;

export default function run_game(root, channel) {
  ReactDOM.render(<Game channel={channel} />, root);
}


class Game extends Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      tiles: [],
      availables: [],
      current: 0,
      blackScore: 0,
      whiteScore: 0
    }
    this.channel.join()
         .receive("ok", this.gotView.bind(this))
         .receive("error", resp => { console.log("Unable to join", resp) });
    this.channel.on("chess", this.setState.bind(this))
  }

  remote_play(msg) {
    this.setState(msg)
  }

  gotView(view) {
    console.log("NEW VIEW", view)
    this.setState(view.game.state)
  }

  render() {
    return (
    <div>
      <Container>
        <Row>
          <Col lg="8">{this.renderTiles(this.state.tiles)}</Col>
          <Col lg="4">
            <Menu blackScore={this.state.blackScore} whiteScore={this.state.whiteScore}/>
          </Col>
        </Row>
      </Container>
    </div>
    )
  }

  renderTiles(tiles) {
    return(
      <div>
        <Row>
        {_.map(tiles, (tile,index) =>
          <Tile key = {index} index={index} content={tile} availables={this.state.availables}
            clickTile={this.clickTile.bind(this)} />
        )}
      </Row>
      </div>
    )
  }

  clickTile(index) {
    if (this.state.tiles[index] != 0) return;
    let move = [Math.floor(index/8), index%8];
    let tiles = this.state.tiles;
    let board = list2Arr(tiles, SIZE);
    let currAvailables = this.state.availables;

    let pid = (this.state.current==1)?1:2;
    let oid = (this.state.current==1)?2:1;
    let nextB = nextBoard(board, move, currAvailables, pid);
    let nextA = nextAvailables(nextB, oid);
    let nextTiles = arr2List(nextB, SIZE)
    console.log('tiles', nextTiles)
    if (pid == 1) {
      let blackScore = getScore(nextB, pid)
      let whiteScore = getScore(nextB, oid)
      console.log(blackScore)
      let newState = {current: 2, blackScore: blackScore, whiteScore: whiteScore, tiles: nextTiles, availables: nextA}
      this.setState(newState)
    } else {
      let blackScore = getScore(nextB, oid)
      let whiteScore = getScore(nextB, pid)
      let newState = {current: 1, blackScore: blackScore, whiteScore: whiteScore, tiles: nextTiles, availables: nextA}
      this.setState(newState)
    }
  }
}
