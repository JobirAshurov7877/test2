"use client";
import { MyColors } from "@/styles/color";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function HomeHeaderText() {
  const t = useTranslations();
  const newIndex = Math.floor(Math.random() * 3);
  const [randomIndex, setRandomIndex] = useState<number>(newIndex);
  useEffect(() => {
    setRandomIndex(newIndex);
  }, []);
  return (
    <>
      {randomIndex === 0 && (
        <div>
          <Title>
            <span>{t("Professional")} </span>
            {t("plumbing services available")}
          </Title>
          <Paragraph>{t("If_you_are_facing")}</Paragraph>
        </div>
      )}
      {randomIndex === 1 && (
        <div>
          <Title>
            <span>{t("Electricity")} </span>
            {t("is safe with us")}
          </Title>
          <Paragraph>{t("hero_description_1")}</Paragraph>
        </div>
      )}
      {randomIndex === 2 && (
        <div>
          <Title>
            <span>{t("Having")} </span>
            {t("a sparkling clean home is not difficult")}
          </Title>
          <Paragraph>{t("hero_description_2")}</Paragraph>
        </div>
      )}
    </>
  );
}
const Title = styled.h1`
  margin-bottom: 10px;
  span {
    color: ${MyColors.primary};
  }
`;
const Paragraph = styled.p`
  margin: 0 auto;
  width: 60%;

  @media screen and (max-width: 1024px) {
    width: 80%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
