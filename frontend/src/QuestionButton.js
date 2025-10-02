import React, { useState } from "react";
import './QuestionButton.css';

function QuestionButton({ categoryId, selectedDifficulties, setQuestionData, questionData, sessionToken, getNewToken, resetToken, setFeedback }) {
  const [cooldown, setCooldown] = useState(false);
  const [outOfQuestions, setOutOfQuestions] = useState(false);
	
  const fetchQuestion = async () => {
	// Reset state when category/difficulty changes
	setCooldown(true);
	setFeedback("");

	// start 5-second cooldown timer to prevent requesting too fast
	setTimeout(() => setCooldown(false), 5000);

	let url = "/question";
	const params = new URLSearchParams();

	if (categoryId && categoryId !== "") {
	  params.append("category", categoryId);
	}

	// Pick a random difficulty from all those that are selected
	if (selectedDifficulties.length > 0) {
	  const randomIndex = Math.floor(Math.random() * selectedDifficulties.length);
	  params.append("difficulty", selectedDifficulties[randomIndex]);
	}
	
	if (sessionToken) {
		  params.append("token", sessionToken);
		}

	if (params.toString()) {
	  url += "?" + params.toString();
	}

	fetch(url)
	  .then((res) => res.json())
	  .then((question) => {
		if (question.response_code === 4) { // All possible questions have been returned
		  setOutOfQuestions(true);
		  setFeedback("All possible questions for this combination of difficulty and category have been returned. If you want to see the same questions again, press the button to reset your session token.");
	      return;
	    }
		if (question.response_code === 5) { // API rate limited
	      setFeedback("You are too fast, wait a few seconds and try again.");
	      return;
	    }
		setOutOfQuestions(false);
		  
	    setQuestionData(question);
	  })
	  .catch((e) => console.error("Error fetching question: ", e));
	};
	
	const handleResetQuestions = async () => {
	    try {
	      await resetToken();
	      await getNewToken(); 
	      setOutOfQuestions(false); // Hide reset button again
	      setQuestionData(null); // Clear current question, also empties the screen showing a fresh start
	    } catch (e) {
	      console.error("Error handling token reset: ", e);
	    }
	  };

	
	return (
	  <div className="fetch-button-container">
		{
		  !outOfQuestions ? (
			<button
		      onClick={fetchQuestion}
		      disabled={!!cooldown}
			  className={`fetch-button ${
			    cooldown ? "fetch-on-cooldown" : "fetch-available"
			  }`}
		    >
		      {questionData ? "Next question" : "Get a question"}
		    </button>
		  ) : (
			<button
	          onClick={handleResetQuestions}
	          className="reset-token-button"
	        >
	          Reset questions
	        </button>
		  )
		}
	  </div>
	);
}

export default QuestionButton;