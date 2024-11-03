import styled from "styled-components";
import backgroundImg from "@/assets/press/app_download.png";
import { proportions } from "@/styles/proportions";
import AppStore from "@/assets/app_store.svg";
import GoogleStore from "@/assets/google_play.svg";
import PressVarpet from "@/assets/press-varpet.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AppDownload = () => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Imagew>
          <Image src={PressVarpet} alt="varpet" />
        </Imagew>
        <Desc>
          <h3>{t("Download the app")}</h3>
          <p>
            {t(
              "Varpet is a solution for many of your ordinary problems. Users of this platform can easily find specialists to solve any specific issue."
            )}
          </p>
          <p>
            {t(
              "To use the services, you need to DOWNLOAD the Varpet app, which is available on Google Play and App Store. Prices for all services in Varpet are fixed"
            )}
          </p>
          <div>
            <a
              href="https://apps.apple.com/am/app/varpet/id1414315442"
              target="blank"
            >
              <Image src={AppStore} alt="app store" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.varpet.app&pli=1"
              target="blank"
            >
              <Image src={GoogleStore} alt="google play" />
            </a>
          </div>
        </Desc>
      </Box>
    </Container>
  );
};

export default AppDownload;

const Container = styled.section`
  background-color: #f9f9fa;
  background-image: url(${backgroundImg.src});
  background-position: center;
  background-size: cover;
`;
const Box = styled.div`
  margin: ${proportions.sectionMargin.desktop} auto;
  padding: ${proportions.screenPadding.desktop};
  max-width: ${proportions.bodyMaxWidth};
  display: flex;
  align-items: center;
  gap: ${proportions.sectionMargin.desktop};
  position: relative;

  @media screen and (max-width: 768px) {
    margin: ${proportions.sectionMargin.tablet} auto;
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    margin: ${proportions.sectionMargin.mobile} auto;
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Imagew = styled.div`
  width: 80%;
  height: 400px;
  transform: translateY(50px);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Desc = styled.div`
  p {
    margin: ${proportions.textMargin.desktop} 0;
  }
  div {
    display: flex;
    gap: ${proportions.textMargin.desktop};
  }
`;
