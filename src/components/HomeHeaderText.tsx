"use client";
import { MyColors } from "@/styles/color";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function HomeHeaderText() {
  const t = useTranslations();
  const newIndex = Math.floor(Math.random() * 3);
  const [randomIndex, setRandomIndex] = useState<number>(newIndex);
  // Update randomIndex when language changes
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
          <Paragraph>
            {t("If_you_are_facing")}
          </Paragraph>
        </div>
      )}
      {randomIndex === 1 && (
        <div>
          <Title>
            <span>{t("Electricity")} </span>
            {t("is safe with us")}
          </Title>
          <Paragraph>
            {t(
              "Are flickering lights, faulty outlets, or electrical problems causing headaches in your home or workplace? Wait no more, Varpet App is here to provide superior electrical services that secure your property from any fluctuations."
            )}
          </Paragraph>
        </div>
      )}
      {randomIndex === 2 && (
        <div>
          <Title>
            <span>{t("Having")} </span>
            {t("a sparkling clean home is not difficult")}
          </Title>
          <Paragraph>
            {t(
              "Tired of spending your weekends mopping floors and tidying shelves? Our caring cleaners are ready to go the extra mile to neatly and carefully clean living spaces or offices, leaving no corner untouched."
            )}
          </Paragraph>
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
