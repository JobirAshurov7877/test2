"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import AppStore from "@/assets/about/app-store-white.svg";
import GooglePlay from "@/assets/about/google-store-white.svg";
import WhyOne from "@/assets/about/why1.svg";
import WhyTwo from "@/assets/about/why2.svg";
import WhyThree from "@/assets/about/why3.svg";
import { useState } from "react";
import VideoPoster from "@/assets/videoposter.png";
import { FaPlay } from "react-icons/fa";
import { MyButton } from "@/ui";
import ExploreServices from "@/components/ExploreServices";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { NavigationLink } from "@/components";

const AboutUsClient = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [showVideo, setShowVideo] = useState(false);

  const handleImageClick = () => {
    setShowVideo(true);
  };

  return (
    <>
      <Container>
        <Header>
          <h1>{t("Solve all your problems in one platform")}</h1>
          <p>{t("aboutus_page_description")}</p>
          <Store>
            <div>
              <a href="https://varpet.onelink.me/px3l/jc3yinnx" target="blank">
                <Image src={AppStore} alt="app store" />
              </a>
            </div>
            <div>
              <a href="https://varpet.onelink.me/px3l/jc3yinnx" target="blank">
                <Image src={GooglePlay} alt="google play" />
              </a>
            </div>
          </Store>
          <CircleBlue />
          <CircleOrange />
          <CircleBlueSecond />
          <CircleOrangeSecond />
        </Header>
        <VideoSections>
          {!showVideo ? (
            <ImageContainer onClick={handleImageClick}>
              <Image src={VideoPoster} alt="Thumbnail" />
              <span>
                <PlayButton>
                  <FaPlay />
                </PlayButton>
              </span>
            </ImageContainer>
          ) : (
            <VideoContainer>
              {locale === "hy" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/qwTyqqngWz4?si=wgzBXgmcy066mUUD"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/O7YvjMsjqVs?si=CYP7Q69iAnsWMPvc"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              )}
            </VideoContainer>
          )}
        </VideoSections>
        <WhyChooseUs>
          <h5>{t("Why choose us?")}</h5>
          <p>{t("aboutus_page_why_choose_description")}</p>
          <Qualities>
            <Quality>
              <Image src={WhyOne} alt="why image" />
              <p>{t("Quality services")}</p>
            </Quality>
            <Quality>
              <Image src={WhyTwo} alt="why image" />
              <p>{t("Affordable prices")}</p>
            </Quality>
            <Quality>
              <Image src={WhyThree} alt="hy image" />
              <p>{t("Fast service")}</p>
            </Quality>
          </Qualities>
        </WhyChooseUs>
        <JoinUs>
          <h5>{t("Join the Varpet team!")}</h5>
          <p>
            {t(
              "Along with the growth of orders, we always need new specialists"
            )}
          </p>
          <NavigationLink href="/join-to-the-program">
            <MyButton>{t("How to join?")}</MyButton>
          </NavigationLink>
        </JoinUs>
        <ExploreServices />
      </Container>
    </>
  );
};

export default AboutUsClient;

const Container = styled.div`
  width: 100%;

  section {
    margin: 0 auto;
    max-width: ${proportions.bodyMaxWidthMax};
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.divMargin.desktop};

    @media screen and (max-width: 768px) {
      gap: ${proportions.divMargin.mobile};
      padding: ${proportions.screenPadding.tablet};
    }
    @media screen and (max-width: 481px) {
      gap: ${proportions.divMargin.mobile};
      padding: ${proportions.screenPadding.mobile};
    }

    &:nth-child(4) {
      padding-top: 0;
    }
  }
`;

const Header = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${proportions.divMargin.desktop};

  p {
    width: 60%;
    @media screen and (max-width: 1024px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }
`;

const Store = styled.div`
  display: flex;
  gap: ${proportions.divMargin.desktop};

  img {
    background-color: black;
    border-radius: 8px;

    @media screen and (max-width: 481px) {
      width: 150px;
    }
  }

  @media screen and (max-width: 481px) {
    align-items: center;
    gap: ${proportions.divMargin.mobile};
  }
`;

const VideoSections = styled.section`
  position: relative;
  width: 40%;
  height: 0;
  padding-top: 56.25%; /* 16:9 aspect ratio (change as needed) */
  overflow: hidden;
  height: 500px;

  @media screen and (max-width: 1921px) {
    width: 60%;
  }

  @media screen and (max-width: 1200px) {
    width: 80%;
  }

  @media screen and (max-width: 1024px) {
    height: 350px;
  }

  @media screen and (max-width: 481px) {
    height: 250px;
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  &:hover img {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
  }
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #fff;
  width: 70px;
  height: 70px;
  background-color: #ff4d4d;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  @media screen and (max-width: 1024px) {
    height: 350px;
  }
`;

const WhyChooseUs = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 60%;
    @media screen and (max-width: 1024px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }
`;

const Qualities = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  gap: ${proportions.divMargin.desktop};
  flex-wrap: wrap;
  padding: ${proportions.divMargin.desktop};
  @media screen and (max-width: 1024px) {
    padding: ${proportions.divMargin.tablet};
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.mobile};
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Quality = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const JoinUs = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    width: 60%;
    @media screen and (max-width: 1024px) {
      width: 70%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    left: 10%;
    top: 50%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrange = styled.div`
  position: absolute;
  top: 10%;
  left: 30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    left: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleBlueSecond = styled.div`
  position: absolute;
  top: 10%;
  right: 20%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    top: 50%;
    right: 10%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrangeSecond = styled.div`
  position: absolute;
  top: 30%;
  right: 30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    right: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

{
}
