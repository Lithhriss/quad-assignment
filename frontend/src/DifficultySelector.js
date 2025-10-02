import React from "react";
import './DifficultySelector.css';

function DifficultySelector({selectedDifficulties, setSelectedDifficulties}) {
  const difficulties = ["easy", "medium", "hard"];
  
  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulties((currentDifficulties) =>
      currentDifficulties.includes(difficulty)
        ? currentDifficulties.filter((d) => d !== difficulty) // Remove if already active
        : [...currentDifficulties, difficulty] // Add if not active
    );
  };

  return (
	<div className="difficulty-group">Question difficulty: 
	  {difficulties.map((diff) => (
	    <button
	      key={diff}
	      onClick={() => toggleDifficulty(diff)}
	      className={`toggle-button ${
	        selectedDifficulties.includes(diff)
	          ? "toggle-on"
	          : "toggle-off"
	      }`}
	    >
	      {diff.charAt(0).toUpperCase() + diff.substring(1)}
	    </button>
	  ))}
	</div>
  );
}

export default DifficultySelector;