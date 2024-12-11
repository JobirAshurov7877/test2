"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MyButton } from "@/ui";
import { FaArrowRightLong } from "react-icons/fa6";
import { proportions } from "@/styles/proportions";
import { imagesAPI } from "../../../env";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { fetchCategories } from "@/store/categoriesSlice";
import { Category } from "@/interfaces/category.interface";
import MyLoadingContainer from "@/components/MyLoadingContainer";
import MyLoading from "@/ui/loading/MyLoading";
import { useRouter } from "next/navigation";

const SubServices: React.FC = () => {
  const t = useTranslations();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const currentLanguage = useLocale();
  const router = useRouter();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
      fetchCategories(currentLanguage)
    );
  }, [dispatch, currentLanguage]);

  const handleSubService = (
    slug: string | undefined,
    itemId: number,
    categoryId: number
  ) => {
    router.push(
      `/${currentLanguage}/services/${categoryId}/subservice/${itemId}/${slug}`
    );
  };

  const handleCategory = (
    slug: string,
    categories: Category[],
    itemId: number
  ) => {
    const categoryQuery = encodeURIComponent(JSON.stringify(categories));
    router.push(`/${currentLanguage}/services/service/${itemId}/${slug}`);

    // const router = useRouter();
    // const { query } = router;
    // const categories = query.categories
    //   ? JSON.parse(decodeURIComponent(query.categories as string))
    //   : [];
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container>
      {loading ? (
        <MyLoadingContainer>
          <MyLoading />
        </MyLoadingContainer>
      ) : (
        categories.map((category, index) => (
          <Box key={category.id}>
            <Services>
              {index !== 0 && <Line />}
              <div>
                <ServiceImage
                  onClick={() =>
                    handleCategory(category.slug, categories, category.id)
                  }
                >
                  <Image
                    src={imagesAPI + category.image}
                    alt={category.title}
                    width={1000}
                    height={1000}
                  />
                  <div className="overlay"></div>
                </ServiceImage>
                <h4
                  onClick={() =>
                    handleCategory(category.slug, categories, category.id)
                  }
                >
                  {category.title}
                </h4>
                <p>
                  {category.description === "."
                    ? "We are currently working on providing detailed information about this service.Please contact us for more information or if you have any questions."
                    : category.description}
                </p>
                <MyButton
                  onClick={() =>
                    handleCategory(category.slug, categories, category.id)
                  }
                >
                  <span>{t("Explore")}</span>
                  <FaArrowRightLong />
                </MyButton>
              </div>
            </Services>
            <SubServicesContainer>
              {category.subServices &&
                category.subServices.map((subService) => (
                  <Subservices
                    key={subService.id}
                    id={`subservice-${subService.id}`}
                    onClick={() =>
                      handleSubService(
                        subService.slug,
                        subService.id,
                        category.id
                      )
                    }
                  >
                    <Imagew>
                      {subService.image && (
                        <Image
                          src={`${imagesAPI + subService.image}`}
                          alt={subService.title}
                          width={1000}
                          height={1000}
                        />
                      )}
                      <div className="overlay"></div>
                    </Imagew>
                    <p>{subService.title}</p>
                  </Subservices>
                ))}
            </SubServicesContainer>
          </Box>
        ))
      )}
    </Container>
  );
};

export default SubServices;

const Container = styled.div`
  width: 65%;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const Line = styled.div`
  background-color: #aaaaaa;
  height: 1px;
  margin: 40px 0;
`;

const Services = styled.div`
  width: 100%;

  div {
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  p {
    margin: 0 0 20px 0;
    color: #656565;
  }

  h4 {
    margin: 20px 0 10px 0;
    cursor: pointer;
    display: inline-block;
  }

  button {
    display: flex;
    align-items: center;
    float: right;
    margin-bottom: 20px;
    svg {
      font-size: 18px;
      margin-left: 10px;
    }
  }
`;

const ServiceImage = styled.div`
  height: 300px;
  position: relative;
  cursor: pointer;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &:hover .overlay {
    background-color: transparent;
  }
`;

const SubServicesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;

  @media screen and (max-width: 1024px) {
    justify-content: space-between;
  }
`;

const Subservices = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 5px #e2dfdf;
  width: calc(50% - 16.5px);
  overflow: hidden;
  cursor: pointer;

  &:hover .overlay {
    background-color: transparent;
  }

  p {
    margin: 20px 10px;
    font-weight: 500;
  }

  @media screen and (max-width: 1024px) {
    width: calc(50% - 16.5px);
    gap: ${proportions.textMargin.mobile};
  }

  @media screen and (max-width: 481px) {
    width: calc(50% - 15px);
    min-height: 150px;
    p {
      margin: 5px;
    }
  }
`;

const Imagew = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
    height: 170px;
  }

  @media screen and (max-width: 481px) {
    height: 120px;
  }
`;
