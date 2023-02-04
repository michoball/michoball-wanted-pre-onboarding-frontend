import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { AiFillEdit, AiFillDelete, AiFillCheckCircle } from "react-icons/ai";

interface CardProps {
  content: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ content, id }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const editContentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditContent(() => e.target.value);
  };
  const editTodoHandler = () => {
    //edit
    setIsEditMode(!isEditMode);
    setEditContent(content);
    if (isEditMode) {
      if (window.confirm("Are you sure want to change it ?")) console.log();
      setEditContent("");
      return;
    }
  };

  const deleteTodoHandler = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      //delete
    }
  };
  const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {};

  return (
    <TodoCardContainer>
      <input
        className="checkbox"
        type="checkbox"
        onChange={changeCheckboxHandler}
      />
      <TodoCardContent>
        {isEditMode ? (
          <input
            className="edit-mode"
            type="text"
            value={editContent}
            onChange={editContentHandler}
          />
        ) : (
          <span>{content}</span>
        )}
      </TodoCardContent>
      <TodoCardButtons>
        <button onClick={editTodoHandler}>
          {isEditMode ? <AiFillCheckCircle /> : <AiFillEdit />}
        </button>
        <button onClick={deleteTodoHandler}>
          <AiFillDelete />
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
