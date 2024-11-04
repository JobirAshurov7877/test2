import styled from "styled-components";
import { proportions } from "@/styles/proportions";

const Box = styled.div`
  max-width: 1569px;
  margin: 0 auto;
  display: flex;
  gap: ${proportions.divMargin.desktop};
  padding: 24px 15px;

  @media screen and (max-width: 768px) {
    margin: ${proportions.divMargin.mobile} auto;
  }

  @media screen and (max-width: 481px) {
  }
`;

export default Box;
