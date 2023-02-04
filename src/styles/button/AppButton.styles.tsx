import styled from "styled-components";

import { SpinnerContainer } from "../spinner/Spinner.styles";

export const BaseButton = styled.button`
  min-width: 200px;
  width: auto;
  height: 40px;
  letter-spacing: 0.5px;
  line-height: 40px;
  padding: 0 35px 0 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: whitesmoke;
  color: #3b3b3b;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #5b5b5b;
    color: whitesmoke;
    transition: all 0.2s ease-in;
  }

  :disabled {
    font-weight: bold;
    font-size: larger;
    pointer-events: none;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: whitesmoke;
  color: #3b3b3b;
  min-width: 50px;
  padding: 0;

  &:hover {
    background-color: #3b3b3b;
    color: white;
    border: none;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;
