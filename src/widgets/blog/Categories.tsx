"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { MyButton, MyInput } from "@/ui";
import { MyColors } from "@/styles/color";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { blogCategoryStore } from "@/valtio-store/blogCategoryStore";
import {
  fetchFilteredBlogArticles,
  filterBlogArticles,
} from "@/store/blogFilteredSlice";
import { BlogCategories } from "@/interfaces/blog.interface";

interface CategoriesProps {
  categories: BlogCategories[];
}
const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const t = useTranslations();
  const currentLanguage = useLocale();
  const [active, setActive] = useState<number | undefined>(0);
  const [searchArticles, setSearchArticles] = useState<string>("");
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchArticles(event.target.value);
  };

  const handleClick = (id: number) => {
    setActive(id);
    blogCategoryStore.blogCategoryId = id;
  };

  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchArticles.trim() !== "") {
      handleSearchButtonClick(); // Call your search function
      const subServiceElement = document?.getElementById(`all-articles`);
      if (subServiceElement) {
        subServiceElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleSearchButtonClick = () => {
    setActive(undefined);
    blogCategoryStore.blogCategoryId = -1;
    dispatch(filterBlogArticles(searchArticles));
  };

  useEffect(() => {
    dispatch(fetchFilteredBlogArticles(currentLanguage));
  }, [dispatch, currentLanguage]);

  return (
    <Container>
      <Box>
        <OverlayBlur></OverlayBlur>
        <Title>{t("Search for articles")}</Title>
        <Wrapper>
          <form onSubmit={handleSearchFormSubmit}>
            <SearchContainer>
              <MyInput
                type="text"
                value={searchArticles}
                onChange={handleSearchInputChange}
                placeholder={t("Search")}
              />
            </SearchContainer>
            <SvgContainer>
              <MyButton type="submit">
                <BiSearchAlt />
              </MyButton>
            </SvgContainer>
          </form>
          <Ul>
            <Li $active={active === 0} onClick={() => handleClick(0)}>
              <h6>{t("All")}</h6>
            </Li>
            {categories.map((category, index) => (
              <Li
                $active={active === category.id}
                onClick={() => handleClick(category.id)}
                key={index}
              >
                <h6>{category.name}</h6>
              </Li>
            ))}
          </Ul>
        </Wrapper>
      </Box>
    </Container>
  );
};

export default Categories;

const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.sectionMargin.desktop};
  transform: translateY(-${proportions.divMargin.desktop});

  @media screen and (max-width: 1024px) {
    padding: ${proportions.divMargin.desktop};
    transform: translateY(0);
  }
  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
  }

  h3 {
    text-align: center;
    margin-bottom: ${proportions.divMargin.desktop};

    @media screen and (max-width: 768px) {
      margin-bottom: ${proportions.divMargin.tablet};
    }
    @media screen and (max-width: 481px) {
      margin-bottom: ${proportions.divMargin.mobile};
    }
  }
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: ${proportions.bodyMaxWidth};
  flex-wrap: wrap;
  padding: 0 ${proportions.screenPadding.desktop} 20px 50px;
  box-shadow: 0 0 4px #e2dfdf;
  border-radius: 24px;

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const OverlayBlur = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #ffffffe0;
  filter: blur(1px);
  border-radius: 16px;
  z-index: -1;
`;

const Wrapper = styled.div`
  width: 100%;
  > form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${proportions.textMargin.mobile};
  }
`;

const Title = styled.h4`
  margin: ${proportions.textMargin.desktop} 0;
  font-weight: 500;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  input {
    padding: 20px 10px;

    @media screen and (max-width: 1024px) {
      padding: 17px 10px;
    }

    ::placeholder {
      font-size: 20px;
    }
  }
`;

const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: white;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${proportions.divMargin.tablet};
  margin-top: ${proportions.divMargin.tablet};

  @media screen and (max-width: 1200px) {
    gap: ${proportions.divMargin.mobile};
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.textMargin.desktop};
    justify-content: start;
  }
`;

const Li = styled.li<{ $active: boolean }>`
  color: ${(props) => (props.$active ? MyColors.primary : MyColors.secondary)};
  transition: 0.1s;
  cursor: pointer;

  h6 {
    font-weight: 400;
  }

  &:hover {
    color: ${MyColors.primary};
  }
`;
