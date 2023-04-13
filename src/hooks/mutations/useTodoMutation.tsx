import { useMutation, useQueryClient } from "@tanstack/react-query";
import TodoService from "@api/todoService";

const useTodoMutation = () => {
  const queryClient = useQueryClient();
  const useAddTodoMutate = () => {
    return useMutation({
      mutationFn: TodoService.createTodo,
      onSuccess: () => {
        // invalidateQueries 를 하는 이유: mutation이 끝나고 다시 refetch를 해서 최신의 값을 쓰기위해
        // 아래 옵션을 주지 않으면 화면에 보이는 todo list에 변화가 없다.
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
