import TodoForm from "@components/TodoForm";
import TodoList from "@components/TodoList";
import styled from "styled-components";

const Todo = () => {
  return (
    <TodoWrapper>
      <TodoForm />
      <TodoList />
    </TodoWrapper>
  );
};

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  gap: 30px;
`;

export default Todo;
