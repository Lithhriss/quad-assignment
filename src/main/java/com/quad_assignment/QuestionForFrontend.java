package com.quad_assignment;

import java.util.List;

public class QuestionForFrontend {
	private int response_code;
	private String question;
	private List<String> answers;
	private String id;
	
	public int getResponse_code() {	return response_code;	}
	public void setResponse_code(int response_code) {	this.response_code = response_code;	}
	
	public String getQuestion() {	return question;	}
	public void setQuestion(String question) {	this.question = question;	}
	
	public List<String> getAnswers() {	return answers;	}
	public void setAnswers(List<String> answers) {	this.answers = answers;	}
	
	public String getId() {  return id;  }
	public void setId(String id) {  this.id = id;  }
}