"use client";
import React from "react";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { SubService } from "@/interfaces/subservice.interface";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { imagesAPI } from "../../../env";
import Image from "next/image";

interface SubServicesHeaderProps {
  subService: SubService;
}

const SubServicesHeader: React.FC<SubServicesHeaderProps> = ({
  subService,
}) => {
  const navigate = useRouter();
  const selectedServices = [
    {
      id: subService.id,
      rateValue: subService.rateValue,
      title: subService.title,
      rateType: subService.rateType,
      minOrderTime: subService.minOrderTime,
    },
  ];
  const currentLanguage = useLocale();
  const translations = useTranslations();
  const selectedIds = selectedServices.map((service) => service.id);

  const handleBook = () => {
    const selectedIdsBase64 = btoa(JSON.stringify(selectedIds));

    if (subService?.service === false) {
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/${subService.id}/${subService.slug}/`
      );
    } else {
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/pricing/${selectedIdsBase64}`
      );
    }
  };

  return (
    <Container>
      <Box>
        <Image
          src={imagesAPI + subService?.image}
          alt={subService.title}
          width={500}
          height={500}
        />
        <Desc>
          <h1>{subService?.title}</h1>
          <p>{subService?.description}</p>
          <MyButton onClick={handleBook}>
            <span>{translations("Book now")}</span>
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
  width: 100vw;
  overflow: hidden;
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
    min-width: 200px;
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
  right: 00%;
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
