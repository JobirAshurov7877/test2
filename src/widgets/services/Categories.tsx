"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import styled from "styled-components";
import { MyColors } from "@/styles/color";
import { MyButton } from "@/ui";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchCategories } from "@/store/categoriesSlice";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const currentLanguage = useLocale();
  const t = useTranslations("");

  useEffect(() => {
    (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
      fetchCategories(currentLanguage)
    );
  }, [dispatch, currentLanguage]);

  const toggleCategory = (title: string) => {
    setOpenCategories((prevOpenCategories) =>
      prevOpenCategories.includes(title)
        ? prevOpenCategories.filter((category) => category !== title)
        : [...prevOpenCategories, title]
    );
  };

  const scrollToSubservice = (subServiceId: number) => {
    const subServiceElement = document.getElementById(
      `subservice-${subServiceId}`
    );
    if (subServiceElement) {
      subServiceElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <ToggleButton $isBoxOpen={isBoxOpen} onClick={toggleBox}>
        <MyButton>
          {t("Categories")}{" "}
          {isBoxOpen ? <FaCircleArrowDown /> : <FaCircleArrowUp />}
        </MyButton>
      </ToggleButton>
      <Box $isOpen={isBoxOpen}>
        <Title>{t("Categories")}</Title>
        <ul>
          {categories.map((category) => (
            <div key={category.id}>
              <Li>
                <span onClick={() => toggleCategory(category.title)}>
                  {category.title}
                  {openCategories.includes(category.title) ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
                <SubServicesUl
                  className={
                    openCategories.includes(category.title) ? "open" : ""
                  }
                >
                  {category.subServices &&
                    category.subServices.map((subService: any) => (
                      <SubServicesLi key={subService.id}>
                        <a
                          onClick={() => {
                            setIsBoxOpen(false);
                            scrollToSubservice(subService.id);
                          }}
                        >
                          {subService.title}
                        </a>
                      </SubServicesLi>
                    ))}
                </SubServicesUl>
              </Li>
            </div>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  width: 30%;

  @media screen and (max-width: 1024px) {
    position: fixed;
    bottom: 0px;
    right: 0;
    width: 100%;
    z-index: 9999;
  }
`;

const ToggleButton = styled.div<{ $isBoxOpen: boolean }>`
  display: none;
  position: sticky;
  width: 100%;
  background-color: transparent;

  button {
    display: flex;
    justify-content: center;
    position: relative;
    margin-bottom: ${({ $isBoxOpen }) => ($isBoxOpen ? "0" : "20px")};
    padding: 10px 15px;
    background-color: ${MyColors.primary};
    color: white;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    z-index: 9998;

    svg {
      position: absolute;
      top: -15px;
      color: white;
      background-color: ${MyColors.primary};
      border-radius: 50%;
      font-size: 24px;
      z-index: 9999;
    }
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Box = styled.div<{ $isOpen: boolean }>`
  position: sticky;
  top: 130px;
  height: 540px;
  overflow-y: scroll;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 5px;
  background-color: white;
  transition: 0.2s;

  @media screen and (max-height: 800px) {
    top: 5%;
  }

  @media screen and (max-width: 1024px) {
    height: ${(props) => (props.$isOpen ? "500px" : "0")};
  }
`;

const Title = styled.h4`
  color: #0078db;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 999;
  padding: 20px;
  font-weight: 500;
`;

const Li = styled.li`
  margin: 25px 0;
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.1s ease-in;
    padding: 0px 20px 10px 20px;

    &:hover {
      color: ${MyColors.primary};
    }
  }
`;

const SubServicesUl = styled.ul`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.1s ease-in-out;

  &.open {
    max-height: 1000px;
    overflow: visible;
  }
`;

const SubServicesLi = styled.li`
  color: ${MyColors.secondary};
  transition: all 0.1s ease-in-out;
  padding: 10px 30px;

  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f2f2f2;
  }

  a {
    display: inline-block;
    width: 100%;
    font-weight: 400;
    font-size: 15px;
  }
`;
