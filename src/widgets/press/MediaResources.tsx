"use client";
import styled from "styled-components";
import Logo from "@/assets/logo.svg";
import DnImages from "@/assets/press/dn_images.svg";
import DnFactSheet from "@/assets/press/dn_fact_sheet.svg";
import { proportions } from "@/styles/proportions";
import { TbCloudDownload } from "react-icons/tb";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MediaResources = () => {
  const t = useTranslations();

  return (
    <Container>
      <h4>{t("Media Resources")}</h4>
      <Box>
        <Item>
          <Imagew>
            <Image src={Logo} alt="logo" />
          </Imagew>
          <Anchor href="https://varpet.com/downloads/varpet_logos.zip">
            <TbCloudDownload />
            {t("Download logos")}
          </Anchor>
        </Item>
        <Item>
          <Imagew>
            <Image src={DnImages} alt="download images" />
          </Imagew>
          <Anchor href="https://varpet.com/downloads/varpet_images.zip">
            <TbCloudDownload />
            {t("Download images")}
          </Anchor>
        </Item>
        <Item>
          <Imagew>
            <Image src={DnFactSheet} alt="download fact sheet" />
          </Imagew>
          <Anchor href="https://varpet.com/downloads/varpet_fact_sheet.pdf">
            <TbCloudDownload />
            {t("Download fact sheet")}
          </Anchor>
        </Item>
      </Box>
    </Container>
  );
};

export default MediaResources;

const Container = styled.section`
  width: 100%;
  max-width: ${proportions.bodyMaxWidth};
  margin: ${proportions.sectionMargin.desktop} auto;

  h4 {
    font-weight: 700;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    margin: ${proportions.sectionMargin.tablet} auto;
  }
  @media screen and (max-width: 481px) {
    margin: ${proportions.sectionMargin.mobile} auto;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${proportions.divMargin.desktop};
  flex-wrap: wrap;
  padding: ${proportions.screenPadding.desktop};

  @media screen and (max-width: 1230px) {
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
    gap: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
    gap: ${proportions.divMargin.mobile};
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.tablet};
  background-color: white;
  padding: 12px;
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 660px) {
    width: 100%;
  }

  @media screen and (max-width: 481px) {
    width: 100%;
  }
`;

const Imagew = styled.div`
  width: 320px;
  height: 230px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9fa;

  img {
    transition: 0.3s;
    width: 60%;
  }
  &:hover img {
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.textMargin.desktop};
    width: 250px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 660px) {
    width: 100%;
    height: 130px;
    img {
      width: 60%;
      height: 100%;
    }
  }

  @media screen and (max-width: 481px) {
    width: 100%;
    img {
      height: 100%;
    }
  }
`;
const Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${proportions.textMargin.tablet};
  color: #0078db;
  font-size: 18px;
  margin: 12px 0;

  &:hover {
    color: #014c85;
  }
`;
