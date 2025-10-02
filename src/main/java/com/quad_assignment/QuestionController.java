package com.quad_assignment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class QuestionController {
	private final QuestionService questionService = new QuestionService();
	
	@GetMapping("/cat")
	public CategoryResponse cat() {
		String url = "https://opentdb.com/api_category.php";
		RestTemplate restTemplate = new RestTemplate();
		
		return restTemplate.getForObject(url, CategoryResponse.class);
	}
	
	@GetMapping("/token")
	public Token getToken() {
		String url = "https://opentdb.com/api_token.php?command=request";
		RestTemplate restTemplate = new RestTemplate();
		
		return restTemplate.getForObject(url, Token.class);
	}
	
	@GetMapping("/token_reset")
	public TokenReset resetToken(
			@RequestParam(required=true) String token) {
		String url = "https://opentdb.com/api_token.php?command=reset&token=" + token;
		RestTemplate restTemplate = new RestTemplate();
		
		return restTemplate.getForObject(url, TokenReset.class);
	}
	
	@GetMapping("/question")
	public QuestionForFrontend getQuestion(
			@RequestParam(required=false) Integer category, 
			@RequestParam(required=false) String difficulty, 
			@RequestParam(required=false) String token) 
	{
		String url = "https://opentdb.com/api.php?amount=1";
		if(category != null ) {
			url += "&category=" + category;
		}
		if(difficulty != null) {
			url += "&difficulty=" + difficulty;
		}
		if(token != null) {
			url += "&token=" + token;
		}
		
		RestTemplate restTemplate = new RestTemplate();
		TriviaResponse triviaResponse = restTemplate.getForObject(url, TriviaResponse.class);
		
		Integer response_code = triviaResponse.getResponse_code();
		
		QuestionForFrontend question;
		
		if(response_code == 0 && !triviaResponse.getResults().isEmpty()) {
			question = questionService.createQuestion(triviaResponse.getResults().get(0));
		} else {
			question = new QuestionForFrontend();
		}
		
		question.setResponse_code(response_code);
		
		return question;
	}
	
	@PostMapping("/answer")
    public AnswerResponse checkAnswer(
    		@RequestBody AnswerSubmission submission) 
	{
        return questionService.checkAnswer(submission);
    }
}