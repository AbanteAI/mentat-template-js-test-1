import { useState, useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface SudokuData {
  puzzle: (number | null)[];
  solution: number[];
  difficulty: number;
}

interface SudokuProps {
  onError: Dispatch<SetStateAction<string | null>>;
}

function Sudoku({ onError }: SudokuProps) {
  const [sudokuData, setSudokuData] = useState<SudokuData | null>(null);
  const [userGrid, setUserGrid] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const fetchNewPuzzle = useCallback(async () => {
    setLoading(true);
    onError(null);

    try {
      const response = await fetch('/api/sudoku');
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data: SudokuData = await response.json();
      setSudokuData(data);
      setUserGrid([...data.puzzle]);
      setShowSolution(false);
    } catch (err) {
      console.error('Error fetching sudoku:', err);
      onError(
        err instanceof Error ? err.message : 'Failed to load sudoku puzzle'
      );
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    fetchNewPuzzle();
  }, [fetchNewPuzzle]);

  const handleCellChange = (index: number, value: string) => {
    if (!sudokuData) return;

    const newGrid = [...userGrid];
    const numValue = value === '' ? null : parseInt(value, 10);

    // Only allow changes to originally empty cells
    if (sudokuData.puzzle[index] === null) {
      if (numValue === null || (numValue >= 1 && numValue <= 9)) {
        newGrid[index] = numValue;
        setUserGrid(newGrid);
      }
    }
  };

  const toggleSolution = () => {
    if (!sudokuData) return;

    if (showSolution) {
      setUserGrid([...sudokuData.puzzle]);
      setShowSolution(false);
    } else {
      setUserGrid([...sudokuData.solution]);
      setShowSolution(true);
    }
  };

  const renderGrid = () => {
    if (!sudokuData) return null;

    return (
      <div className="sudoku-grid">
        {userGrid.map((cell, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          const isOriginal = sudokuData.puzzle[index] !== null;
          const isBoxBorder =
            (row % 3 === 2 && row < 8) || (col % 3 === 2 && col < 8);

          return (
            <input
              key={index}
              type="text"
              value={cell || ''}
              onChange={(e) => handleCellChange(index, e.target.value)}
              className={`sudoku-cell ${isOriginal ? 'original' : 'user'} ${isBoxBorder ? 'box-border' : ''}`}
              maxLength={1}
              readOnly={isOriginal}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="sudoku-container">
      <div className="sudoku-header">
        <h2>Sudoku Puzzle</h2>
        {sudokuData && (
          <p className="difficulty">
            Difficulty: {sudokuData.difficulty.toFixed(2)}
          </p>
        )}
      </div>

      {loading ? (
        <div className="loading">Generating new puzzle...</div>
      ) : (
        <>
          {renderGrid()}
          <div className="sudoku-controls">
            <button onClick={fetchNewPuzzle} disabled={loading}>
              New Puzzle
            </button>
            <button onClick={toggleSolution} disabled={!sudokuData}>
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Sudoku;
