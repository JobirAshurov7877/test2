"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import NotFoundPage from "@/components/NotFoundPage";
const PageNotFound = () => {
  return (
    <>
      <Container>
        <Box>
          <NotFoundPage />
        </Box>
      </Container>
    </>
  );
};

export default PageNotFound;

const Container = styled.main`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${proportions.bodyMaxWidth};
  padding: ${proportions.screenPadding.desktop};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
    flex-direction: column;
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.desktop};
  }

  img {
    width: 50%;
    height: 50%;
    @media screen and (max-width: 768px) {
      margin-top: 50px;
      width: 80%;
      height: 80%;
    }
  }
`;
