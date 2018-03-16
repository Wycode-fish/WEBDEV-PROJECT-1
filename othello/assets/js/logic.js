// Global Constants
let TOP_LEFT 	= 1;
let TOP 	 	= 2;
let TOP_RIGHT 	= 3;
let RIGHT 		= 4;
let DOWN_RIGHT 	= 5;
let DOWN 		= 6;
let DOWN_LEFT 	= 7;
let LEFT 		= 8;


let size = 8;

let curr = [[0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0],
						[0,0,0,1,1,1,0,0],
						[0,0,0,2,2,2,0,0],
						[0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0]]



export function hello() {
	console.log("hhehe");
}

export function searchPos (curr, pos, dir) {

 let i = pos[0];
 let j = pos[1];
 let oid = (curr[i][j]==1)?2:1;
 let m;
 let n;
 // top-left
 if (dir == TOP_LEFT) {
  m = i-1;
  n = j-1;
  if (m>=0 && n>=0) {
   while (curr[m][n]==oid && m>0 && n>0) {
    m--;
    n--;
   }
  }
  if ((m==i-1 && n==j-1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // top
 else if (dir == TOP) {
  m = i-1;
  n = j;
  if (m>=0) {
   while (curr[m][n]==oid && m>0) {
    m--;
   }
  }
  if ((m==i-1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // top-right
 else if (dir == TOP_RIGHT) {
  m = i-1;
  n = j+1;
  if (m>=0 && n<size) {
   while (curr[m][n]==oid && m>0 && n<size-1) {
    m--;
    n++;
   }
  }
  if ((m==i-1 && n==j+1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // right
 else if (dir == RIGHT) {
  m = i;
  n = j+1;
  if (n<size) {
   while (curr[m][n]==oid && n<size-1) {
    n++;
   }
  }
  if (n==j+1 || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // down-right
 else if (dir == DOWN_RIGHT) {

  m = i+1;
  n = j+1;
  if (m<size && n<size) {
   while (curr[m][n]==oid && m<size-1 && n<size-1) {
    m++;
    n++;
   }
  }
  if ((m==i+1 && n==j+1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // down
 else if (dir == DOWN) {
  m = i+1;
  n = j;
  if (m < size-1) {
   while (curr[m][n]==oid && m<size-1) {
    m++;
   }
  }
  if ((m==i+1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // down-left
 else if (dir == DOWN_LEFT) {
  m = i+1;
  n = j-1;
  if (m < size && n >= 0) {
   while (curr[m][n]==oid && m<size-1 && n>0) {
    m++;
    n--;
   }
  }
  // while (curr[m][n]==oid && m<size-1 && n>0) {
  //  m++;
  //  n--;
  // }
  if ((m==i+1 && n==j-1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }
 // left
 else {
  m = i;
  n = j-1;

  if (n>=0) {
   while (curr[m][n]==oid && n>0) {
    n--;
   }
  }
  // while (curr[m][n]==oid && n>0) {
  //  n--;
  // }
  if ((n==j-1) || curr[m][n]!=0) {
   m = null;
   n = null;
  }
 }

 if (m!=null && n!=null) return [m,n];
 else return [];
}


export function nextAvailables (curr, pid) { // curr: current board; pid: player id

 let size = curr.length;
 let oid = (pid==1)?2:1; // opponent
 let positions = [];

 if (curr[0][0] == pid) {
  let pos1 = searchPos(curr, [0,0], RIGHT);
  let pos2 = searchPos(curr, [0,0], DOWN);
  let pos3 = searchPos(curr, [0,0], DOWN_RIGHT);

  if (pos1.length!=0) {
   pos1.push(0);
   pos1.push(0);
   positions.push(pos1);
  }
  if (pos2.length!=0) {
   pos2.push(0);
   pos2.push(0);
   positions.push(pos2);
  }
  if (pos3.length!=0) {
   pos3.push(0);
   pos3.push(0);
   positions.push(pos3);
  }
 }

 if (curr[0][size-1] == pid) {
  let pos1 = searchPos(curr, [0,size-1], LEFT);
  let pos2 = searchPos(curr, [0,size-1], DOWN_LEFT);
  let pos3 = searchPos(curr, [0,size-1], DOWN);
  if (pos1.length!=0) {
   pos1.push(0);
   pos1.push(size-1);
   positions.push(pos1);
  }
  if (pos2.length!=0) {
   pos2.push(0);
   pos2.push(size-1);
   positions.push(pos2);
  }
  if (pos3.length!=0) {
   pos3.push(0);
   pos3.push(size-1);
   positions.push(pos3);
  }
 }

 if (curr[size-1][size-1] == pid) {
  let pos1 = searchPos(curr, [size-1,size-1], LEFT);
  let pos2 = searchPos(curr, [size-1,size-1], TOP);
  let pos3 = searchPos(curr, [size-1,size-1], TOP_LEFT);
  if (pos1.length!=0) {
   pos1.push(size-1);
   pos1.push(size-1);
   positions.push(pos1);
  }
  if (pos2.length!=0) {
   pos2.push(size-1);
   pos2.push(size-1);
   positions.push(pos2);
  }
  if (pos3.length!=0) {
   pos3.push(size-1);
   pos3.push(size-1);
   positions.push(pos3);
  }
 }

 if (curr[size-1][0] == pid) {
  let pos1 = searchPos(curr, [size-1,0], RIGHT);
  let pos2 = searchPos(curr, [size-1,0], TOP);
  let pos3 = searchPos(curr, [size-1,0], TOP_RIGHT);
  if (pos1.length!=0) {
   pos1.push(size-1);
   pos1.push(0);
   positions.push(pos1);
  }
  if (pos2.length!=0) {
   pos2.push(size-1);
   pos2.push(0);
   positions.push(pos2);
  }
  if (pos3.length!=0) {
   pos3.push(size-1);
   pos3.push(0);
   positions.push(pos3);
  }
 }

 // board top line
 for (let i=1; i<size-1; i++) {
  if (curr[0][i] == pid) {

   // left
   if (curr[0][i-1]==oid) {
    let pos = searchPos(curr, [0,i], LEFT);
		if (pos.length!=0){
	    if (curr[pos[0]][pos[1]]==0) {
	     pos.push(0);
	     pos.push(i);
	     positions.push(pos);
	    }
		}
   }
   // down left
   if (curr[1][i-1]==oid) {
    let pos = searchPos(curr, [0,i], DOWN_LEFT);
		if (pos.length!=0) {
	    if (curr[pos[0]][pos[1]]==0) {
	     pos.push(0);
	     pos.push(i);
	     positions.push(pos);
	    }
		}
   }
   // down
   if (curr[1][i]==oid) {
    let pos = searchPos(curr, [0,i], DOWN);
		if (pos.length!=0) {
	    if (curr[pos[0]][pos[1]]==0) {
	     pos.push(0);
	     pos.push(i);
	     positions.push(pos);
	    }
		}
   }
   // down right
   if (curr[1][i+1]==oid) {
    let pos = searchPos(curr, [0,i], DOWN_RIGHT);
		if (pos.length!=0) {
	    if (curr[pos[0]][pos[1]]==0) {
	     pos.push(0);
	     pos.push(i);
	     positions.push(pos);
	    }
		}
   }
   // right
   if (curr[0][i+1]==oid) {
    let pos = searchPos(curr, [0,i], RIGHT);
		if (pos.length!=0) {
	    if (curr[pos[0]][pos[1]]==0) {
	     pos.push(0);
	     pos.push(i);
	     positions.push(pos);
	    }
		}
   }

  }
 }

 // board left line
 for (let i=1; i<size-1; i++) {
  if (curr[i][0] == pid) {

   // up
   if (curr[i-1][0]==oid) {
    let pos = searchPos(curr, [i,0], TOP);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(0);
			 positions.push(pos);
			}
		 }
   }
   // down
   if (curr[i+1][0]==oid) {
    let pos = searchPos(curr, [i,0], DOWN);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(0);
			 positions.push(pos);
			}
		 }
   }
   // up right
   if (curr[i-1][1]==oid) {
    let pos = searchPos(curr, [i,0], TOP_RIGHT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(0);
			 positions.push(pos);
			}
		 }
   }
   // down right
   if (curr[i+1][1]==oid) {
   	console.log("i:"+i, "j:"+0);
    let pos = searchPos(curr, [i,0], DOWN_RIGHT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(0);
			 positions.push(pos);
			}
		 }
   }
   // right
   if (curr[i][1]==oid) {
    let pos = searchPos(curr, [i,0], RIGHT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(0);
			 positions.push(pos);
			}
		 }
   }

  }
 }

 // board right line
 for (let i=1; i<size-1; i++) {
  if (curr[i][size-1] == pid) {

   // up
   if (curr[i-1][size-1]==oid) {
    let pos = searchPos(curr, [i,size-1], TOP);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(size-1);
			 positions.push(pos);
			}
		 }
   }
   // down
   if (curr[i+1][size-1]==oid) {
    let pos = searchPos(curr, [i,size-1], DOWN);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(size-1);
			 positions.push(pos);
			}
		 }
   }
   // up left
   if (curr[i-1][size-2]==oid) {
    let pos = searchPos(curr, [i,size-1], TOP_LEFT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(size-1);
			 positions.push(pos);
			}
		 }
   }
   // down left
   if (curr[i+1][size-2]==oid) {
    let pos = searchPos(curr, [i,size-1], DOWN_LEFT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(size-1);
			 positions.push(pos);
			}
		 }
   }
   // left
   if (curr[i][size-2]==oid) {
    let pos = searchPos(curr, [i,size-1], LEFT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(i);
			 pos.push(size-1);
			 positions.push(pos);
			}
		 }
   }

  }
 }

 // down line
 for (let i=1; i<size-1; i++) {
  if (curr[size-1][i] == pid) {

   // up
   if (curr[size-2][i]==oid) {
    let pos = searchPos(curr, [size-1,i], TOP);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(size-1);
			 pos.push(i);
			 positions.push(pos);
			}
		 }
   }
   // left
   if (curr[size-1][i-1]==oid) {
    let pos = searchPos(curr, [size-1,i], LEFT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(size-1);
			 pos.push(i);
			 positions.push(pos);
			}
		 }
   }
   // up left
   if (curr[size-2][i-1]==oid) {
    let pos = searchPos(curr, [size-1,i], TOP_LEFT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(size-1);
			 pos.push(i);
			 positions.push(pos);
			}
		 }
   }
   // up right
   if (curr[size-2][i+1]==oid) {
    let pos = searchPos(curr, [size-1,i], TOP_RIGHT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(size-1);
			 pos.push(i);
			 positions.push(pos);
			}
		 }
   }
   // right
   if (curr[size-1][i+1]==oid) {
    let pos = searchPos(curr, [size-1,i], RIGHT);
		if (pos.length!=0){
			if (curr[pos[0]][pos[1]]==0) {
			 pos.push(size-1);
			 pos.push(i);
			 positions.push(pos);
			}
		 }
   }

  }
 }
 // inside
 for (let i=1; i<size-1; ++i) {

  for (let j=1; j<size-1; ++j) {

   if (curr[i][j] == pid) {
    // top-left
    if (curr[i-1][j-1]==oid) {
     let pos = searchPos(curr, [i,j], TOP_LEFT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // top
    if (curr[i-1][j]==oid) {
     let pos = searchPos(curr, [i,j], TOP);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // top-right
    if (curr[i-1][j+1]==oid) {
     let pos = searchPos(curr, [i,j], TOP_RIGHT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // right
    if (curr[i][j+1]==oid) {
     let pos = searchPos(curr, [i,j], RIGHT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // down-right
    if (curr[i+1][j+1]==oid) {
     let pos = searchPos(curr, [i,j], DOWN_RIGHT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // down
    if (curr[i+1][j]==oid) {
     let pos = searchPos(curr, [i,j], DOWN);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // down-left
    if (curr[i+1][j-1]==oid) {
     let pos = searchPos(curr, [i,j], DOWN_LEFT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }


    // left
    if (curr[i][j-1]==oid) {
     let pos = searchPos(curr, [i,j], LEFT);
		 if (pos.length!=0){
	     if (curr[pos[0]][pos[1]]==0) {
	      pos.push(i);
	      pos.push(j);
	      positions.push(pos);
	     }
	 		}
    }
   }
  }
 }
 return positions;
}



export function nextBoard (input, nextmove, positions, pid) { // curr: List[List[]], nextmove: tuple(x, y)
	let curr = [];
	for (let i=0; i<input.length; i++) {
		curr.push(input[i].slice());
	}
	for (let i=0; i<positions.length; i++) {

		if (nextmove[0]==positions[i][0] && nextmove[1]==positions[i][1]) {

			// up left
			if (positions[i][2]<nextmove[0] && positions[i][3]<nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0] && y!=nextmove[1]) {
					curr[x++][y++] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// up right
			else if (positions[i][2]<nextmove[0] && positions[i][3]>nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0] && y!=nextmove[1]) {
					curr[x++][y--] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// down left
			else if (positions[i][2]>nextmove[0] && positions[i][3]<nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0] && y!=nextmove[1]) {
					curr[x--][y++] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// down right
			else if (positions[i][2]>nextmove[0] && positions[i][3]>nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0] && y!=nextmove[1]) {
					curr[x--][y--] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// left
			else if (positions[i][2]==nextmove[0] && positions[i][3]<nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (y!=nextmove[1]) {
					curr[x][y++] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// right
			else if (positions[i][2]==nextmove[0] && positions[i][3]>nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (y!=nextmove[1]) {
					curr[x][y--] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// down
			else if (positions[i][2]>nextmove[0] && positions[i][3]==nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0]) {
					curr[x--][y] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
			// up
			else if (positions[i][2]<nextmove[0] && positions[i][3]==nextmove[1]) {
				let x = positions[i][2];
				let y = positions[i][3];
				while (x!=nextmove[0]) {
					curr[x++][y] = pid;
				}
				curr[nextmove[0]][nextmove[1]]=pid;
			}
		}
	}
	return curr;
}


export function getScore (curr, pid) {

	let size = curr.length;
	let score = 0;

	for (let i=0; i<size; i++) {
		for (let j=0; j<size; j++) {
			if (curr[i][j]==pid) score++;
		}
	}

	return score;
}

export function arr2List (arr, size) {
 let lst = [];
 for (let i=0; i<arr.length; i++) {
  lst = lst.concat(arr[i]);
 }
 return lst;
}

export function list2Arr (lst, size) {

	let arr = [];

	for (let i=0; i<lst.length; ) {
		let row = [];
		while (row.length<size) {
			row.push(lst[i++]);
		}
		arr.push(row);
	}

	return arr;
}


function minMax(currBoard, currPlayer, oriPlayer, currLayer, alpha, beta) {

 let oppnent = (currPlayer==1)?2:1;

 if (isGameEnd(currBoard, currPlayer) || currLayer == 5) {

  return getScore(currBoard, currPlayer) - getScore(currBoard, oppnent);
 }


 let moveList = nextAvailables(currBoard, currPlayer);

 if (moveList.length<0) {

  return minMax(currBoard, oppnent, oriPlayer, currLayer + 1);
 }
 else {
  let maxVal = (currPlayer==oriPlayer)?0:100;

  for (let i=0; i<moveList.length; i++) {

   let currMove = [moveList[i][0], moveList[i][1]];

   //let temp = tempBoard(currBoard);

   let newBoard = nextBoard(currBoard, currMove, moveList, currPlayer);

   let val = minMax(newBoard, oppnent, oriPlayer, currLayer + 1, alpha, beta);

   if (currPlayer == oriPlayer) {

    maxVal = (val > maxVal)?val:maxVal;

    alpha = (maxVal > alpha)?maxVal:alpha;

    if (alpha >= beta) return maxVal;

   }
   else {

    maxVal = (val < maxVal)?val:maxVal;

    beta = (maxVal < beta)?maxVal:beta;

    if (alpha >= beta) return maxVal;
   }

  }

  return maxVal;
 }

 return -1;
}


export function minMaxDecision(currBoard, currPlayer) {

 let oppnent = (currPlayer==1)?2:1;

 let moveList = nextAvailables(currBoard, currPlayer);

 let bestDecision = [];

 if (moveList.length==0) {

  return [-1, -1];
 }

 else {

  let max = 0;

  bestDecision = [ moveList[0][0], moveList[0][1] ];

  for (let i = 0; i<moveList.length; i++) {

   let currMove = [ moveList[i][0], moveList[i][1] ];

   let newBoard = nextBoard(currBoard, currMove, moveList, currPlayer);

   let val = minMax(newBoard, oppnent, currPlayer, 1, -100, 100);

   if (val>max) {

    max = val;

    bestDecision = currMove;
   }
  }

  return bestDecision;
 }

}

function isGameEnd(board, currPlayer ) {

 let zeroCount = 0;

 for (let i=0; i<board.length; i++) {

  for (let j=0; j<board[0].length; j++) {

   if (board[i][j]==0) {
    zeroCount++;
   }
  }
 }
 let boardFull = zeroCount==0;

 let opponent = (currPlayer==1)?2:1;
 let bothNoMove = nextAvailables(board, currPlayer).length==0 && nextAvailables(board, opponent).length==0;

 return zeroCount==0 || bothNoMove;
}
// let lst = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3];
// let arr = list2Arr(lst, 4);
// console.log(arr);
//
// // test
// console.log("start");
// console.log(curr);
//
// let ps = nextAvailables(curr, 1);
// console.log("valid positions:");
// console.log(ps);
//
// let nm = [ps[2][0], ps[2][1]];
// console.log("next move: "+nm);
//
// let res = nextBoard(curr, nm, ps, 1);
// console.log(res);
// console.log("end");
