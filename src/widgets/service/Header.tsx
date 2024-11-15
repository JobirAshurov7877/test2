import React from "react";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Category } from "@/interfaces/category.interface";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { imagesAPI } from "../../../env";
import Image from "next/image";

interface CategoryProps {
  service: Category;
}

const SubServicesHeader: React.FC<CategoryProps> = ({ service }) => {
  const navigate = useRouter();
  const currentLanguage = useLocale();
  const t = useTranslations();

  const handleBook = () => {
    navigate.push(
      `/${currentLanguage}/services/booking-process/service/${service.id}/${service.slug}`
    );
  };

  return (
    <Container>
      <Box>
        <Image
          src={imagesAPI + service.image}
          alt="service"
          width={500}
          height={500}
        />
        <Desc>
          <h1>{service.title}</h1>
          <p>
            {service.description === "."
              ? t("sub_service_about_desc")
              : service.description}
          </p>
          <MyButton onClick={handleBook}>
            <span>{t("Book now")}</span>
            <HiOutlineArrowUpRight />
          </MyButton>
          <CircleBlue />
          <CircleOrange />
        </Desc>
      </Box>
    </Container>
  );
};

export default SubServicesHeader;

const Container = styled.section`
  width: 100%;
  max-width: ${proportions.maxScreenWidth};
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    background-color: transparent;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${proportions.divMargin.desktop};

  img {
    width: 50%;
    object-fit: cover;

    @media screen and (max-width: 1024px) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
    }
  }

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

const Desc = styled.div`
  position: relative;
  width: 30%;

  p {
    margin-top: ${proportions.textMargin.desktop};

    @media screen and (max-width: 768px) {
      width: 100%;
      margin: ${proportions.textMargin.tablet} 0;
    }
  }

  button {
    margin-top: ${proportions.divMargin.desktop};
    font-size: 18px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${proportions.textMargin.tablet};
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

const CircleBlue = styled.div`
  position: absolute;
  top: -50%;
  right: 70%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1828px) {
    top: -20%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const CircleOrange = styled.div`
  position: absolute;
  top: -20%;
  right: 0%;
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
