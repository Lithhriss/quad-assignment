package com.example.quad_assignment;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;

import com.quad_assignment.AnswerResponse;
import com.quad_assignment.AnswerSubmission;
import com.quad_assignment.Question;
import com.quad_assignment.QuestionForFrontend;
import com.quad_assignment.QuestionService;

@SpringBootTest(classes = QuestionService.class)
class QuestionServiceTests {

    private QuestionService questionService;

    @BeforeEach
    void setUp() {
        questionService = new QuestionService();
    }

    @Test
    void testCreateQuestionStoresCorrectAnswerAndSortsAnswers() {
        Question q = new Question();
        q.setQuestion("Can you press Yes?");
        q.setCorrect_answer("Yes");
        q.setIncorrect_answers(java.util.List.of("Maybe", "No", "Where?"));

        QuestionForFrontend frontend = questionService.createQuestion(q);

        assertNotNull(frontend.getId());
        assertEquals("Can you press Yes?", frontend.getQuestion());

        // Answers must contain all options
        assertTrue(frontend.getAnswers().containsAll(java.util.List.of("Maybe", "No", "Where?", "Yes")));

        // Sorted alphabetically
        assertEquals(java.util.List.of("Maybe", "No", "Where?", "Yes"), frontend.getAnswers());
    }

    @Test
    void testCheckAnswerCorrect() {
        Question q = new Question();
        q.setQuestion("Can you press No?");
        q.setCorrect_answer("A test question should not be this confusing.");
        q.setIncorrect_answers(java.util.List.of("No", "Maybe", "Which no?"));

        QuestionForFrontend frontend = questionService.createQuestion(q);

        AnswerSubmission submission = new AnswerSubmission();
        submission.setId(frontend.getId());
        submission.setSelectedAnswer("A test question should not be this confusing.");

        AnswerResponse response = questionService.checkAnswer(submission);

        assertEquals("A test question should not be this confusing.", response.getCorrectAnswer());
    }

    @Test
    void testCheckAnswerWrong() {
        Question q = new Question();
        q.setQuestion("Can you press No?");
        q.setCorrect_answer("A test question should not be this confusing.");
        q.setIncorrect_answers(java.util.List.of("No", "Maybe", "Which no?"));

        QuestionForFrontend frontend = questionService.createQuestion(q);

        AnswerSubmission submission = new AnswerSubmission();
        submission.setId(frontend.getId());
        submission.setSelectedAnswer("No");

        AnswerResponse response = questionService.checkAnswer(submission);

        assertEquals("A test question should not be this confusing.", response.getCorrectAnswer());
        
    }
}