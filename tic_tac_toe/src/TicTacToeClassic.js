import React, { useState } from 'react';

/*
  Main Container for TicTacToe Classic

  Features:
  - Two-player turn-based play ("X" and "O")
  - Centered 3x3 clickable grid
  - Win and draw detection
  - Game status display (turn, win, draw)
  - Reset button
  - Theming: primary (white #fff), secondary (#222), accent (#4caf50)
  - Layout: Turn display above grid, status + reset button below
*/

// Color palette
const COLORS = {
  primary: '#ffffff',
  secondary: '#222222',
  accent: '#4caf50'
};

// Combination indices for win
const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6] // diagonals
];

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main component for TicTacToe Classic Game.
   * Manages grid state, player turns, win/draw logic, and UI.
   */
  // State: Squares (9), 'X' or 'O', Next Player, Game Status
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    /**
     * Handles click on a square.
     * Ignores if already filled or game is over.
     */
    if (squares[idx] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /**
     * Resets the game to initial state.
     */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  // Status message
  let statusMsg;
  if (winner) {
    statusMsg = (
      <span>
        <span style={{ color: COLORS.accent, fontWeight: 600 }}>
          {winner}
        </span>
        {' wins!'}
      </span>
    );
  } else if (isDraw) {
    statusMsg = <span>It&rsquo;s a <span style={{ color: COLORS.accent, fontWeight: 600 }}>draw!</span></span>;
  } else {
    statusMsg = (
      <span>
        Next turn:&nbsp;
        <span style={{
          color: xIsNext ? COLORS.accent : COLORS.secondary,
          fontWeight: 700
        }}>
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  // Render a single square
  function renderSquare(idx) {
    return (
      <button
        className="ttt-square"
        style={{
          color: squares[idx] === 'X'
            ? COLORS.accent
            : squares[idx] === 'O'
            ? COLORS.secondary
            : COLORS.primary,
          borderColor: '#bbb',
          background: 'transparent'
        }}
        onClick={() => handleSquareClick(idx)}
        disabled={!!squares[idx] || !!winner || isDraw}
        aria-label={`Square ${Math.floor(idx/3)+1},${idx%3+1}${
          squares[idx] ? ' filled with ' + squares[idx] : ''
        }`}
      >
        {squares[idx] ? squares[idx] : ''}
      </button>
    );
  }

  return (
    <div className="ttt-container">
      <div className="ttt-board-container">
        {/* Current player's turn */}
        <div className="ttt-turn" style={{
          marginBottom: 18,
          fontWeight: 600,
          fontSize: '1.3rem',
        }}>
          {winner
            ? (<span>Game over</span>)
            : (<span>
                <span style={{
                  color: xIsNext ? COLORS.accent : COLORS.secondary
                }}>{xIsNext ? 'X' : 'O'}</span>
                &nbsp;turn
              </span>)
          }
        </div>
        {/* 3x3 board */}
        <div className="ttt-board" role="grid">
          {[0,1,2].map(row =>
            <div className="ttt-row" role="row" key={row}>
              {[0,1,2].map(col => renderSquare(row * 3 + col))}
            </div>
          )}
        </div>
        {/* Status + reset */}
        <div className="ttt-status-row">
          <div className="ttt-status-text">{statusMsg}</div>
          <button
            className="ttt-reset-btn"
            onClick={handleReset}
            aria-label="Reset Game"
          >
            Reset
          </button>
        </div>
      </div>
      {/* Inline styling for component-specific styles */}
      <style>{`
      .ttt-container {
        width: 100vw;
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .ttt-board-container {
        background: ${COLORS.primary};
        color: ${COLORS.secondary};
        border-radius: 16px;
        box-shadow: 0 2px 18px rgba(34, 34, 34, 0.18);
        padding: 30px 30px 22px 30px;
        margin: 34px 0 0 0;
        min-width: 330px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .ttt-board {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin-bottom: 16px;
      }
      .ttt-row {
        display: flex;
        flex-direction: row;
      }
      .ttt-square {
        width: 60px;
        height: 60px;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.3rem;
        font-family: inherit;
        background: transparent;
        border: 2px solid #bbb;
        border-right: none;
        border-bottom: none;
        cursor: pointer;
        transition: background 0.15s, color 0.3s;
        outline: none;
        user-select: none;
      }
      .ttt-row .ttt-square:last-child {
        border-right: 2px solid #bbb;
      }
      .ttt-board .ttt-row:last-child .ttt-square {
        border-bottom: 2px solid #bbb;
      }
      .ttt-square:disabled {
        cursor: not-allowed;
        opacity: 0.55;
        background: #eee;
      }
      .ttt-status-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-top: 12px;
        width: 100%;
      }
      .ttt-status-text {
        font-size: 1.12rem;
        font-weight: 500;
      }
      .ttt-reset-btn {
        border: none;
        background: ${COLORS.accent};
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 5px;
        padding: 10px 18px;
        cursor: pointer;
        transition: background 0.20s;
        margin-left: auto;
      }
      .ttt-reset-btn:hover,
      .ttt-reset-btn:focus {
        background: #41993a;
      }
      @media (max-width: 480px) {
        .ttt-board-container {
          min-width: unset; width: 100vw; border-radius: 0; padding: 12px 1vw 12px 1vw;
        }
        .ttt-board {
          scale: 0.90;
        }
      }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /**
   * Checks all win conditions for the current state.
   * @param {Array} squares - string or null for each square.
   * @returns {'X'|'O'|null}
   */
  for (let [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

export default TicTacToeClassic;
