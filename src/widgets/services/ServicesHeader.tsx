"use client";
import styled from "styled-components";
import { MyInput } from "@/ui";
import { useEffect, useMemo, useRef, useState } from "react";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { proportions } from "@/styles/proportions";
import SprinkleImage from "@/assets/services/sprinkle.svg";
import HappyClientsImage from "@/assets/services/happyClients.svg";
import ReviewImage from "@/assets/services/review.svg";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchCategories } from "@/store/categoriesSlice";

const ServicesHeader = () => {
  const t = useTranslations();
  const currentLanguage = useLocale();
  const dispatch = useDispatch();
  const filteredRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFiltered, setShowFiltered] = useState<boolean>(false);
  const [randomSubServices, setRandomSubServices] = useState<
    { title: string; id: number }[]
  >([]);
  const { categories } = useSelector((state: RootState) => state.categories);

  // to take sub services from service's array
  const subServices = useMemo(() => {
    return categories.flatMap((category) => category.subServices);
  }, [categories]);

  // to take titles from service's array
  const filteredServices = useMemo(() => {
    return subServices
      .filter(
        (service) =>
          service &&
          service.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [subServices, searchQuery]);

  // to generate random sub services to initially show it clicking to search input
  const generateRandomSubServices = () => {
    const randomIndexes: number[] = [];
    const randomTitles = [];
    const titles = subServices
      .filter((service) => service && service.title) // Filter out undefined or null service objects and titles
      .map((service) => ({ title: service!.title, id: service!.id })); // Assert that service exists and access the title property
    while (randomIndexes.length < 5 && titles.length > 0) {
      const randomIndex = Math.floor(Math.random() * titles.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
        randomTitles.push(titles[randomIndex]);
      }
    }
    setRandomSubServices(randomTitles);
  };

  useEffect(() => {
    generateRandomSubServices(); // Initial generation of random sub-services
  }, []);

  // to show generated random sub services by clicking on the search input
  const handleInputClick = () => {
    generateRandomSubServices(); // Generate new random sub-services
    setShowFiltered(true); // Show the filtered component
  };

  // set input field empty and close filtered div
  const handleClickToFilteredItem = (scrollTo: string) => {
    setShowFiltered(false);
    setSearchQuery("");
    const element = document.querySelector(scrollTo);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Handle changes in the search input
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setShowFiltered(event.target.value !== "");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        filteredRef.current &&
        !filteredRef.current.contains(target) &&
        !(target instanceof HTMLInputElement && target.type === "text")
      ) {
        setShowFiltered(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
      fetchCategories(currentLanguage)
    );
  }, [dispatch]);

  return (
    <Container>
      <Box>
        <SearchComponent>
          <SearchTitles>
            {t("CHOOSE A")} <span>{t("SERVICE")} </span>
            {t("TO GET STARTED")}
          </SearchTitles>
          <Search>
            <MyInput
              type="text"
              placeholder={t("Search for a service")}
              value={searchQuery}
              onChange={handleSearchInputChange}
              onClick={handleInputClick}
            />
            {showFiltered && (
              <FilteredComponent ref={filteredRef}>
                {searchQuery === "" && randomSubServices.length > 0 ? (
                  <Ul style={{ color: "#999999" }}>
                    {randomSubServices.map((service, index) => (
                      <li key={index}>
                        <a
                          onClick={() =>
                            handleClickToFilteredItem(
                              `#subservice-${service && service.id}`
                            )
                          }
                        >
                          {service.title}
                        </a>
                      </li>
                    ))}
                  </Ul>
                ) : filteredServices.length === 0 ? (
                  <NoServicesFound>{t("No services found")}</NoServicesFound>
                ) : (
                  <Ul>
                    {filteredServices.map((service) => (
                      <li key={service && service.id}>
                        <a
                          onClick={() =>
                            handleClickToFilteredItem(
                              `#subservice-${service && service.id}`
                            )
                          }
                        >
                          {service && service.title}
                        </a>
                      </li>
                    ))}
                  </Ul>
                )}
              </FilteredComponent>
            )}
          </Search>
        </SearchComponent>
        <CircleBlue />
        <CircleOrange />
        <CircleBlueSecond />
        <CircleOrangeSecond />
      </Box>
      <Sprinkle>
        <Image src={SprinkleImage} alt="sprinkle image" />
      </Sprinkle>
      <HappyClients>
        <Image src={HappyClientsImage} alt="happy clients" />
      </HappyClients>
      <Review>
        <Image src={ReviewImage} alt="review" />
      </Review>
    </Container>
  );
};

