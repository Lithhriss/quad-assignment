package com.quad_assignment;

public class Token {
	private int response_code;
	private String response_message;
	private String token;
	
	public int getResponse_code() {	return response_code;	}
	public void setResponse_code(int response_code) {	this.response_code = response_code;	}
	
	public String getResponse_message() {	return response_message;	}
	public void setResponse_message(String response_message) {	this.response_message = response_message;	}
	
	public String getToken() {	return token;	}
	public void setToken(String token) {	this.token = token;	}
}