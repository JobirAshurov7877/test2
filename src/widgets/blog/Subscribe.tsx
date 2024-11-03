"use client";
import { MyColors } from "@/styles/color";
import { proportions } from "@/styles/proportions";
import { MyButton, MyInput } from "@/ui";
import { useTranslations } from "next-intl";
import styled from "styled-components";

const Subscribe = () => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Title>
          {t("Get the latest")} <span>Varpet</span>
          {t("articles delivered to your inbox.")}
        </Title>
        <SubscribeContainer>
          <MyInput
            type="email"
            placeholder={t("YOUR EMAIL")}
            onChange={() => ""}
          ></MyInput>
          <MyButton>{t("Subscribe")}</MyButton>
        </SubscribeContainer>
      </Box>
    </Container>
  );
};

export default Subscribe;

const Container = styled.section`
  overflow: hidden;
  max-width: ${proportions.maxScreenWidth};
  padding: 0 ${proportions.screenPadding.desktop};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 0 ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: 0 ${proportions.screenPadding.mobile};
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: ${proportions.divMargin.desktop};
  max-width: ${proportions.bodyMaxWidth};
  padding: ${proportions.screenPadding.desktop};
  background-color: #e5f2fb;
  border-radius: 24px;
  margin-bottom: 50px;

  h4 {
    margin: ${proportions.divMargin.desktop} 0;

    @media screen and (max-width: 768px) {
      margin: ${proportions.divMargin.tablet} 0;
    }

    @media screen and (max-width: 481px) {
      margin: ${proportions.divMargin.mobile} 0;
    }
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
    margin: ${proportions.sectionMargin.tablet} auto 0 auto;
    gap: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
    margin: ${proportions.sectionMargin.mobile} auto 0 auto;
    gap: ${proportions.divMargin.mobile};
  }
`;

const Title = styled.h3`
  font-weight: 500;
  width: 50%;
  text-align: start !important;
  @media screen and (max-width: 717px) {
    width: 100%;
  }

  span {
    color: ${MyColors.primary};
  }
`;

const SubscribeContainer = styled.div`
  display: flex;
  width: 500px;

  @media screen and (max-width: 717px) {
    width: 100%;
  }

  input {
    border-radius: 10px 0 0 10px;
    box-shadow: 0 0 0 transparent;
    transition: 0.3s;

    &:hover {
      transform: scale(1.1);
      transform: translateX(-1px);
      border-radius: 10px 0 0 10px;
      box-shadow: 0 0 0 transparent;
      background-color: #f8f8f8 !important;
    }
  }

  button {
    border-radius: 0 10px 10px 0;
  }
`;
