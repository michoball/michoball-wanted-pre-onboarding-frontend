import Spinner from "@styles/spinner/Spinner";
import styled from "styled-components";
import Card from "./TodoCard";

const TodoList = () => {
  return (
    <TodoListContainer>
      <h3>TodoList</h3>
      <div className="lists">
        <ul>
          <Card id="1" content="new todo sample" />
        </ul>
        {/* {todos.map((todo) => (
          <Card
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            update={todo.updatedAt}
            create={todo.createdAt}
          />
        ))} */}
      </div>
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
