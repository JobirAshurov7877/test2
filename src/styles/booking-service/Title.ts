import styled from "styled-components";
import { proportions } from "../proportions";

const Title = styled.div`
  margin: ${proportions.divMargin.tablet} 0;
  color: #0078db;

  p {
    color: black;
    margin-top: ${proportions.divMargin.mobile};
  }
`;

export default Title;
