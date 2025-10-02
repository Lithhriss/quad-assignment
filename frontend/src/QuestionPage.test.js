import { render, screen, fireEvent } from "@testing-library/react";
import QuestionPage from "../src/QuestionPage.js";

describe("QuestionPage", () => {
  const testQuestion = {
    response_code: "0",
    question: "Can you press Yes?",
    answers: ["Maybe", "No", "Where?", "Yes"],
    id: "question1"
  };

  test("Renders the question and answers", () => {
    render(<QuestionPage questionData={testQuestion} setFeedback={() => {}} />);
    
    expect(screen.getByText("Can you press Yes?")).toBeInTheDocument();
    expect(screen.getByText("Maybe")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Where?")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  test("Lets user select an answer and locks buttons", async () => {
    render(<QuestionPage questionData={testQuestion} setFeedback={() => {}} />);

    const buttonWithYes = screen.getByText("Yes");
    fireEvent.click(buttonWithYes);

    // After click, button should be disabled
    expect(buttonWithYes).toBeDisabled();
  });
});
