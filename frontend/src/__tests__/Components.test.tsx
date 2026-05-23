import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

describe("Componentes Frontend Reales", () => {
  it("TaskForm llama a onCreate al enviar un titulo valido", async () => {
    const mockOnCreate = vi.fn();
    render(<TaskForm onCreate={mockOnCreate} />);
    
    const input = screen.getByPlaceholderText(/nueva tarea/i);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Estudiar CI/CD" } });
    
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockOnCreate).toHaveBeenCalledWith("Estudiar CI/CD");
  });

  it("TaskList renderiza las tareas y maneja interacciones", () => {
    const mockTasks = [
      { id: 1, title: "Tarea Uno", completed: false },
      { id: 2, title: "Tarea Dos", completed: true }
    ];
    const mockToggle = vi.fn();
    const mockDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockToggle} onDelete={mockDelete} />);

    expect(screen.getByText("Tarea Uno")).toBeDefined();
    expect(screen.getByText("Tarea Dos")).toBeDefined();

    const checkBoxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkBoxes[0]);
    expect(mockToggle).toHaveBeenCalledWith(1);

    const deleteButtons = screen.getAllByText("Eliminar");
    fireEvent.click(deleteButtons[0]);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
