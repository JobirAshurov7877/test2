"use client";
import { useEffect, useRef, useState } from "react";
import { MyColors } from "@/styles/color";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { GoArrowUpRight } from "react-icons/go";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { MyButton } from "@/ui";
import Link from "next/link";
import Image from "next/image";
import { imagesAPI } from "../../../env";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { api } from "@/services/axios";
import { NavigationLink } from "@/components";

export default function OurServices() {
  const [categories, setCategories] = useState<any[]>([]);
  const t = useTranslations();
  const splideRef = useRef<null | any>();
  const currentLanguage = useLocale();

  useEffect(() => {
    const fetchHtmlFile = async () => {
      try {
        const response = await api.get(
          `/api/roots-with-direct-subs/${currentLanguage}`
        );
        setCategories(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchHtmlFile();
  }, [currentLanguage]);

  return (
    <Container>
      <Box>
        <Desc>
          <h3>{t("Our services")}</h3>
          <p>{t("home_our_team_desc")}</p>
          <MyButton>
            <NavigationLink href="/services">{t("View all")}</NavigationLink>
            <GoArrowUpRight />
          </MyButton>
        </Desc>
        <Carousel>
          <SplideContainer
            options={{
              type: "slide",
              gap: proportions.divMargin.desktop,
              perPage: 3,
              arrows: false,
              pagination: false,
              breakpoints: {
                1473: { perPage: 2 },
                1150: { perPage: 1 },
                853: { perPage: 2 },
                800: { gap: proportions.divMargin.tablet },
                600: { perPage: 1 },
              },
            }}
            ref={splideRef}
          >
            {categories &&
              categories.map((category) => (
                <SplideItem key={category.id}>
                  <Imagew>
                    <Image
                      src={imagesAPI + category.image}
                      width={1000}
                      height={1000}
                      alt="category"
                    />
                  </Imagew>
                  <Overlay className="overlay">
                    <OverlayBlur />
                    <h6>{category.title}</h6>
                    <p className="opacity-paragraph">
                      {category.description === "."
                        ? t("sub_service_about_desc")
                        : category.description}
                    </p>
                    <MyButton $variant="secondary">
                      <NavigationLink
                        href={`/services/service/${category?.id}/${category?.slug}`}
                      >
                        {t("Learn more")}
                      </NavigationLink>
                      <GoArrowUpRight />
                    </MyButton>
                  </Overlay>
                </SplideItem>
              ))}
          </SplideContainer>
          <Nav>
            <div>
              <IoIosArrowRoundBack
                onClick={() => splideRef.current?.go("-1")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div>
              <IoIosArrowRoundForward
                onClick={() => splideRef.current?.go("+1")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Nav>
        </Carousel>
      </Box>
    </Container>
  );
}
const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const Box = styled.div`
  margin: ${proportions.sectionMargin.desktop} auto;
  max-width: ${proportions.bodyMaxWidthMax};
  background-color: white;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: ${proportions.divMargin.desktop};
  padding: ${proportions.divMargin.desktop};

  @media screen and (max-width: 853px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
    margin: ${proportions.sectionMargin.tablet} auto;
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${proportions.textMargin.desktop};
  width: 25%;

  @media screen and (max-width: 1473px) {
    width: 40%;
  }

  @media screen and (max-width: 853px) {
    width: 100%;
  }
  button {
    display: flex;
    align-items: start;
    gap: ${proportions.textMargin.mobile};

    svg {
      transform: translateY(1px);
      font-size: 20px;
    }
  }
`;

const Carousel = styled.div`
  position: relative;
  width: 75%;

  @media screen and (max-width: 1473px) {
    width: 60%;
  }

  @media screen and (max-width: 1150px) {
    width: 55%;
  }

  @media screen and (max-width: 853px) {
    width: 100%;
  }

  .splide {
    visibility: visible;
  }
`;

const SplideContainer = styled(Splide)``;
const SplideItem = styled(SplideSlide)`
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover .overlay {
    top: 20%;

    .opacity-paragraph {
      opacity: 1;
    }
  }
`;

const Nav = styled.div`
  color: #0279dc;
  z-index: 99;

  div {
    border: 1px solid ${MyColors.primary};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    &:hover {
      background-color: ${MyColors.primary};
    }

    &:hover svg {
      color: white;
    }
  }

  div:first-child {
    position: absolute;
    top: 40%;
    transform: translateY(40%);
    left: -22px;
    z-index: 10;

    @media screen and (max-width: 481px) {
      left: 0;
      top: 105%;
    }
  }

  div:last-child {
    position: absolute;
    transform: translateY(40%);
    top: 40%;
    right: -22px;
    z-index: 10;

    @media screen and (max-width: 481px) {
      right: 0;
      top: 105%;
    }
  }

  svg {
    font-size: 40px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Imagew = styled.div`
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  max-width: 100%;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 80%;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px ${proportions.divMargin.tablet};
  z-index: 1;
  overflow: hidden;
  transition: 0.3s;

  @media screen and (max-width: 481px) {
    padding: 20px ${proportions.textMargin.desktop};
  }

  p {
    height: 160px;
    overflow: scroll;
    margin: calc(${proportions.textMargin.desktop} + 0px) 0;
    opacity: 0;
    transition: 1s;
  }

  h6 {
    color: ${MyColors.primary};
  }

  button {
    display: flex;
    align-items: start;
    float: right;
    gap: ${proportions.textMargin.mobile};
    transform: translateY(-8px);

    svg {
      transform: translateY(1px);
      font-size: 20px;
    }
  }
`;

const OverlayBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  border-radius: 16px 16px 0 0;
  z-index: -1;
  opacity: 0.92;
  filter: brightness(95%);
`;