export default ServicesHeader;

const Container = styled.section`
  position: relative;
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    padding: 0;
  }

  h3 {
    text-align: center;
    margin-bottom: ${proportions.divMargin.desktop};

    @media screen and (max-width: 768px) {
      margin-bottom: ${proportions.divMargin.tablet};
    }
    @media screen and (max-width: 481px) {
      margin-bottom: ${proportions.divMargin.mobile};
    }
  }
`;

const Box = styled.div`
  width: 100%;
  margin: ${proportions.sectionMargin.desktop} auto;
  max-width: ${proportions.bodyMaxWidth};
  border-radius: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${proportions.textMargin.desktop};

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const SearchTitles = styled.h1`
  font-weight: 900;
  span {
    position: relative;
    color: #0078db;
    img {
      position: absolute;
      top: -32px;
      left: -8px;
      width: 100%;

      @media screen and (max-width: 768px) {
        top: -28px;
        left: -4px;
        width: 108px;
      }

      @media screen and (max-width: 481px) {
        top: -28px;
        left: -4px;
        width: 102px;
      }
    }
  }
`;

const SearchComponent = styled.div`
  position: relative;
  padding: ${proportions.screenPadding.tablet};
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 10px;
  z-index: 50;
  button {
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 5px;
    svg {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;
const Search = styled.div`
  position: relative;
  display: flex;
  margin: 40px 0;

  input {
    padding: 20px;
    transition: 0.2s;
    &:focus {
      border-radius: 10px;
      transform: scale(1.01);
      box-shadow: 0 0 10px #e2dfdf;
    }
  }
`;

const FilteredComponent = styled.div`
  display: flex;
  width: 100%;
  background-color: #f9f9fa;
  box-shadow: 0 0 5px #e2dfdf;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 60px;
  border-radius: 5px;
  left: 0;
`;

const Ul = styled.ul`
  width: 100%;
  li {
    text-align: start;
    transition: all 0.1s ease-in;
    cursor: pointer;
    a {
      padding: 20px;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const Sprinkle = styled.div`
  position: absolute;
  top: 40%;
  right: 0%;

  @media screen and (max-width: 1180px) {
    right: -5%;
  }

  @media screen and (max-width: 1082px) {
    top: 70%;
    right: 5%;
    transform: rotate(90deg);
  }

  @media screen and (max-width: 481px) {
    display: none;
  }
`;

const HappyClients = styled.div`
  position: absolute;
  top: -40%;
  right: 5%;

  @media screen and (max-width: 768px) {
    top: -31%;
  }

  @media screen and (max-width: 481px) {
    img {
      width: 150px;
      height: 100px;
    }
  }
`;

const Review = styled.div`
  position: absolute;
  top: 110%;
  left: 3%;

  @media screen and (max-width: 768px) {
    top: 101%;

    img {
      width: 300px;
    }
  }

  @media screen and (max-width: 481px) {
    top: 95%;
    img {
      width: 180px;
      height: 120px;
    }
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  top: 40%;
  left: 20%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;
  z-index: 99;

  @media screen and (max-width: 1328px) {
    left: 10%;
    top: 50%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrange = styled.div`
  position: absolute;
  top: 0%;
  left: 30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;
  z-index: 99;

  @media screen and (max-width: 1328px) {
    left: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleBlueSecond = styled.div`
  position: absolute;
  top: 00%;
  right: 20%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;
  z-index: 99;

  @media screen and (max-width: 1328px) {
    top: 50%;
    right: 10%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrangeSecond = styled.div`
  position: absolute;
  top: 40%;
  right: 30%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;
  z-index: 99;
  @media screen and (max-width: 1328px) {
    right: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const NoServicesFound = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 18px;
  color: #999999;
`;
