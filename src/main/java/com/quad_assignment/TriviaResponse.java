package com.quad_assignment;

import java.util.List;

public class TriviaResponse {
	private int response_code;
	private List<Question> results;
	
	public int getResponse_code() {	return response_code;	}
	public void setResponse_code(int response_code) {	this.response_code = response_code;	}
	
	public List<Question> getResults() {	return results;	}
	public void setQuestions(List<Question> results) {	this.results = results;	}
}