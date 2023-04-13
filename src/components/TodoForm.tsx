import useTodoMutation from "@hooks/mutations/useTodoMutation";
import AppButton, { BUTTON_TYPE_CLASSES } from "@styles/button/AppButton";
import { FormEvent, useRef } from "react";
import styled from "styled-components";

const TodoForm = () => {
  const { useAddTodoMutate } = useTodoMutation();
  const { mutate: addTodo } = useAddTodoMutate();
  const todoContentRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoContentRef.current || !todoContentRef.current?.value) {
      alert("Write new todo~!!");
      return;
    }

    const newTodo = todoContentRef.current.value;
    addTodo({ todo: newTodo });
    todoContentRef.current.value = "";
  };

  return (
    <TodoFormContainer>
      <h3>make new todo</h3>
      <TodoInputForm onSubmit={submitHandler}>
        <input
          type="text"
          name="todo"
          data-testid="new-todo-input"
          ref={todoContentRef}
          placeholder="Write a todo"
        />
        <AppButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          type="submit"
          data-testid="new-todo-add-button"
        >
          추가
        </AppButton>
      </TodoInputForm>
    </TodoFormContainer>
  );
};

const TodoFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    padding: 10px 0;
    text-transform: uppercase;
  }
`;
const TodoInputForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    padding: 5px;
    font-size: 16px;
    width: 250px;
  }
`;

export default TodoForm;
