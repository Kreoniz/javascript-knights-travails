class Position {
  constructor(coords, path) {
    this.coords = coords;
    this.path = path;
  }

  getAvailableMoves() {
    const moves = [];

    // All moves for the knight
    const MOVE_LIST = [
      [2, 1],
      [-2, 1],
      [2, -1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ];

    for (let i = 0; i < MOVE_LIST.length; i += 1) {
      let move = this.coords.slice();
      move[0] += MOVE_LIST[i][0];
      move[1] += MOVE_LIST[i][1];

      if (
        move[0] >= 0
        && move[0] < 8
        && move[1] >= 0
        && move[1] < 8
      ) {
        const movePosPath = this.path.concat([move]);
        const movePos = new Position(move, movePosPath);
        moves.push(movePos);
        }
      }

    return moves;
  }
}

function knightMoves(start, end) {
  const position = new Position(start, [start]);
  const visited = [JSON.stringify(position.coords)];

  const queue = [position];
  let pos = 0;

  while (JSON.stringify(pos.coords) !== JSON.stringify(end)) {
    console.log('Queue:', queue.map((v) => v.coords));
    console.log();
    pos = queue.shift();

    const moves = pos.getAvailableMoves();
    for (let i = 0; i < moves.length; i += 1) {
      if (!visited.includes(JSON.stringify(moves[i].coords))) {
        queue.push(moves[i]);
        visited.push(JSON.stringify(moves[i].coords));
      }
    }
  }

  return pos.path;
}
