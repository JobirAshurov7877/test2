"use client";
import Image from "next/image";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import Phone from "@/assets/home/phone.png";
import IOS from "@/assets/home/app-store.svg";
import ANDROID from "@/assets/home/google-store.svg";
import Support from "@/assets/home/support.svg";
import Happy from "@/assets/home/happy.svg";
import Booking from "@/assets/home/booking.svg";
import { useTranslations } from "next-intl";
import { MyColors } from "@/styles/color";

export default function DownloadOurApp() {
  const t = useTranslations();
  return (
    <Container>
      <Box>
        <DownloadSection>
          <Imagew>
            <Image src={Phone} alt="phone frame" />
          </Imagew>
          <Info>
            <h6>{t("Download our app")}</h6>
            <h3>
              {t("Get")}
              <span> Varpet </span>
              {t("app and order services more easily")}
            </h3>
            <p>
              {t(
                "To use the services, register the desired order with just a few taps from your smartphone, familiarize yourself with the pre-approved prices in the application, consult with the master and make a decision. Get started today."
              )}
            </p>
            <Buttons>
              <a
                href="https://apps.apple.com/am/app/varpet/id1414315442"
                target="blank"
              >
                <Image src={IOS} alt="play store" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.varpet.app&pli=1"
                target="blank"
              >
                <Image src={ANDROID} alt="google play" />
              </a>
            </Buttons>
          </Info>
        </DownloadSection>
        <OutcomeSection>
          <div>
            <Image src={Booking} alt="booking" />
            <div>
              <h6>
                {t("Instant online")}
                <span> {t("booking")}</span>
              </h6>
            </div>
          </div>
          <div>
            <Image src={Support} alt="support" />
            <div>
              <h6>
                {t("Register an order, get")}
                <span> 24/7 </span>
                {t("support")}
              </h6>
            </div>
          </div>
          <div>
            <Image src={Happy} alt="smile" />
            <div>
              <h6>
                {t("Trusted")}
                <br />
                <span> {t("professionals")}</span>
              </h6>
            </div>
          </div>
        </OutcomeSection>
      </Box>
    </Container>
  );
}
const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`;

const Box = styled.div`
  margin: ${proportions.sectionMargin.desktop} auto;
  max-width: ${proportions.bodyMaxWidthMax};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${proportions.divMargin.desktop};
  padding: ${proportions.divMargin.desktop};

  @media screen and (max-width: 1126px) {
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
    padding: ${proportions.divMargin.tablet};
    margin: ${proportions.sectionMargin.tablet} auto;
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
    padding: ${proportions.divMargin.mobile};
    margin: ${proportions.sectionMargin.mobile} auto;
  }
`;

const DownloadSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }
`;

const Imagew = styled.div`
  @media screen and (max-width: 768px) {
    img {
      width: 150px;
      height: 300px;
    }
  }

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.divMargin.tablet};
  width: 50%;

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
    width: 100%;
  }

  h6,
  span {
    color: ${MyColors.primary};
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
  }

  @media screen and (max-width: 640px) {
    justify-content: space-between;
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.textMargin.mobile};
    img {
      width: 150px;
    }
  }
`;

const OutcomeSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: ${proportions.divMargin.tablet};

  @media screen and (max-width: 1126px) {
    /* flex-direction: row; */
    width: 100%;
  }

  @media screen and (max-width: 914px) {
    flex-direction: column;
  }

  span {
    color: ${MyColors.primary};
  }

  > div {
    display: flex;
    align-items: center;
    gap: ${proportions.textMargin.desktop};
    box-shadow: 0 0 5px #e2dfdf;
    padding: ${proportions.textMargin.desktop};
    &:nth-child(2) {
      margin: 0 auto;
    }

    @media screen and (max-width: 1430px) {
      align-items: center;
    }

    @media screen and (max-width: 1126px) {
      width: 50%;
    }

    @media screen and (max-width: 535px) {
      width: 100%;
    }
  }
`;
