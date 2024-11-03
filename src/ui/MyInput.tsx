import { MyColors } from "@/styles/color";
import React from "react";
import styled from "styled-components";

interface MyInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  type: string;
  value?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const MyInput: React.FC<MyInputProps> = ({ ...props }) => {
  return <Input {...props} />;
};

export default MyInput;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0 8px #f0f0f1;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 0 5px ${MyColors.primary};
    border-radius: 7px;
    transform: scale(1.01);
  }

  &::placeholder {
    font-size: 14px;
    color: ${MyColors.secondary};
  }
`;
