import { useMutation, useQueryClient } from "@tanstack/react-query";
import TodoService from "@api/todoService";

const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const useAddTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.createTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  const useUpdateTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.updateTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  const useDeleteTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.deleteTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Todos"] });
      },
    });
  };

  return { useAddTodoMutate, useUpdateTodoMutate, useDeleteTodoMutate };
};

export default useTodoMutation;
