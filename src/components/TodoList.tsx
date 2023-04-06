import Spinner from "@styles/spinner/Spinner";
import { useTodo } from "context/todoContext";
import styled from "styled-components";
import Card from "./TodoCard";

const TodoList = () => {
  const { todos, isLoading } = useTodo();
  return (
    <TodoListContainer>
      <h3>TodoList</h3>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="lists">
          <ul>
            {todos ? (
              todos.map((todo) => (
                <Card
                  key={todo.id}
                  id={todo.id}
                  content={todo.todo}
                  isCompleted={todo.isCompleted}
                />
              ))
            ) : (
              <li> no result in here</li>
            )}
          </ul>
        </div>
      )}
    </TodoListContainer>
  );
};

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default TodoList;
