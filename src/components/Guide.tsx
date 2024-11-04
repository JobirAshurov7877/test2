"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useRef, useState } from "react";
import { MyColors } from "@/styles/color";
import { useTranslations } from "next-intl";

interface GuideProps {
  id: number;
  title: string;
  desc: string;
}

const SubServiceGuide = () => {
  const translations = useTranslations();
  const splideRef = useRef<Splide | null>(null);
  const [activePage, setActivePage] = useState<number>(1);

  const guides: GuideProps[] = [
    {
      id: 1,
      title: translations("Choose the service you want to get"),
      desc: translations(
        "Select the specific service you need from the options. This will help us tailor our offerings to best meet your requirements and ensure you receive the most relevant assistance"
      ),
    },
    {
      id: 2,
      title: translations("Share photos, videos and add a message"),
      desc: translations(
        "Upload photos and videos, and include a personalized message to describe the issue better. This will help us understand your concern more clearly through both visual and written content"
      ),
    },
    {
      id: 3,
      title: translations("Pick date and location for service"),
      desc: translations(
        "Select the preferred date and location for your service. This ensures that we can accommodate your schedule and provide service at the most convenient place for you"
      ),
    },
    {
      id: 4,
      title: translations("Finish booking by paying for the service"),
      desc: translations(
        "Complete your booking by making a payment for the service. This final step secures your appointment and ensures that everything is set for your chosen date and location"
      ),
    },
  ];

  const handleSplideItemClick = (index: number) => {
    setActivePage(index + 1);
    splideRef.current?.go(index);
  };

  return (
    <Container>
      <Box>
        <Desc>
          <h3>{translations("How It Works")}</h3>
          <p>
            {translations(
              "Using our app is simple and straightforward. Here are the steps you need to follow to get started and make the most out of its features:"
            )}
          </p>
          <Nav>
            {guides.map((guide, index) => (
              <Page
                key={guide.id}
                $isActive={activePage === index + 1}
                $isSelected={activePage === index + 1}
                onClick={() => {
                  setActivePage(index + 1);
                  splideRef.current?.go(index);
                }}
              />
            ))}
          </Nav>
        </Desc>
        <Carousel>
          <SplideContainer
            options={{
              type: "slide",
              gap: proportions.divMargin.desktop,
              perPage: 3,
              arrows: false,
              pagination: false,
              breakpoints: {
                1473: { perPage: 2 },
                1150: { perPage: 1 },
                853: { perPage: 2 },
                800: { gap: proportions.divMargin.tablet },
                600: { perPage: 1 },
              },
            }}
            ref={splideRef}
          >
            {guides &&
              guides.map((guide, index) => (
                <SplideItem
                  key={guide.id}
                  $isActive={activePage === index + 1}
                  onClick={() => handleSplideItemClick(index)}
                >
                  <Step>{guide.id}</Step>
                  <Guide className="overlay">
                    <h6>{guide.title}</h6>
                    <p>{guide.desc}</p>
                  </Guide>
                </SplideItem>
              ))}
          </SplideContainer>
        </Carousel>
      </Box>
    </Container>
  );
};

export default SubServiceGuide;

const Container = styled.section`
  width: 100%;
  margin: ${proportions.sectionMargin.desktop} 0;
  text-align: center;
`;

const Box = styled.div`
  margin: ${proportions.sectionMargin.desktop} auto;
  max-width: ${proportions.bodyMaxWidthMax};
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: ${proportions.divMargin.desktop};
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 853px) {
    flex-direction: column;
    align-items: center;
    padding: ${proportions.divMargin.desktop};
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
    padding: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
    padding: ${proportions.divMargin.mobile};
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};
  width: 25%;

  @media screen and (max-width: 1473px) {
    width: 40%;
  }

  @media screen and (max-width: 853px) {
    width: 100%;
  }
  button {
    display: flex;
    align-items: start;
    gap: ${proportions.textMargin.mobile};

    svg {
      transform: translateY(1px);
      font-size: 20px;
    }
  }
`;

const Carousel = styled.div`
  position: relative;
  width: 75%;
  overflow: hidden;
  padding: 50px 5px;
  cursor: grab;

  @media screen and (max-width: 1473px) {
    width: 60%;
  }

  @media screen and (max-width: 1150px) {
    width: 55%;
  }

  @media screen and (max-width: 853px) {
    width: 100%;
  }

  .splide {
    visibility: visible;
  }
`;

const SplideContainer = styled(Splide)`
  .splide__track {
    overflow: visible;
  }
`;

const SplideItem = styled(SplideSlide)<{ $isActive: boolean }>`
  border-radius: 8px;
  padding: 0 12px 12px;
  box-shadow: 0 0 15px #0000000f;
  position: relative;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.$isActive ? MyColors.primary : "white"};
  color: ${(props) => (props.$isActive ? "white" : "#0279dc")};

  &:hover {
    background-color: ${MyColors.primary};
    color: white;
  }
`;

const Nav = styled.div`
  display: flex;
  color: #0279dc;
  gap: ${proportions.textMargin.tablet};

  div {
    height: 6px;
    border-radius: 6px;
  }
`;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Page = styled.div<{ $isActive: boolean; $isSelected: boolean }>`
  transition: 0.1s;
  background-color: ${(props) =>
    props.$isActive || props.$isSelected
      ? MyColors.primary
      : MyColors.secondary};
  color: ${(props) =>
    props.$isActive || props.$isSelected ? "white" : "#0279dc"};
  width: ${(props) => (props.$isActive ? "62px" : "31px")};
  cursor: pointer;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid white;
  margin: -10px;
  transform: translateY(-30%);
  box-shadow: 0 0 5px #0000000f;
  background-color: ${MyColors.primary};
  color: white;
`;
