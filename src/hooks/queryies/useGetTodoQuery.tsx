import { useQuery } from "@tanstack/react-query";
import TodoService from "@api/todoService";

const useGetTodoQuery = () => {
  const useGetAllTodoQuery = () => {
    return useQuery({
      queryKey: ["Todos"],
      queryFn: TodoService.getAllTodo,
      select: (data) => data.sort((a, b) => a.id - b.id),
    });
  };

  // const useGetOneTodoQuery = (id: string) => {
  //   return useQuery({
  //     queryKey: ["getOneTodo", id],
  //     queryFn: () => {
  //       return TodoService.getOneTodo(id);
  //     },
  //     enabled: id.length > 0,
  //   });
  // };

  return {
    useGetAllTodoQuery,
    // useGetOneTodoQuery,
  };
};

export default useGetTodoQuery;
