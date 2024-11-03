import { MyColors } from "@/styles/color";
import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonVariant = "default" | "secondary" | "borderLess";

interface MyButtonProps {
  $variant?: ButtonVariant; // Define possible variants
  children: ReactNode;
  disabled?: boolean; // Add disabled prop
  [key: string]: any; // To allow passing other props
}

const MyButton: React.FC<MyButtonProps> = ({
  $variant = "default", // Default to "default" variant if not specified
  children,
  disabled = false, // Default disabled to false
  ...props
}) => {
  return (
    <Button $variant={$variant} disabled={disabled} {...props}>
      {children}
    </Button>
  );
};

export default MyButton;

const Button = styled.button<{ $variant?: ButtonVariant; disabled?: boolean }>`
  color: white;
  font-size: 14px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: 0.2s;
  background-image: linear-gradient(to right, #009dfe, #0078db);

  /* Conditionally apply styles based on the variant prop */
  ${({ $variant }) =>
    $variant === "secondary" &&
    css`
      background: transparent;
      border: 1px solid #007fe1;
      color: #007fe1;
      &:hover {
        background: #007fe1;
        color: white;
      }
    `}

  ${({ $variant }) =>
    $variant === "borderLess" &&
    css`
      background: transparent;
      border: none;
      padding: 0;
      color: #007fe1;
      border: 1px solid transparent;

      &:hover {
        border: 1px solid ${MyColors.primary};
        color: #014c85;
      }
    `}

    ${({ $variant }) =>
    $variant === "default" &&
    css`
      &:hover {
        background-image: linear-gradient(to right, #006caf, #0066b9);
      }
    `}

  /* Styles for disabled state */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none; /* Disable pointer events */
    `}

  &:hover {
    box-shadow: 0 0 10px #e2dfdf;
  }

  @media screen and (max-width: 1024px) {
    padding: 9px 15px;
  }
  @media screen and (max-width: 768px) {
    padding: 9px 12px;
  }
`;
