"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import {
  GuaranteeOne,
  GuaranteeTwo,
  GuaranteeThree,
  TimeSaving,
  Trained,
  Customized,
  Spotless,
} from "@/assets/home/GuaranteeIndex";
import { MyColors } from "@/styles/color";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface GuaranteeItem {
  id: number;
  image: string;
  title: string;
  description: string;
}
export default function WeGuarantee() {
  const t = useTranslations();
  const guaranteeItems: GuaranteeItem[] = [
    {
      id: 1,
      image: TimeSaving,
      title: t("Time Saving"),
      description: t(
        "By choosing any of our services, you will save your valuable time. Our efficient processes and experienced team ensure that you get the results you need without any delays, allowing you to focus on what really matters."
      ),
    },
    {
      id: 2,
      image: Trained,
      title: t("Trained Professionals"),
      description: t(
        "Our team consists of highly qualified and experienced professionals who are masters in their respective fields. Armed with years of experience and knowledge, our specialists are able to effectively solve any problem that the client receives."
      ),
    },
    {
      id: 3,
      image: Customized,
      title: t("Customized Solutions"),
      description: t(
        "We understand that every customer has unique needs and preferences. That's why we offer customized solutions specifically for your needs. We are sure that your consultation with the master will get the desired result."
      ),
    },
    {
      id: 4,
      image: Spotless,
      title: t("Spotless Results"),
      description: t(
        "Our commitment to excellence means we guarantee a flawless result. From start to finish, we pay meticulous attention to every detail. Our goal is to show the client a result that exceeds his expectations."
      ),
    },
  ];

  const [expandedItems, setExpandedItems] = useState<number | null>(2);

  const toggleItem = (itemId: number) => {
    if (expandedItems === itemId) {
      setExpandedItems(null);
    } else {
      setExpandedItems(itemId);
    }
  };
  return (
    <Container>
      <Box>
        <Title>
          <h3>{t("We guarantee")}...</h3>
        </Title>
        <div>
          <Info>
            {guaranteeItems.map((item) => (
              <Item key={item.id} onClick={() => toggleItem(item.id)}>
                <div>
                  <div>
                    <Image src={item.image} alt="" />
                    <h6>{item.title}</h6>
                  </div>
                  <div>
                    {expandedItems === item.id ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </div>
                </div>
                <Collapse $isOpen={expandedItems === item.id}>
                  <p>{item.description}</p>
                </Collapse>
              </Item>
            ))}
          </Info>
          <GuaranteeImages>
            <GuaranteeImage style={{ transform: "translateY(50px)" }}>
              <Image src={GuaranteeOne} alt="guarantee-image" />
            </GuaranteeImage>
            <div>
              <GuaranteeImage>
                <Image src={GuaranteeTwo} alt="guarantee-image" />
              </GuaranteeImage>
              <GuaranteeImage>
                <Image src={GuaranteeThree} alt="guarantee-image" />
              </GuaranteeImage>
            </div>
          </GuaranteeImages>
        </div>
      </Box>
    </Container>
  );
}
const Container = styled.section`
  width: 100%;
  padding: ${proportions.divMargin.desktop} 0;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

const Box = styled.div`
  background-color: white;
  margin: 0 auto;
  max-width: ${proportions.bodyMaxWidthMax};
  padding: ${proportions.sectionMargin.desktop};

  border-radius: 150px 150px 0 0;

  > div {
    display: flex;
    align-items: start;
    gap: ${proportions.divMargin.tablet};

    @media screen and (max-width: 912px) {
      flex-direction: column;
    }

    @media screen and (max-width: 768px) {
      gap: ${proportions.divMargin.mobile};
    }

    @media screen and (max-width: 481px) {
      gap: ${proportions.divMargin.mobile};
    }
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: 70px ${proportions.screenPadding.mobile};
  }

  @media screen and (max-width: 1300px) {
    margin: ${proportions.divMargin.desktop} auto;
  }

  @media screen and (max-width: 1024px) {
    padding: ${proportions.sectionMargin.tablet};
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
    padding: 70px ${proportions.screenPadding.tablet};
    border-radius: 120px 120px 0 0;
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: 70px ${proportions.screenPadding.mobile};
    border-radius: 60px 60px 0 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};
  width: 50%;

  @media screen and (max-width: 912px) {
    width: 100%;
  }
`;

const Title = styled.div`
  margin-bottom: ${proportions.textMargin.tablet};
`;

const Item = styled.div`
  box-shadow: 0 0 15px #0000000f;
  border-radius: 22px;
  padding: 25px ${proportions.textMargin.tablet};
  cursor: pointer;

  @media screen and (max-width: 1200px) {
    padding: 15px ${proportions.textMargin.tablet};
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${proportions.textMargin.tablet};
  }

  svg {
    font-size: 20px;
  }

  div {
    display: flex;
    align-items: center;
    gap: ${proportions.textMargin.tablet};
  }

  h6 {
    color: ${MyColors.primary};
  }
`;

const GuaranteeImage = styled.div`
  img {
    width: 100%;
    height: 100%; 
    object-fit: contain;
  }
`;

const GuaranteeImages = styled.div`
  display: flex;
  width: 50%;
  img {
    transition: 0.3s;
    &:hover {
      filter: drop-shadow(5px 5px 5px #e89528);
    }
  }

  @media screen and (max-width: 912px) {
    width: 100%;
  }
`;

const Collapse = styled.div<{ $isOpen: boolean }>`
  overflow: hidden;
  transition: 0.3s ease;
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  padding: ${({ $isOpen }) => ($isOpen ? "10px" : "0 10px")};
`;
