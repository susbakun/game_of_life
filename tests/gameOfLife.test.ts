import { describe, it, expect } from 'vitest'
import { dead_state, random_state, next_board_state } from '../src/state'

describe('Game of Life', () => {
  describe('dead_state', () => {
    it('should create a board of all zeros', () => {
      const board = dead_state(3, 3)
      expect(board).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])
    })

    it('should create a board with correct dimensions', () => {
      const board = dead_state(5, 4)
      expect(board.length).toBe(4) // height
      expect(board[0].length).toBe(5) // width
      expect(board.every(row => row.length === 5)).toBe(true)
    })

    it('should create a board with all zeros', () => {
      const board = dead_state(10, 10)
      const allZeros = board.every(row => row.every(cell => cell === 0))
      expect(allZeros).toBe(true)
    })
  })

  describe('random_state', () => {
    it('should create a board with correct dimensions', () => {
      const board = random_state(5, 4)
      expect(board.length).toBe(4)
      expect(board[0].length).toBe(5)
    })

    it('should contain only 0s and 1s', () => {
      const board = random_state(10, 10)
      const validValues = board.every(row => 
        row.every(cell => cell === 0 || cell === 1)
      )
      expect(validValues).toBe(true)
    })
  })

  describe('next_board_state', () => {
    it('should handle a simple case correctly', () => {
      const init_state = [
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 0]
      ]

      // With wrapping, all cells get 3 neighbors and become alive
      const expected_next_state = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]

      const actual_next_state = next_board_state(init_state)
      expect(actual_next_state).toEqual(expected_next_state)
    })

    it('should kill cells with fewer than 2 neighbors (underpopulation, with wrapping)', () => {
      const init_state = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(init_state)
      // With wrapping, [0][0] has neighbors from opposite edges
      // Let's verify it dies (should have fewer than 2 neighbors)
      expect(next_state[0][0]).toBe(0) // Should die
    })

    it('should kill cells with more than 3 neighbors (overpopulation)', () => {
      const init_state = [
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(init_state)
      expect(next_state[0][1]).toBe(0) // Center cell has 4 neighbors, should die
    })

    it('should keep cells alive with 2 or 3 neighbors (survival)', () => {
      const init_state = [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ]

      const next_state = next_board_state(init_state)
      // Cell at [1][1] has 2 neighbors, should survive
      expect(next_state[1][1]).toBe(1)
    })

    it('should create new cells with exactly 3 neighbors (reproduction)', () => {
      const init_state = [
        [0, 1, 0],
        [1, 0, 1],
        [0, 0, 0]
      ]

      const next_state = next_board_state(init_state)
      // Cell at [1][1] has 3 neighbors, should become alive
      expect(next_state[1][1]).toBe(1)
    })

    it('should handle a blinker pattern', () => {
      // Blinker: horizontal line that becomes vertical
      const horizontal = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]

      const vertical = [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]

      const next_state = next_board_state(horizontal)
      expect(next_state).toEqual(vertical)
    })

    it('should handle a block pattern (still life)', () => {
      // Block: should remain unchanged
      const block = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]

      const next_state = next_board_state(block)
      expect(next_state).toEqual(block)
    })

    it('should handle empty board', () => {
      const empty = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(empty)
      expect(next_state).toEqual(empty)
    })

    it('should maintain board dimensions', () => {
      const board = [
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1]
      ]

      const next_state = next_board_state(board)
      expect(next_state.length).toBe(3)
      expect(next_state[0].length).toBe(3)
    })

    it('should handle edge cells correctly', () => {
      const board = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(board)

      expect(next_state[0][0]).toBe(1)
    })

    it('should wrap top edge to bottom edge', () => {
      
      const board = [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(board)

      expect(next_state[2][0]).toBe(1)
      expect(next_state[2][1]).toBe(1)
      expect(next_state[2][2]).toBe(1)
    })

    it('should wrap left edge to right edge', () => {
      const board = [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0]
      ]

      const next_state = next_board_state(board)
      // Right column should be affected by left column wrapping
      // Each cell in right column gets 3 neighbors from left column, so becomes alive
      expect(next_state[0][2]).toBe(1)
      expect(next_state[1][2]).toBe(1)
      expect(next_state[2][2]).toBe(1)
    })

    it('should wrap corners correctly', () => {
      const board = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]
      ]

      const next_state = next_board_state(board)

      expect(next_state[2][2]).toBe(1)
    })

    it('should handle a pattern that wraps around edges', () => {
      const board = [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
      ]

      const next_state = next_board_state(board)
      expect(next_state[1][1]).toBe(0)
    })

    it('should maintain wrapping behavior across multiple generations', () => {
      const gen1 = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ]

      const gen2 = next_board_state(gen1)

      const expected = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ]
      expect(gen2).toEqual(expected)
    })
  })
})

