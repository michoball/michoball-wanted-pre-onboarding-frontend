import { api } from "@utils/api";

export interface Todo {
  todo: string;
}

export interface ITodoData extends Todo {
  id: number;
  isCompleted: boolean;
}

const getAllTodo = async () => {
  const response = await api.get<ITodoData[]>("todos");
  return response.data;
};

const createTodo = async (todo: Todo) => {
  const response = await api.post<ITodoData>("todos", todo);
  return response.data;
};

const updateTodo = async (todoData: ITodoData) => {
  const { todo, id, isCompleted } = todoData;
  const response = await api.put<{ data: ITodoData }>(`todos/${id}`, {
    todo,
    isCompleted,
  });
  return response.data;
};

const deleteTodo = async (id: number) => {
  const response = await api.delete(`todos/${id}`);
  return response.data;
};

const TodoService = {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default TodoService;
