import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import Todo from "./Todo";

describe("Todo component tests", () => {
  let doneTodo;
  let notDoneTodo;
  let onClickDelete;
  let onClickComplete;

  beforeEach(() => {
    doneTodo = {
      text: "Eat food",
      done: true,
    };
    notDoneTodo = {
      text: "Wash dishes",
      done: false,
    };

    onClickComplete = jest.fn()
    onClickDelete = jest.fn()
  });

  describe("When task is done", () => {
    beforeEach(() => {
      render(
        <Todo
          todo={doneTodo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      )
      onClickComplete.mockClear();
      onClickDelete.mockClear();
    });

    it("Renders correctly when task is done", () => {
      const text = screen.getByText("Eat food");
      expect(text).toBeDefined();

      const done = screen.getByText("This todo is done");
      expect(done).toBeDefined();

      const deleteButton = screen.getByText("Delete");
      expect(deleteButton).toBeDefined();
    });

    it("Delete button is rendered and clickable", async () => {
      const user = userEvent.setup()
      const deleteButton = screen.getByText("Delete");
      await user.click(deleteButton);
      expect(onClickDelete.mock.calls).toHaveLength(1);
    });
  });

  describe("When task is not done", () => {
    beforeEach(() => {
      render(
        <Todo
          todo={notDoneTodo}
          onClickDelete={onClickDelete}
          onClickComplete={onClickComplete}
        />
      );
      onClickComplete.mockClear();
      onClickDelete.mockClear();
    });

    it("Renders correctly when task is not done", () => {
      const text = screen.getByText("Wash dishes");
      expect(text).toBeDefined();

      const done = screen.getByText("This todo is not done");
      expect(done).toBeDefined();

      const deleteButton = screen.getByText("Delete");
      expect(deleteButton).toBeDefined();

      const completeButton = screen.getByText("Set as done");
      expect(completeButton).toBeDefined();
    });

    it("Buttons are rendered and can be clicked", async () => {
      const user = userEvent.setup()

      const deleteButton = screen.getByText("Delete");
      await user.click(deleteButton);
      expect(onClickDelete.mock.calls).toHaveLength(1);

      const completeButton = screen.getByText("Set as done");
      await user.click(completeButton);
      expect(onClickComplete.mock.calls).toHaveLength(1);
    });
  });
});
