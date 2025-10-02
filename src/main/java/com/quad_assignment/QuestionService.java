package com.quad_assignment;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class QuestionService {
    private final Map<String, String> correctAnswerMap = new ConcurrentHashMap<>();

    public QuestionForFrontend createQuestion(Question question) {
        // Generate a unique ID for this question
        String id = UUID.randomUUID().toString();

        // Store the correct answer server-side
        correctAnswerMap.put(id, question.getCorrect_answer());

        // Add answers and sort
        List<String> answers = new ArrayList<>();
        answers.add(question.getCorrect_answer());
        answers.addAll(question.getIncorrect_answers());
        Collections.sort(answers); //Sort alphabetically, I like it more than random

        QuestionForFrontend questionForFrontend = new QuestionForFrontend();
        questionForFrontend.setId(id);
        questionForFrontend.setQuestion(question.getQuestion());
        questionForFrontend.setAnswers(answers);
        return questionForFrontend;
    }

    public AnswerResponse checkAnswer(AnswerSubmission submission) {
        String correctAnswer = correctAnswerMap.get(submission.getId());
        AnswerResponse answer = new AnswerResponse();
        
        answer.setCorrectAnswer(correctAnswer);

        // Clean the map
        correctAnswerMap.remove(submission.getId());

        return answer;
    }
}