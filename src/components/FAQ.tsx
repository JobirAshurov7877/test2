"use client";
import { useState } from "react";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import StarsImg from "@/assets/stars.png";
import StarImg from "@/assets/star.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FAQ = () => {
  const t = useTranslations();

  const faqs = [
    {
      question: t("How to register as a master?"),
      answer: t("How_to_register_as_a_master"),
    },
    {
      question: t("What to do if we don't find our preferred service?"),
      answer: t("preferred_service"),
    },
    {
      question: t("Why do masters sometimes charge more than app prices?"),
      answer: t("more_than_app_prices"),
    },
    {
      question: t("How to find out about vacancies?"),
      answer: t("about_vacancies_desc"),
    },
    {
      question: t("After how many days does master registration take place?"),
      answer: t("registration_take_place"),
    },
    {
      question: t("Can we register an order if we are not in the country?"),
      answer: t("not_in_the_country_desc"),
    },
    {
      question: t("It is possible to register more than one order?"),
      answer: t("more_than_one_order_desc"),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Container>
      <Title>{t("Frequently Asked Questions")}</Title>
      <Box>
        <ul>
          {faqs.map((faq, index) => (
            <StyledLi
              key={index}
              $isOpen={openIndex === index} // Use $isOpen for transient prop
              onClick={() => toggleAccordion(index)}
            >
              <div>
                <h6>{faq.question}</h6>
                {openIndex === index ? (
                  <IoArrowUpCircleOutline />
                ) : (
                  <IoArrowDownCircleOutline />
                )}
              </div>
              <Answer $isOpenList={openIndex === index}>{faq.answer}</Answer>
            </StyledLi>
          ))}
        </ul>
        <Stars>
          <a href="https://www.trustpilot.com/review/varpet.com" target="blank">
            <p>{t("Excellent")}</p>
            <Image className="stars" src={StarsImg} alt="star" />
            <Image className="star" src={StarImg} alt="star" />
            <p>{t("Trustpilot")}</p>
          </a>
        </Stars>
      </Box>
    </Container>
  );
};

export default FAQ;

const Container = styled.section`
  margin: ${proportions.sectionMargin.desktop};

  @media screen and (max-width: 768px) {
    margin: ${proportions.sectionMargin.tablet} 0;
  }

  @media screen and (max-width: 481px) {
    margin: ${proportions.sectionMargin.mobile} 0;
  }
`;

const Box = styled.div`
  max-width: ${proportions.bodyMaxWidth};
  padding: 0 ${proportions.screenPadding.desktop};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    margin-bottom: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    margin-bottom: ${proportions.divMargin.mobile};
  }
`;

const StyledLi = styled.li<{ $isOpen: boolean }>`
  border: 1px solid #e0e0ea;
  border-radius: 10px;
  padding: ${proportions.textMargin.desktop};
  margin: ${proportions.textMargin.desktop} 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  background-color: ${({ $isOpen }) => ($isOpen ? "#e6f2fb" : "transparent")};
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ $isOpen }) => ($isOpen ? "#eef5fb" : "#f0f0f0")};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(5px);
  }

  h6 {
    margin: 0;
    flex: 1;
  }

  svg {
    margin-left: 10px;
    flex-shrink: 0;
    font-size: 22px;
  }

  @media screen and (max-width: 768px) {
    margin: ${proportions.textMargin.tablet} 0;
  }

  @media screen and (max-width: 481px) {
    margin: ${proportions.textMargin.mobile} 0;
  }
`;

const Answer = styled.p<{ $isOpenList: boolean }>`
  transition: 0.3s;
  max-height: ${({ $isOpenList }) => ($isOpenList ? "250px" : "0")};
  overflow: hidden;
  transition: 0.3s linear;
  opacity: ${({ $isOpenList }) => ($isOpenList ? "1" : "0")};
`;

const Stars = styled.div`
  margin: ${proportions.sectionMargin.desktop};
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${proportions.textMargin.desktop};

    .star {
      img {
        width: "40px";
        height: "40px";
      }
    }

    .stars {
      width: 250px;
      height: 50px;
    }

    @media screen and (max-width: 768px) {
      margin: ${proportions.sectionMargin.tablet};
      gap: ${proportions.textMargin.tablet};
    }

    @media screen and (max-width: 481px) {
      margin: ${proportions.sectionMargin.mobile};
      gap: ${proportions.textMargin.mobile};
      .star {
        width: 30px;
        height: 30px;
      }
      .stars {
        width: 150px;
        height: 30px;
      }
    }
  }
`;
