import { imagesAPI } from "@/env";
import { Category } from "@/interfaces/category.interface";
import { SubService } from "@/interfaces/subservice.interface";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import { languageStore } from "@/valtio-store/languageStore";
import React from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSnapshot } from "valtio";

interface CategoryProps {
  service: Category;
}

const SubServices: React.FC<CategoryProps> = ({ service }) => {
  const navigate = useNavigate();
  const { translations, currentLanguage } = useSnapshot(languageStore);

  const handleBook = (subService: SubService) => {
    const selectedServices = [
      {
        id: subService.id,
        rateValue: subService.rateValue,
        title: subService.title,
        rateType: subService.rateType,
        minOrderTime: subService.minOrderTime,
      },
    ];
    const selectedIds = selectedServices.map((service) => service.id);
    const selectedIdsBase64 = btoa(JSON.stringify(selectedIds));

    if (subService.service === false) {
      navigate(
        `/${currentLanguage}/services/booking-process/subservice/${subService.id}/${subService.slug}/`
      );
    } else {
      navigate(
        `/${currentLanguage}/services/booking-process/subservice/pricing/${selectedIdsBase64}`
      );
    }
  };

  return (
    <Container>
      <Box>
        {service.subServices &&
          service.subServices.map((subService) => (
            <SubServiceContainer key={subService.id}>
              <Image onClick={() => handleBook(subService)}>
                <img src={imagesAPI + subService.image} alt="" />
                <div className="overlay"></div>
              </Image>
              <Desc>
                <h4 onClick={() => handleBook(subService)}>
                  {subService.title}
                </h4>
                <p>{subService.description}</p>
                <MyButton
                  $variant="secondary"
                  onClick={() => handleBook(subService)}
                >
                  <span>{translations["Book now"]}</span>
                  <HiOutlineArrowUpRight />
                </MyButton>
              </Desc>
            </SubServiceContainer>
          ))}
      </Box>
    </Container>
  );
};

export default SubServices;

const Container = styled.section`
  margin: 0 auto 0 auto;
  max-width: ${proportions.bodyMaxWidth};

  @media screen and (max-width: 768px) {
    margin: ${proportions.sectionMargin.tablet} auto 0 auto;
  }

  @media screen and (max-width: 481px) {
    margin: ${proportions.sectionMargin.mobile} auto 0 auto;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.divMargin.desktop};
  padding: ${proportions.sectionMargin.desktop} 0 0;

  @media screen and (max-width: 1024px) {
    padding: ${proportions.sectionMargin.tablet} 0 0;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.sectionMargin.mobile} 0 0;
  }
`;

const SubServiceContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  box-shadow: 0 0 5px #e2dfdf;
  background-color: white;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  position: relative;
  width: 35%;
  height: 240px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 300px;
  }

  @media screen and (max-width: 768px) {
    height: 250px;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &:hover .overlay {
    background-color: transparent;
  }
`;

const Desc = styled.div`
  padding: 0 ${proportions.textMargin.desktop};

  h4 {
    cursor: pointer;
  }

  p {
    font-weight: 300;
    margin: ${proportions.textMargin.tablet} 0;
  }

  button {
    margin-top: ${proportions.divMargin.desktop};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${proportions.textMargin.tablet};

    @media screen and (max-width: 768px) {
      margin-top: ${proportions.divMargin.tablet};
    }

    @media screen and (max-width: 481px) {
      margin-top: ${proportions.divMargin.mobile};
    }
  }

  @media screen and (max-width: 1024px) {
    padding: ${proportions.divMargin.tablet} ${proportions.divMargin.desktop};
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.mobile} ${proportions.divMargin.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
  }
`;
