import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Col, Row } from 'reactstrap';
import _ from 'underscore';
import Tile from './Tile';
import Menu from './Menu'

export default function run_game(root, channel) {
  ReactDOM.render(<Game channel={channel} />, root);
}


class Game extends Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      tiles: [],
      current: "",
      blackScore: 0,
      whiteScore: 0
    }
    this.channel.join()
         .receive("ok", this.gotView.bind(this))
         .receive("error", resp => { console.log("Unable to join", resp) });
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
          <Tile key = {index} index={index} content={tile}
            clickTile={this.clickTile.bind(this)} />
        )}
      </Row>
      </div>
    )
  }

  clickTile(index) {
    if (this.state.tiles[index] != 0) return;
    let tiles = this.state.tiles;
    if (this.state.current == "black") {
      tiles[index] = 1;
      this.setState({current: "white", blackScore: this.state.blackScore + 1, tiles: tiles})
    } else {
      tiles[index] = 2;
      this.setState({current: "black", whiteScore: this.state.whiteScore + 1, tiles: tiles})
    }
  }
}
