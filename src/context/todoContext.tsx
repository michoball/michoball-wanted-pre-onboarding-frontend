import { ITodoData } from "@api/todoService";
import { createContext, useState, useEffect, useCallback } from "react";
import TodoService from "@api/todoService";

interface TodoContextType {
  todos: ITodoData[];
  setUserToken: (token: string) => void;
  addTodo: (newTodo: string) => void;
  deleteTodo: (todoId: number) => void;
  updateTodo: (item: ITodoData) => void;
  isLoading: boolean;
}

const TodoContext = createContext<TodoContextType>({
  todos: [],
  deleteTodo: (todoId: number) => {},
  addTodo: (newTodo: string) => {},
  updateTodo: (item: ITodoData) => {},
  setUserToken: (token: string) => {},
  isLoading: true,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<ITodoData[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodoListsHandler = useCallback(async () => {
    const data = await TodoService.getAllTodo();
    setTodos(data.sort((a, b) => a.id - b.id));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (userToken) fetchTodoListsHandler();
  }, [fetchTodoListsHandler, userToken]);

  const deleteTodoHandler = async (todoId: number) => {
    await TodoService.deleteTodo(todoId);
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const addTodoHandler = async (newTodo: string) => {
    const data = await TodoService.createTodo({ todo: newTodo });
    setTodos([data, ...todos].sort((a, b) => a.id - b.id));
  };

  const updateTodoHandler = async (upTodo: ITodoData) => {
    const data = await TodoService.updateTodo(upTodo);
    setTodos(
      todos.map((item) => (item.id === upTodo.id ? { ...item, ...data } : item))
    );
  };

  const value = {
    todos,
    isLoading,
    setUserToken,
    deleteTodo: deleteTodoHandler,
    addTodo: addTodoHandler,
    updateTodo: updateTodoHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
