import styled from "styled-components";
import { proportions } from "../proportions";

const Movement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${proportions.divMargin.desktop};

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    svg {
      font-size: 25px;
    }
  }
`;
const NextStep = styled.div`
  display: flex;
  justify-content: center;

  button {
    padding: 10px 15px 10px 20px;
  }
`;
const PrevStep = styled.div`
  display: flex;
  justify-content: center;

  button {
    padding: 10px 20px 10px 10px;
  }
`;

export { Movement, NextStep, PrevStep };
