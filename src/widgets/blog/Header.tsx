"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { MyColors } from "@/styles/color";
import { useState } from "react";
import { useTranslations } from "next-intl";
import FormattedDate from "@/components/FormattedDate";
import { NavigationLink } from "@/components";
import Image from "next/image";

const Header = ({ latestArticle }: any) => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Desc>
          <div>
            <LatestBlog>{t("Latest blog")}</LatestBlog>
            <h1>{latestArticle?.title}</h1>
            <p>{latestArticle?.short_description}</p>
            <DateAndButton>
              <CreatedDate>
                <FormattedDate createdAt={latestArticle?.created_at || ""} />
              </CreatedDate>
              <MyButton $variant="borderLess">
                <NavigationLink href={`/blog/${latestArticle?.slug}`}>
                  {t("Read More")}
                </NavigationLink>
                <HiOutlineArrowUpRight />
              </MyButton>
            </DateAndButton>
          </div>
          <CircleBlue />
          <CircleOrange />
        </Desc>
        <ImageW>
          <Image
            src={latestArticle?.image}
            alt={latestArticle?.image_title}
            loading="lazy"
            fill
          />
        </ImageW>
      </Box>
    </Container>
  );
};

export default Header;

const Container = styled.section`
  width: 100%;
  @media screen and (max-width: 1024px) {
    background-color: transparent;
  }
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  gap: ${proportions.divMargin.desktop};

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
const ImageW = styled.div`
  position: relative;
  width: 50%;
  height: 470px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: cover;
  }
`;

const Desc = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  padding: ${proportions.screenPadding.desktop};
  z-index: 1;

  p {
    margin: ${proportions.textMargin.desktop} 0;
    width: 100%;

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

    svg {
      font-size: 16px;
    }
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

const LatestBlog = styled.p`
  color: ${MyColors.primary};
  font-weight: 400;
`;

const DateAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${proportions.textMargin.tablet};
  margin: ${proportions.divMargin.desktop} 0;

  button {
    border: none;
    &:hover {
      border: none;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 768px) {
    margin: ${proportions.divMargin.desktop} 0;
  }
`;

const CreatedDate = styled.div`
  font-size: 16px;
  color: ${MyColors.secondary};

  @media screen and (max-width: 1024px) {
    color: ${MyColors.primary};
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  top: 10%;
  right: 70%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1828px) {
    top: 20%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const CircleOrange = styled.div`
  position: absolute;
  top: 30%;
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
