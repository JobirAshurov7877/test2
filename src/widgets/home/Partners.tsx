"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import {
  PartnersOne,
  PartnersTwo,
  PartnersThree,
  PartnersFour,
  PartnersFive,
  PartnersSix,
  PartnersSeven,
  PartnersEight,
} from "@/assets";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SubServiceAbout = () => {
  const t = useTranslations();

  return (
    <Container>
      <h3>{t("Trusted by")}</h3>
      <Box>
        <PartnersWrapper>
          <Partners>
            <Item>
              <Image src={PartnersOne} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersTwo} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersThree} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersFour} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersFive} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersSix} alt="our partners" />
            </Item>
            <Item>
              <Image src={PartnersSeven} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersEight} alt="Our partners" />
            </Item>
          </Partners>
          {/* Second set of partner logos */}
          <Partners>
            <Item>
              <Image src={PartnersOne} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersTwo} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersThree} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersFour} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersFive} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersSix} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersSeven} alt="Our partners" />
            </Item>
            <Item>
              <Image src={PartnersEight} alt="Our partners" />
            </Item>
          </Partners>
        </PartnersWrapper>
      </Box>
    </Container>
  );
};

export default SubServiceAbout;

const Container = styled.section`
  width: 100%;
  background-color: #f9f9fa;
  padding: ${proportions.divMargin.mobile} 0;
  h3 {
    margin: 0 0 ${proportions.divMargin.desktop} 0;
    text-align: center;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const PartnersWrapper = styled.div`
  display: flex;
  width: 200%;
  animation: scroll 20s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    width: 400%;
    animation: scroll 15s linear infinite;
  }
`;

const Partners = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 50%;
  padding-bottom: ${proportions.divMargin.desktop};
`;

const Item = styled.div`
  width: 320px;
  display: flex;
  justify-content: center;
`;
