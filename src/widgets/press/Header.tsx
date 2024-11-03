"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import PressHeaderImage from "@/assets/press_header.png";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SubServicesHeader = () => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Desc>
          <div>
            <h3>{t("Press")}</h3>
            <p>
              {t(
                "Welcome to Varpet’s press kit. Here you'll find essential information about who we are, what we do, and why we matter in the industry."
              )}
            </p>
            <MyButton>
              <a href="https://varpet.com/downloads/varpet_fact_sheet.pdf">
                {t("Get it now")}
              </a>
            </MyButton>
          </div>
          <CircleBlue />
          <CircleOrange />
        </Desc>
        <Image src={PressHeaderImage} alt="press-image" />
      </Box>
    </Container>
  );
};

export default SubServicesHeader;

const Container = styled.section`
  background-color: #f9f9fa;
  width: 100%;

  @media screen and (max-width: 1024px) {
    background-color: transparent;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${proportions.divMargin.desktop};

  img {
    width: 50%;
    object-fit: cover;

    @media screen and (max-width: 1024px) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    position: relative;
    justify-content: center;
    padding: ${proportions.screenPadding.desktop};
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Desc = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  padding: 0 ${proportions.screenPadding.desktop};
  z-index: 1;

  p {
    margin: ${proportions.textMargin.desktop} 0;
    width: 70%;

    @media screen and (max-width: 768px) {
      width: 100%;
      margin: ${proportions.textMargin.tablet} 0;
    }
  }

  button {
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${proportions.textMargin.tablet};
  }

  @media screen and (max-width: 1024px) {
    background-color: #f9f9faa2;
    width: 100%;
    margin-left: 0;
    padding: ${proportions.screenPadding.desktop};
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  top: -50%;
  right: 70%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1828px) {
    top: -20%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const CircleOrange = styled.div`
  position: absolute;
  top: -20%;
  right: 30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1828px) {
    top: 10%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
