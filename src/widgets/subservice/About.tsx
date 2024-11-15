import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import AboutOne from "@/assets/home/about-one.png";
import AboutTwo from "@/assets/home/about-two.png";
import AboutThree from "@/assets/home/about-three.png";
import AboutFor from "@/assets/home/about-for.png";
import AboutFive from "@/assets/home/about-five.png";
import Image from "next/image";
import { useTranslations } from "next-intl";
interface MySevice {
  service: string;
}

const SubServiceAbout: React.FC<MySevice> = ({ service }) => {
  const translations = useTranslations();
  return (
    <Container>
      <Box>
        <Title>
          <h3>{translations("About the service")}</h3>
          <p>{service ? service : translations("sub_service_about_desc")}</p>
        </Title>
        <AboutImages>
          <Imagewrap>
            <Image src={AboutOne} alt="about us images" />
          </Imagewrap>
          <Imagewrap>
            <Image src={AboutTwo} alt="about us images" />
          </Imagewrap>
          <Imagewrap>
            <Image src={AboutThree} alt="about us images" />
          </Imagewrap>
          <Imagewrap>
            <Image src={AboutFor} alt="about us images" />
          </Imagewrap>
          <Imagewrap>
            <Image src={AboutFive} alt="about us images" />
          </Imagewrap>
        </AboutImages>
      </Box>
    </Container>
  );
};

export default SubServiceAbout;

const Container = styled.section`
  width: 100vw;
  overflow: hidden;
  background-color: white;
  max-width: ${proportions.maxScreenWidth};
  margin: 0 auto;
`;
const Box = styled.div`
  margin: 0 auto;
  max-width: ${proportions.bodyMaxWidthMax};
  gap: ${proportions.divMargin.tablet};
  padding: ${proportions.divMargin.desktop};

  @media screen and (max-width: 1300px) {
    margin: ${proportions.divMargin.desktop} auto;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  width: 50%;
  gap: ${proportions.divMargin.tablet};

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Imagewrap = styled.div`
  height: 400px;
  width: 19%;
  border-radius: 16px;
  overflow: hidden;

  img {
    object-fit: cover;
  }

  @media screen and (max-width: 1273px) {
    height: 300px;
    width: 25%;
  }

  @media screen and (max-width: 850px) {
    height: 250px;
    width: calc(50% - 16.5px);
  }

  @media screen and (max-width: 572px) {
    height: 180px;
  }

  @media screen and (max-width: 450px) {
    height: 160px;
  }
`;

const AboutImages = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-top: ${proportions.divMargin.tablet};
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    transition: 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: 1273px) {
    flex-wrap: wrap;
    justify-content: center;
  }

  @media screen and (max-width: 1132px) {
    ${Imagewrap}:nth-child(1) {
    }
    ${Imagewrap}:nth-child(5) {
    }
  }

  @media screen and (max-width: 768px) {
    ${Imagewrap}:nth-child(2) {
    }
  }

  @media screen and (max-width: 481px) {
    ${Imagewrap}:nth-child(3) {
    }
  }

  @media screen and (max-width: 850px) {
    ${Imagewrap}:nth-child(5) {
      width: 100%;
    }
  }
`;
