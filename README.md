# Conway's Game of Life

A TypeScript implementation of Conway's Game of Life with a web-based visualization. This cellular automaton simulates the evolution of cells on a grid based on simple rules, creating fascinating emergent patterns.

![Toad Pattern](./public/gol-toad.gif)

## Features

- **Interactive Visualization**: Real-time rendering of the Game of Life grid using HTML tables
- **Multiple Patterns**: Includes classic patterns like the Toad and Gosper Glider Gun
- **Wrapping Edges**: The grid wraps around at the edges for continuous evolution
- **Random Generation**: Start with randomly populated grids
- **TypeScript**: Fully typed implementation for better development experience
- **Comprehensive Testing**: Extensive test suite covering all game rules and edge cases

## Game Rules

The Game of Life follows four simple rules:

1. **Underpopulation**: Any live cell with fewer than 2 neighbors dies
2. **Survival**: Any live cell with 2 or 3 neighbors survives to the next generation
3. **Overpopulation**: Any live cell with more than 3 neighbors dies
4. **Reproduction**: Any dead cell with exactly 3 neighbors becomes alive

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd game_of_life
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to the local development URL (typically `http://localhost:5173`).

### Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests once (CI mode):
```bash
npm run test:run
```

## Project Structure

```
├── src/
│   ├── main.ts          # Main application entry point
│   ├── state.ts         # Game logic and state management
│   ├── style.css        # Application styles
│   └── shared/
│       ├── types.ts     # TypeScript type definitions
│       └── patterns.ts  # Predefined Game of Life patterns
├── tests/
│   └── gameOfLife.test.ts  # Comprehensive test suite
├── public/
│   └── gol-toad.gif     # Toad pattern animation
└── package.json
```

## Available Patterns

The project includes several classic Game of Life patterns:

### Toad Pattern
A simple oscillator that alternates between two states every generation.

### Gosper Glider Gun
A pattern that periodically produces gliders - small patterns that move across the grid.

## Implementation Details

- **Grid Wrapping**: The implementation uses modular arithmetic to wrap around grid edges
- **Efficient Rendering**: The visualization updates every 500ms for smooth animation
- **Neighbor Counting**: Optimized algorithm to count live neighbors for each cell
- **State Management**: Clean separation between game logic and rendering

## Development

The project uses:
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript development
- **Vitest**: Fast unit testing framework
- **CSS**: Simple styling for the grid visualization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is open source and available under the MIT License.