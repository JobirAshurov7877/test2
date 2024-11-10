"use client";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { proportions } from "@/styles/proportions";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchServiceRootData } from "@/store/rootWithServicesSlice";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { imagesAPI } from "../../../env";

interface RelatedProps {
  serviceId: any;
  currentSubServiceId: number;
}

const Related: React.FC<RelatedProps> = ({
  serviceId,
  currentSubServiceId,
}) => {
  const splideRef = useRef<Splide | null>(null);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const currentLanguage = useLocale();
  const translations = useTranslations();
  const { data: category, loading } = useSelector(
    (state: RootState) => state.rootWithServicesSlice
  );

  const handleSubService = (
    slug: string | undefined,
    itemId: number,
    serviceId: number
  ) => {
    navigate.push(
      `/${currentLanguage}/services/${serviceId}/subservice/${itemId}/${slug}`
    );
  };

  useEffect(() => {
    if (serviceId) {
      (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
        fetchServiceRootData({
          rootId: serviceId,
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, currentLanguage, serviceId]);
  console.log(category);

  return (
    <Container>
      <Box>
        <Header>
          <h4>
            {translations("Explore other")} {category?.title}
          </h4>
          <Nav>
            <IoIosArrowDropleft
              onClick={() => splideRef.current?.go("-1")}
              style={{ cursor: "pointer" }}
            />
            <IoIosArrowDropright
              onClick={() => splideRef.current?.go("+1")}
              style={{ cursor: "pointer" }}
            />
          </Nav>
        </Header>
        <Splide
          options={{
            type: "slide",
            rewind: true,
            gap: proportions.divMargin.desktop,
            perPage: 3,
            arrows: false,
            pagination: false,
            breakpoints: {
              800: { perPage: 2, gap: proportions.divMargin.tablet },
              600: { perPage: 1 },
            },
          }}
          ref={splideRef}
        >
          {loading
            ? [...Array(3)].map((_, index) => (
                <SplideSlide key={index}>
                  <LoadingPlaceholder />
                </SplideSlide>
              ))
            : category?.subServices.map((subService) =>
                currentSubServiceId !== subService.id ? (
                  <SplideSlide
                    key={subService.id}
                    onClick={() =>
                      handleSubService(
                        subService.slug,
                        subService.id,
                        serviceId
                      )
                    }
                  >
                    <RelatedItem>
                      <ImageWrapper>
                        <Image
                          src={imagesAPI + subService.image}
                          alt={subService.title}
                          width={500}
                          height={500}
                        />
                      </ImageWrapper>
                      <p>{subService.title}</p>
                    </RelatedItem>
                  </SplideSlide>
                ) : null
              )}
        </Splide>
      </Box>
    </Container>
  );
};

export default Related;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(-90deg, #9a9a9a, #f0f0f0, #9e9e9e, #f0f0f0);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 1.5s ease infinite;
  border-radius: 10px 10px 0 0;
`;

const Container = styled.section`
  width: 100%;
  margin: ${proportions.sectionMargin.desktop} 0;

  @media screen and (max-width: 768px) {
    margin: ${proportions.sectionMargin.tablet} 0;
  }
  @media screen and (max-width: 481px) {
    margin: ${proportions.sectionMargin.mobile} 0;
  }

  .splide__track {
    li {
      padding: 2px;
    }
  }
`;

const Box = styled.div`
  max-width: ${proportions.bodyMaxWidth};
  margin: 0 auto;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    margin-bottom: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 768px) {
    margin-bottom: ${proportions.divMargin.mobile};
  }
`;

const Nav = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};
  color: #0279dc;

  svg {
    font-size: 42px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.textMargin.tablet};
  }
  @media screen and (max-width: 768px) {
    gap: ${proportions.textMargin.mobile};
  }
`;

const RelatedItem = styled.div`
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  cursor: grab;

  p {
    padding: ${proportions.textMargin.desktop} 5px;
    font-weight: 500;
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  img {
    height: 250px;
    width: 100%;
    object-fit: cover;

    transition: 0.1s;

    &:hover {
      transform: scale(1.05); /* Scale up on hover */
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
    }
  }
`;
