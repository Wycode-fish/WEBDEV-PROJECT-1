import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Container, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'underscore';
import Tile from './Tile';
import Menu from './Menu'
import { searchPos, nextAvailables, nextBoard, list2Arr, getScore, arr2List, minMaxDecision } from './logic'

// Global Constants
let TOP_LEFT  = 1;
let TOP    = 2;
let TOP_RIGHT  = 3;
let RIGHT   = 4;
let DOWN_RIGHT  = 5;
let DOWN   = 6;
let DOWN_LEFT  = 7;
let LEFT   = 8;
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
      whiteScore: 0,
      player1: "",
      player2: "",
      opaque: -1,
      end: false,
      noMove: ""
    }
    this.channel.join()
         .receive("ok", this.gotView.bind(this))
         .receive("error", resp => { console.log("Unable to join", resp) });
    this.channel.on("chess", state => this.funcA(state))
  }

  componentDidUpdate() {
    if (window.ai && !this.state.end && this.state.current == 2) {
       this.aiPlay();
    }
  }

  componentWillMount() {
    if (window.ai) {
      console.log("AI MODLE")
      let newState = {
        tiles: [0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,2,1,0,0,0,
                0,0,0,1,2,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0],
        availables: [[5, 4, 3, 4], [3, 2, 3, 4], [2, 3, 4 ,3], [4, 5, 4, 3]],
        current: 1,
        blackScore: 2,
        whiteScore: 2,
        player1: "You",
        player2: "Computer",
        opaque: -1,
        end: false,
        noMove: ""
      }
      this.setState(newState)
    }
  }

  funcA (state) {
    this.setState(state, () => {
      if (state.end) {
        this.setState(state)
      }
      else {
        if (state.availables.length==0) {
          // let move = [Math.floor(index/8), index%8];
          let tiles = this.state.tiles;
          let board = list2Arr(tiles, SIZE);
          let currAvailables = state.availables;
          let pid = (state.current==1)?1:2;
          let oid = (state.current==1)?2:1;
          // let nextB = nextBoard(board, move, currAvailables, pid);
          let nextA = nextAvailables(board, oid);
          let newState = this.state
          if (pid==1) newState['noMove'] = this.state.player1;
          else newState['noMove'] = this.state.player2;
          // newState['noMove'] = (pid==1)?this.state.player2:this.state.player1;
          console.log("enenen", newState['noMove'])
          if (nextA.length == 0) {
            newState['end'] = true;
            newState['noMove'] = "";
            this.channel.push("chess", {"state": newState})
              .receive("ok", (resp) => {})
            return;
          }


          let nextTiles = arr2List(board, SIZE)

          // let newState = {current: oid, availables: nextA}
          newState['current'] = oid
          newState['availables'] = nextA
          this.channel.push("chess", {"state": newState})
            .receive("ok", (resp) => {})
        }
        else if (state.noMove != "") {
          setTimeout(() => { this.setState({noMove: ""}) }, 3000);
        }
      }
    })
  }


  getRes() {
      let res;
      if (this.state.blackScore > this.state.whiteScore) {
        res = "Black Win "
      } else if (this.state.blackScore < this.state.whiteScore) {
        res = "White Win"
      } else {
        res = "Tie"
      }
      res = res+" BlackScore:"+this.state.blackScore+" WhiteScore:"+this.state.whiteScore;
      return res;
    }

  gotView(view) {
    this.channel.push("chess", {"state": view.game.state})
        .receive("ok", (resp) => console.log("resp", resp))
    //this.setState(view.game.state)
  }

  game_again(){
    if (window.ai = true) {
      let newState = {
        tiles: [0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,2,1,0,0,0,
                0,0,0,1,2,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0],
        availables: [[5, 4, 3, 4], [3, 2, 3, 4], [2, 3, 4 ,3], [4, 5, 4, 3]],
        current: 1,
        blackScore: 2,
        whiteScore: 2,
        player1: "You",
        player2: "Computer",
        opaque: -1,
        end: false,
        noMove: ""
      }
      this.setState(newState)
    } else {
      let newState = this.state
      newState['tiles'] = [0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,
              0,0,0,2,1,0,0,0,
              0,0,0,1,2,0,0,0,
              0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0];
      newState['current'] = 1;
      newState['player1'] = "";
      newState['player2'] = "";
      newState['blackScore'] = 2;
      newState['whiteScore'] = 2;
      newState['end'] = false;
      newState['availables'] = [[5, 4, 3, 4], [3, 2, 3, 4], [2, 3, 4 ,3], [4, 5, 4, 3]];
      this.channel.push("chess", {"state": newState})
        .receive("ok", (resp) => {})
     this.setState(newState);
    }
  }

  leave_room(){
     window.location = '/';
   }

   render() {
     console.log("state", this.state)
     let res = this.getRes();
     let noMove = this.state.noMove;
     console.log("hahafh", noMove);
     return (
     <div className="container-container">
       <Container>
         <Row>
           <Col xs="12" lg="8">{this.renderTiles(this.state.tiles)}</Col>
           <Col xs="12" lg="4">
             <Menu current={this.state.current} player1={this.state.player1}
                player2={this.state.player2} blackScore={this.state.blackScore}
                whiteScore={this.state.whiteScore}
                pickWhite={this.pickWhite.bind(this)}
                pickBlack={this.pickBlack.bind(this)}
                observe={this.observe.bind(this)}
                leave={this.leave_room.bind(this)} />
           </Col>
         </Row>
       </Container>
       <div>
         <Modal isOpen={this.state.end}>
         <ModalHeader>Game Over</ModalHeader>
           <ModalBody>
             {res}
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={this.game_again.bind(this)}>Again</Button>{' '}
             <Button color="secondary" onClick={this.leave_room}>Leave</Button>
           </ModalFooter>
         </Modal>
       </div>
       <div>
         <Modal isOpen={noMove != ""}>
           <ModalHeader>Oops!</ModalHeader>
           <ModalBody>
             {noMove} Does Not Have Available Move!
           </ModalBody>
           <ModalFooter>
             <Button color="primary" onClick={this.continueGame.bind(this)}>Ok</Button>
           </ModalFooter>
         </Modal>

       </div>
     </div>
     )
    }

  continueGame() {
    this.setState({noMove: ""})
  }

  renderTiles(tiles) {
    return(
      <div className="tile-panel">
        <Row>
        {_.map(tiles, (tile,index) =>
          <Tile key = {index} index={index} content={tile} availables={this.state.availables}
            current={this.state.current}
            opaque={this.state.opaque}
            clickTile={this.clickTile.bind(this)}
            onEnterChange={this.onEnterChange.bind(this)}
            onLeaveChange={this.onLeaveChange.bind(this)}/>
        )}
      </Row>
      </div>
    )
  }

  clickTile(index) {
    if (window.ai) {
      this.clickInAi(index);
      return;
    }
    if (!this.validClick(index)) return;
    let move = [Math.floor(index/8), index%8];
    let tiles = this.state.tiles;
    let board = list2Arr(tiles, SIZE);
    let currAvailables = this.state.availables;
    let pid = (this.state.current==1)?1:2;
    let oid = (this.state.current==1)?2:1;
    let nextB = nextBoard(board, move, currAvailables, pid);
    let nextA = nextAvailables(nextB, oid);
    let nextTiles = arr2List(nextB, SIZE)
    if (pid == 1) {
      let blackScore = getScore(nextB, pid)
      let whiteScore = getScore(nextB, oid)
      let newState = {current: 2, blackScore: blackScore,
                      whiteScore: whiteScore, tiles: nextTiles,
                      availables: nextA, player1: this.state.player1,
                      player2: this.state.player2}
      this.channel.push("chess", {"state": newState})
        .receive("ok", (resp) => {})


    } else {
      let blackScore = getScore(nextB, oid)
      let whiteScore = getScore(nextB, pid)
      let newState = {current: 1, blackScore: blackScore,
                      whiteScore: whiteScore, tiles: nextTiles,
                      availables: nextA, player1: this.state.player1,
                      player2: this.state.player2}
      this.channel.push("chess", {"state": newState})
        .receive("ok", (resp) => {})
    }
  }

  clickInAi(index) {
    if (!this.validClick(index)) return;
    let move = [Math.floor(index/8), index%8];
    let tiles = this.state.tiles;
    let board = list2Arr(tiles, SIZE);
    let currAvailables = this.state.availables;
    let nextB = nextBoard(board, move, currAvailables, 1);
    let nextA = nextAvailables(nextB, 2);
    let nextTiles = arr2List(nextB, SIZE);
    let blackScore = getScore(nextB, 1)
    let whiteScore = getScore(nextB, 2)
    let newState = {current: 2, blackScore: blackScore,
                    whiteScore: whiteScore, tiles: nextTiles,
                    availables: nextA};
    if (nextA.length == 0) {
      newState['current'] = 1;
      nextA = nextAvailables(nextB, 1);
      if (nextA.length == 0) {
        console.log("END$$$$$$$")
        this.setState({end: true})
      } else {
        console.log("YOU NOMOVE")
        newState['availables']= nextA;
        newState['noMove'] = "Computer";
        this.setState(newState)
      }
    } else {
        this.setState(newState)
    }

  }

  aiPlay() {
    let board = list2Arr(this.state.tiles, SIZE);
    let move = minMaxDecision(board, 2);
    let currAvailables = this.state.availables;
    let nextB = nextBoard(board, move, currAvailables, 2);
    let nextA = nextAvailables(nextB, 1);
    let nextTiles = arr2List(nextB, SIZE);
    let blackScore = getScore(nextB, 1)
    let whiteScore = getScore(nextB, 2)
    let newState = {current: 1, blackScore: blackScore,
                    whiteScore: whiteScore, tiles: nextTiles,
                    availables: nextA};
    console.log("state before length = 0", newState)
    if (nextA.length == 0) {
      newState['current'] = 2;
      nextA = nextAvailables(nextB, 2);
      if (nextA.length == 0) {
        console.log("END88**********")
        this.setState({end: true})
      } else {
        newState['availables']= nextA;
        console.log("state after length = 0", newState)
        this.setState(newState)
      }
    } else {
        this.setState(newState);
    }
  }


  //check if the tile can be clicked
  validClick(index) {
    if (this.state.player2 == "" || this.state.player1 == "") {
      alert("You need to wait another player")
      return false;
    }
    let curr = this.state.current;
    let curr_name = (curr==1)?this.state.player1:this.state.player2;
    let player = play_cfg.user;
    if (curr_name != player) return false;
    if (this.state.tiles[index] != 0) return false;
    let x = Math.floor(index / 8)
    let y = index % 8
    let flag = false;
    console.log("flag", flag)
    this.state.availables.forEach((a) => {
      if (a[0] == x && a[1] == y) flag = true;
    })
    console.log("flag", flag)
    return flag;
  }




  onEnterChange(index) {
    this.setState({opaque: index});
  }
  onLeaveChange(index) {
    this.setState({opaque: -1});
  }




  pickWhite() {
    if (this.state.player2 != "" && this.state.player2 != play_cfg.user) {
        alert("White has been picked by another user!")
        return;
    }
    let newState = this.state
    newState['player2'] = play_cfg.user
    if (play_cfg.user == this.state.player1) {
      newState['player1'] = ""
    }
    console.log("Pick White")
    this.channel.push("chess", {"state": newState})
      .receive("ok", (resp) => {})
  }

  pickBlack() {
    if (this.state.player1 != "" && this.state.player1 != play_cfg.user) {
        alert("Black has been picked by another user!")
        return;
    }
    let newState = this.state
    newState['player1'] = play_cfg.user
    if (play_cfg.user == this.state.player2) {
      newState['player2'] = ""
    }

    console.log("Pick Black")
    this.channel.push("chess", {"state": newState})
      .receive("ok", (resp) => {})
  }
  observe() {
    console.log("observe")
    if (this.state.player1 == play_cfg.user) {
      let newState = this.state
      newState['player1'] = ""
      this.channel.push("chess", {"state": newState})
        .receive("ok", (resp) => {})
    } else if (this.state.player2 == play_cfg.user) {
      let newState = this.state
      newState['player2'] = ""
      console.log("newState:", newState);
      this.channel.push("chess", {"state": newState})
        .receive("ok", (resp) => {})
    } else {
      return;
    }
  }
}
