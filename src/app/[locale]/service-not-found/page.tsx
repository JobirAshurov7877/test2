"use client";
import { MyButton } from "@/ui";
import styled from "styled-components";
import PageNotFoundImg from "@/assets/page-not-found.svg";
import { proportions } from "@/styles/proportions";
import { useSnapshot } from "valtio";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const ServiceNotFound = () => {
  const navigate = useRouter();
  const translations = useTranslations();
  const currentLanguage = useLocale();

  return (
    <>
      <Container>
        <Box>
          <div>
            <h2>{translations("The page is unavailable")}</h2>
            <p>
              {translations(
                "The page is unavailable because there is no service selected, please go to the following link to select a service"
              )}
            </p>
            <div>
              <MyButton
                onClick={() => navigate.push(`/${currentLanguage}/services`)}
              >
                {translations("Services")}
              </MyButton>
            </div>
          </div>
          <Image src={PageNotFoundImg} alt="not found" />
        </Box>
      </Container>
    </>
  );
};

export default ServiceNotFound;

const Container = styled.main`
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: ${proportions.bodyMaxWidth};
  padding: ${proportions.screenPadding.desktop};
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
    flex-direction: column;
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.desktop};
  }

  img {
    width: 50%;
    height: 50%;
    @media screen and (max-width: 768px) {
      margin-top: 50px;
      width: 80%;
      height: 80%;
    }
  }
`;
