import AppButton, { BUTTON_TYPE_CLASSES } from "@styles/button/AppButton";
import { useContext, useState, useEffect, FormEvent } from "react";
import styled from "styled-components";

const TodoForm = () => {
  const [content, setContent] = useState("");

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContent("");
    // todo submit
  };

  return (
    <TodoFormContainer>
      <h3>make new todo</h3>
      <TodoInputForm onSubmit={submitHandler}>
        <input
          type="text"
          name="todo"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Write a todo"
        />
        <AppButton buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
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
