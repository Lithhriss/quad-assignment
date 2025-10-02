import { render, screen, fireEvent } from "@testing-library/react";
import DifficultySelector from "./DifficultySelector";

describe("DifficultySelector", () => {
  test("Renders all difficulty buttons", () => {
    const mockSet = jest.fn();
    render(
      <DifficultySelector
        selectedDifficulties={[]}
        setSelectedDifficulties={mockSet}
      />
    );

    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });

  test("Clicking a difficulty toggles it on", () => {
    const mockSet = jest.fn();
	const { rerender } = render(
      <DifficultySelector
        selectedDifficulties={[]}
        setSelectedDifficulties={mockSet}
      />
    );

    const easyButton = screen.getByText("Easy");
	expect(easyButton).toHaveClass("toggle-off");
	expect(easyButton).not.toHaveClass("toggle-on");
		
    fireEvent.click(easyButton);

    // Should call setSelectedDifficulties with "easy" added
    expect(mockSet).toHaveBeenCalledTimes(1);
    const updateSelectedDifficulties = mockSet.mock.calls[0][0];
    const newState = updateSelectedDifficulties([]);
    expect(newState).toContain("easy");
	
	// Rerender with easy selected
    rerender(
      <DifficultySelector
        selectedDifficulties={["easy"]}
        setSelectedDifficulties={mockSet}
      />
    );

	const easyButtonAfterRefresh = screen.getByText("Easy");
	expect(easyButtonAfterRefresh).toHaveClass("toggle-on");
	expect(easyButtonAfterRefresh).not.toHaveClass("toggle-off");

  });

  test("Clicking again toggles it off", () => {
    const mockSet = jest.fn();
    const { rerender } = render(
      <DifficultySelector
        selectedDifficulties={["easy"]}
        setSelectedDifficulties={mockSet}
      />
    );

    const easyButton = screen.getByText("Easy");
	expect(easyButton).toHaveClass("toggle-on");
	expect(easyButton).not.toHaveClass("toggle-off");
	
    fireEvent.click(easyButton);

    // Should call setSelectedDifficulties with easy removed
    const updaterFn = mockSet.mock.calls[0][0];
    const newState = updaterFn(["easy"]);
    expect(newState).not.toContain("easy");
	
	// Rerender with nothing selected
	rerender(
      <DifficultySelector
        selectedDifficulties={[]}
        setSelectedDifficulties={mockSet}
      />
    );
	
	const easyButtonAfterRefresh = screen.getByText("Easy");
	expect(easyButtonAfterRefresh).toHaveClass("toggle-off");
	expect(easyButtonAfterRefresh).not.toHaveClass("toggle-on");
  });
});