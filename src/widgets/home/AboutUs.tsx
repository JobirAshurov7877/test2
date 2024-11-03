"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import AboutOne from "@/assets/home/about-one.png";
import AboutTwo from "@/assets/home/about-two.png";
import AboutThree from "@/assets/home/about-three.png";
import AboutFor from "@/assets/home/about-for.png";
import AboutFive from "@/assets/home/about-five.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
export default function AboutUs() {
  const t = useTranslations();
  return (
    <Container>
      <Box>
        <Title>
          <h3>{t("About us")}</h3>
          <p>
            {t(
              "We provide reliable, high-quality, affordable services, which are carried out thanks to masters with years of experience and knowledge. Make managing your home or business space improvements easier than ever. Discover a new standard of relief from everyday worries with our platform."
            )}
          </p>
        </Title>
        <AboutImages>
          <Imagew>
            <Image src={AboutOne} alt="about us images" />
          </Imagew>
          <Imagew>
            <Image src={AboutTwo} alt="about us images" />
          </Imagew>
          <Imagew>
            <Image src={AboutThree} alt="about us images" />
          </Imagew>
          <Imagew>
            <Image src={AboutFor} alt="about us images" />
          </Imagew>
          <Imagew>
            <Image src={AboutFive} alt="about us images" />
          </Imagew>
        </AboutImages>
      </Box>
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};
  background-color: white;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

const Box = styled.div`
  margin: 0 auto;
  max-width: ${proportions.bodyMaxWidthMax};
  gap: ${proportions.divMargin.tablet};
  padding: ${proportions.divMargin.desktop};

  @media screen and (max-width: 1300px) {
    margin: ${proportions.divMargin.desktop} auto;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  width: 50%;
  gap: ${proportions.divMargin.tablet};

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Imagew = styled.div``;

const AboutImages = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-top: ${proportions.divMargin.tablet};
  img {
    width: 100%;
    height: 100%;
    transition: 0.3s;

    &:hover {
      transform: translateY(-10px);
    }
  }

  @media screen and (max-width: 1024px) {
    ${Imagew}:nth-child(1) {
      display: none;
    }
    ${Imagew}:nth-child(5) {
      display: none;
    }
  }
`;
