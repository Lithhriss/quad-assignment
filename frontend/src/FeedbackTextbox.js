import React from "react";
import './FeedbackTextbox.css';

function FeedbackTextbox( { feedback } ) {

  return (
	<div className="feedback-textbox">
	  {feedback}
	</div>
  );
}

export default FeedbackTextbox;