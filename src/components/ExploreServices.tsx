"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import IOS from "@/assets/home/app-store.svg";
import ANDROID from "@/assets/home/google-store.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ExploreServices = () => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Desc>
          <h3>{t("Are you ready to achieve perfection")}</h3>
          <p>{t("hire_an_expert")}</p>
          <Buttons>
            <a href="https://varpet.onelink.me/px3l/jc3yinnx" target="blank">
              <Image src={IOS} alt="play store" />
            </a>
            <a href="https://varpet.onelink.me/px3l/jc3yinnx" target="blank">
              <Image src={ANDROID} alt="google play" />
            </a>
          </Buttons>
        </Desc>
      </Box>
    </Container>
  );
};

export default ExploreServices;

const Container = styled.section`
  max-width: 2560px !important;
  background: rgb(197, 217, 255);
  background: linear-gradient(
    90deg,
    rgba(197, 217, 255, 1) 50%,
    rgba(247, 247, 248, 1) 100%
  );
`;

const Box = styled.div`
  width: 100%;
  max-width: ${proportions.bodyMaxWidth};
  margin: 0 auto;
  gap: ${proportions.divMargin.desktop};
  padding: ${proportions.sectionMargin.desktop};

  @media screen and (max-width: 1024px) {
    padding: ${proportions.sectionMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  p {
    margin: ${proportions.textMargin.desktop} 0;
    width: 50%;

    @media screen and (max-width: 1024px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      margin-top: ${proportions.screenPadding.tablet};
      width: 100%;
    }
    @media screen and (max-width: 768px) {
      margin-top: ${proportions.screenPadding.mobile};
    }
  }

  button {
    margin-top: ${proportions.divMargin.desktop};
    font-size: 18px;
    font-weight: 800;

    @media screen and (max-width: 768px) {
      margin-top: ${proportions.screenPadding.tablet};
    }
    @media screen and (max-width: 768px) {
      margin-top: ${proportions.screenPadding.mobile};
    }
  }
`;

const Buttons = styled.div``;
