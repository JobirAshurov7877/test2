import React, { useState, useEffect } from "react";
import "./MyCheckBox.scss";
import styled from "styled-components";

interface MyCheckBoxProps {
  id: string;
  onChange: (isChecked: boolean) => void;
  isChecked: boolean | null;
}

const MyCheckBox: React.FC<MyCheckBoxProps> = ({ id, onChange, isChecked }) => {
  const [internalChecked, setInternalChecked] = useState<boolean>(
    isChecked === null ? false : isChecked
  );

  useEffect(() => {
    if (isChecked === null) {
      setInternalChecked(false);
    } else {
      setInternalChecked(isChecked);
    }
  }, [isChecked]);

  const handleInputChange = () => {
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <MyCheckBoxInput
      type="checkbox"
      id={id}
      checked={internalChecked}
      onChange={handleInputChange}
    />
  );
};

export default MyCheckBox;

const MyCheckBoxInput = styled.input`
  min-width: 20px;
  min-height: 20px;
`;
