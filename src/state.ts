import type { CellCoord } from "./shared/types"

export function dead_state(width: number, height: number): number[][] {
  let state = []
  for (let i = 0; i < height; i++) {
    let row = []
    for (let j = 0; j < width; j++) {
      row.push(0)
    }
    state.push(row)
  }

  return state
}

export function random_state(width: number, height: number): number[][] {
  let state = dead_state(width, height);
  for (let i = 0; i < height; i++){
    for (let j = 0; j < width; j++) {
      if (Math.random() > 0.5) {
        state[i][j] = 1
      }else {
        state[i][j] = 0
      }
    }
  }

  return state
}

export function next_board_state(initial_board: number[][]): number[][] {
  let next_board = dead_state(initial_board[0].length, initial_board.length)

  for (let i = 0; i < initial_board.length; i++) {
    for (let j = 0; j < initial_board[0].length; j++) {
      let coord: CellCoord = {i, j}
      let alives = count_alives(initial_board, coord)

      if (initial_board[i][j] == 1) {
        if (alives < 2) {
          next_board[i][j] = 0
        }else if (alives > 3) {
          next_board[i][j] = 0
        }else {
          next_board[i][j] = 1
        }
      } else if (initial_board[i][j] == 0 && alives === 3) {
        next_board[i][j] = 1
      }
    }
  }
  return next_board
}

function count_alives(initial_board: number[][], coord: CellCoord) {
  let alives = 0;
  let {i, j} = coord;
  let offsets = [-1, 1]
  let n = initial_board.length; let m = initial_board[0].length;

  for (let k of offsets) {
    let i_offset = (i + k + n) % n
    let j_offset = (j + k + m) % m
    let i_rev_offset = (i - k + n) % n

    if (initial_board[i_offset][j_offset] === 1) {
      alives++
    }

    // handling the most left corner on the next row
    // and the most right corner on the previous row
    if (initial_board[i_rev_offset][j_offset] === 1) {
      alives++
    }

    if (initial_board[i][j_offset] === 1) {
      alives++
    }

    if (initial_board[i_offset][j] === 1) {
      alives++
    }
  }

  return alives
}