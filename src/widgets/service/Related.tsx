import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Category } from "@/interfaces/category.interface";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { proportions } from "@/styles/proportions";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchRootsData } from "@/store/rootsSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { imagesAPI } from "../../../env";

interface RelatedProps {
  services: Category[]; // Define props interface here
  currentCategoryTitle: string;
}

const Related: React.FC<RelatedProps> = ({
  services,
  currentCategoryTitle,
}) => {
  const navigate = useRouter();
  const splideRef = useRef<Splide | null>(null);
  const currentLanguage = useLocale();
  const translations = useTranslations();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const {
    data: roots,
    loading,
    error,
  } = useSelector((state: RootState) => state.roots);

  useEffect(() => {
    dispatch(fetchRootsData(currentLanguage));
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  const prevSlide = () => {
    if (splideRef.current) {
      splideRef.current.go("-1");
    }
  };

  const nextSlide = () => {
    if (splideRef.current) {
      splideRef.current.go("+1");
    }
  };

  const filteredCategories = roots?.filter(
    (category) => category.title !== currentCategoryTitle
  );

  const handleCategory = (
    slug: string,
    categories: Category[],
    itemId: number
  ) => {
    navigate.push(`/${currentLanguage}/services/service/${itemId}/${slug}`);
  };

  return (
    <Container>
      <Box>
        <Header>
          <h4>{translations("Explore other works")}</h4>
          <Nav>
            <IoIosArrowDropleft onClick={prevSlide} />
            <IoIosArrowDropright onClick={nextSlide} />
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
              800: { perPage: 2 },
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
            : filteredCategories?.map((category) => (
                <SplideSlide
                  key={category.title}
                  onClick={() =>
                    handleCategory(category.slug, services, category.id)
                  }
                >
                  <RelatedItem>
                    <Imagew>
                      <Image
                        src={`${imagesAPI + category.image}`}
                        alt={category.title}
                        width={1000}
                        height={1000}
                      />
                    </Imagew>
                    <p>{category.title}</p>
                  </RelatedItem>
                </SplideSlide>
              ))}
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
  height: 250px; /* Adjust height as needed */
  background: linear-gradient(-90deg, #9a9a9a, #f0f0f0, #9e9e9e, #f0f0f0);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 1.5s ease infinite;
  border-radius: 10px 10px 0 0; /* Adjust border radius */
`;

const Container = styled.section`
  width: 100%;

  .splide__track {
    li {
      padding: 2px;
    }
  }
`;

const Box = styled.div`
  max-width: ${proportions.bodyMaxWidth};
  padding: 0 ${proportions.divMargin.desktop};
  margin: ${proportions.sectionMargin.desktop} auto;

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
    margin: ${proportions.sectionMargin.tablet} auto;
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
    margin: ${proportions.sectionMargin.mobile} auto;
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

const Imagew = styled.div`
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
