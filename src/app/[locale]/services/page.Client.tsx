"use client";
import styled, { keyframes } from "styled-components";
import { FaArrowUp } from "react-icons/fa6";
import { proportions } from "@/styles/proportions";
import ServicesHeader from "@/widgets/services/ServicesHeader";
import Categories from "@/widgets/services/Categories";
import SubServices from "@/widgets/services/SubServices";
import { useEffect, useState } from "react";

export default function ServicesClient() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
      <ServicesHeader />
      <Box>
        <Categories />
        <SubServices />
      </Box>
      <ButtonContainer
        style={isVisible ? { display: "block" } : { display: "none" }}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: ${proportions.bodyMaxWidth};
  padding: ${proportions.screenPadding.desktop};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    transform: translateY(0);
  }
  50% {
    transform: scale(1.05);
    transform: translateY(-10%);
  }
  100% {
    transform: scale(1);
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  width: 50px;
  height: 70px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  svg {
    font-size: 30px;
  }
  &:hover {
    opacity: 0.8;
  }

  animation: ${pulse} 1.5s ease-in-out infinite;

  @media screen and (max-width: 768px) {
    display: none !important;
  }
`;
