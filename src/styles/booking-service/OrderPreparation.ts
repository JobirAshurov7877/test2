import styled from "styled-components";
import { proportions } from "@/styles/proportions";

const OrderPreparation = styled.div`
  position: relative;
  width: 70%;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 10px;
  min-height: 50vh;
  padding: ${proportions.divMargin.desktop};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;

  @media screen and (max-width: 1500px) {
    min-height: 50vh;
  }

  @media screen and (max-height: 590px) {
    padding: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 1300px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
  }
`;

export default OrderPreparation;
