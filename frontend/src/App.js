//Author: Mart van Haaften

import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import CategorySelector from "./CategorySelector";
import DifficultySelector from "./DifficultySelector";
import QuestionButton from "./QuestionButton";
import QuestionPage from "./QuestionPage";
import FeedbackTextbox from "./FeedbackTextbox";


function App() {
	const [categoryId, setCategoryId] = useState(null);
	const [selectedDifficulties, setSelectedDifficulties] = useState([]);
	const [questionData, setQuestionData] = useState(null);
	const [sessionToken, setSessionToken] = useState(null);
	const [feedback, setFeedback] = useState(null);
	
	const getNewToken = async () => {
	    try {
	      const res = await fetch("/token");
	      const data = await res.json();
	      if (data.token) {
	        setSessionToken(data.token);
	      }
	    } catch (e) {
	      console.error("Error fetching token:", e);
	    }
	  };
	  
	const resetToken = async () => {
		try {
			let url = "token_reset";
			const params = new URLSearchParams();
			params.append("token", sessionToken);
			
			url += "?" + params.toString();
			
			await fetch(url);
		} catch (e) {
	      console.error("Error resetting token:", e);
	    }
	}
	
	useEffect(() => {
	    getNewToken();
	  }, []);

	return (
		<div className="pagina">
	      <h1 className="pagina-titel">Quiz</h1>
	      <CategorySelector onSelect={setCategoryId}
		    setQuestionData={setQuestionData}
			setFeedback={setFeedback}
		  />
		  
		  <DifficultySelector 
		    selectedDifficulties={selectedDifficulties}
			setSelectedDifficulties={setSelectedDifficulties}
		  />

		  <QuestionPage 
		  questionData={questionData}
		  setFeedback={setFeedback}
		  />
		  
		  <QuestionButton
		    categoryId={categoryId}
			selectedDifficulties={selectedDifficulties}
			setQuestionData={setQuestionData}
			questionData={questionData}
			sessionToken={sessionToken}
			getNewToken={getNewToken}
			resetToken={resetToken}
			setFeedback={setFeedback}
  		  />
		  
		  <FeedbackTextbox
		    feedback={feedback}
		  />
	    </div>

	);
}

export default App;