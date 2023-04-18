import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import useTodoMutation from "@hooks/mutations/useTodoMutation";

interface CardProps {
  content: string;
  id: number;
  isCompleted: boolean;
}

const Card: React.FC<CardProps> = ({ content, id, isCompleted }) => {
  const { useUpdateTodoMutate, useDeleteTodoMutate } = useTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutate();
  const { mutate: deleteTodo } = useDeleteTodoMutate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [isChecked, setIsChecked] = useState(isCompleted);

  const editContentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditContent(() => e.target.value);
  };

  const editTodoHandler = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      if (window.confirm("Are you sure want to change it ?")) {
        updateTodo({ todo: editContent, id, isCompleted: isChecked });
      }
    }
  };

  const deleteTodoHandler = () => {
    if (isEditMode) {
      setIsEditMode(!isEditMode);
      return;
    }
    if (window.confirm("Are you sure you want to delete?")) {
      deleteTodo(id);
    }
  };

  const changeCheckboxHandler = () => {
    setIsChecked(!isChecked);
    updateTodo({ todo: content, id, isCompleted: !isChecked });
  };

  return (
    <TodoCardContainer>
      <input
        className="checkbox"
        type="checkbox"
        onChange={changeCheckboxHandler}
        checked={isChecked}
      />
      <TodoCardContent>
        {isEditMode ? (
          <input
            className="edit-mode"
            type="text"
            data-testid="modify-input"
            value={editContent}
            onChange={editContentHandler}
          />
        ) : (
          <span>{content}</span>
        )}
      </TodoCardContent>
      <TodoCardButtons>
        <button
          onClick={editTodoHandler}
          data-testid={isEditMode ? "submit-button" : "modify-button"}
        >
          {isEditMode ? <AiFillCheckCircle /> : <AiFillEdit />}
        </button>
        <button
          onClick={deleteTodoHandler}
          data-testid={isEditMode ? "cancel-button" : "delete-button"}
        >
          {isEditMode ? <GiCancel /> : <AiFillDelete />}
        </button>
      </TodoCardButtons>
    </TodoCardContainer>
  );
};

const TodoCardContainer = styled.li`
  margin: 10px 0;
  padding: 10px;

  display: flex;
  align-items: center;
  border: 2px solid white;
  text-align: start;

  border-radius: 20px;
  min-width: 300px;

  input.checkbox {
    margin: auto 10px;
    cursor: pointer;
  }
`;

const TodoCardButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;

  button {
    background-color: transparent;
    font-size: 18px;
    color: whitesmoke;
    border: none;
    cursor: pointer;

    :hover {
      color: yellow;
    }
    :active {
      transform: scale(0.98);
    }
  }
`;
const TodoCardContent = styled.div`
  padding: 5px;

  .edit-mode {
    padding: 5px;
    font-size: 16px;
  }
`;

export default Card;
