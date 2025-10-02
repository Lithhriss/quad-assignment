import React, { useEffect, useState } from "react";
import './QuestionPage.css';

function QuestionPage({ questionData, setFeedback }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  
  useEffect (() => {
	setSelectedAnswer(null);
  }, [questionData]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
	
	fetch("/answer", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({ id: questionData.id, selectedAnswer: answer })
	})
	  .then(res => res.json())
	  .then(answerResponse => {
		setCorrectAnswer(answerResponse.correctAnswer); // For comparions so that we can later colour the buttons
		
		if(answerResponse.correctAnswer === answer) {
		  setFeedback("This is the correct answer!");
		} else {
		  setFeedback("Nope.");
		}
	  });
  };

  return (
    <div className="question-container">
      {questionData && (
        <>
          <h2
            className="question"
            dangerouslySetInnerHTML={{ __html: questionData.question }}
          />
		  <div className="answer">
		    {questionData.answers.map((answer, idx) => {
		      // Decide background color based on if the answers are correct
		      let answerCorrectnessClass = "neutral";
		      if (selectedAnswer) {
		        if (answer === correctAnswer) { // Correct answer is always green
		          answerCorrectnessClass = "answer-correct";
		        } else if (answer != correctAnswer && answer === selectedAnswer) { // Wrongly selected answer shows as red
		          answerCorrectnessClass = "answer-wrong";
		        } else {
		          answerCorrectnessClass = "answer-neutral";
		        }
		      }

		      return (
		        <button
		          key={idx}
		          onClick={() => handleAnswerClick(answer)}
		          disabled={!!selectedAnswer} 
		          className={`answer-button ${answerCorrectnessClass}`}
		          dangerouslySetInnerHTML={{ __html: answer }}
		        />
		      );
		    })}
		  </div>
        </>
      )}
    </div>
  );
}

export default QuestionPage;