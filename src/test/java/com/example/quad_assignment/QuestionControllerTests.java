package com.example.quad_assignment;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;

import com.quad_assignment.CategoryResponse;
import com.quad_assignment.QuestionController;
import com.quad_assignment.QuestionForFrontend;

@SpringBootTest(classes = QuestionController.class)
class QuestionControllerTests {

    private QuestionController questionController;

    @BeforeEach
    void setUp() {
        questionController = new QuestionController();
    }

    @Test
    void testGetCategories() {
    	CategoryResponse cat = questionController.cat();
    	
    	assertNotNull(cat.getTrivia_categories().get(0));
    }

    @Test
    void testGetQuestion() {
    	QuestionForFrontend question = questionController.getQuestion(null, null, null);
    	
    	assertEquals(question.getResponse_code(), 0);
    	assertNotNull(question.getAnswers().get(0));
    }
}