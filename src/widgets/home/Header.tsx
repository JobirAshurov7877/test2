"use client";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { HomeHeaderText } from "@/components";
import { MyColors } from "@/styles/color";
import { proportions } from "@/styles/proportions";
import { MyInput } from "@/ui";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { imagesAPI } from "../../../env";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { fetchCategories } from "@/store/categoriesSlice";
import { useRouter } from "next/navigation";

interface SubService {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}
export default function Header() {
  const t = useTranslations();
  const currentLanguage = useLocale();
  const navigate = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilteredItems, setShowFilteredItems] = useState(false);
  const [randomItems, setRandomItems] = useState<SubService[]>([]);
  const filteredItemsRef = useRef<HTMLDivElement>(null);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const { categories } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories(currentLanguage));
  }, [dispatch, currentLanguage]);

  const subServices = useMemo(() => {
    return categories.flatMap((category) => category.subServices);
  }, [categories]);

  const generateRandomSubServices = () => {
    const randomIndexes: number[] = [];
    const randomItems: SubService[] = [];
    const items = subServices
      .filter((service) => service && service.title) // Filter out undefined or null service objects and titles
      .map((service) => ({
        title: service!.title,
        id: service!.id,
        description: service?.description || "",
        image: service?.image || "", // Handle undefined image
        slug: service?.slug || "",
      })); // Assert that service exists and access the title property
    while (randomIndexes.length < 5 && items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
        randomItems.push(items[randomIndex]);
      }
    }
    setRandomItems(randomItems);
  };

  useEffect(() => {
    generateRandomSubServices(); // Initial generation of random sub-services
  }, []);

  const handleInputClick = () => {
    // generateRandomSubServices();
    setShowFilteredItems(true); // Show the filtered component
  };

  const filteredServices = useMemo(() => {
    return subServices
      .filter((service) =>
        service?.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [searchQuery, subServices, randomItems]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setShowFilteredItems(event.target.value !== "");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filteredItemsRef.current &&
        !filteredItemsRef.current.contains(event.target as Node)
      ) {
        setShowFilteredItems(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Box>
        <HomeHeaderText />
        <SearchComponent>
          <SearchInput $isOpen={showFilteredItems}>
            <MyInput
              value={searchQuery}
              onClick={handleInputClick}
              onChange={handleSearchInputChange}
              type="text"
              placeholder={t("Search for a service")}
            />
          </SearchInput>
          {showFilteredItems && (
            <FilteredItems ref={filteredItemsRef}>
              {filteredServices.length === 0 ? (
                <NoServicesFound>{t("No services found")}</NoServicesFound>
              ) : searchQuery === "" ? (
                randomItems.map((service) => (
                  <FilteredItem
                    key={service?.id}
                    onClick={() =>
                      navigate.push(
                        `/${currentLanguage}/services/${service.id}/subservice/${service.id}/${service.slug}`
                      )
                    }
                  >
                    <Imagew>
                      <Image
                        src={imagesAPI + service?.image}
                        alt="services"
                        width={100}
                        height={100}
                      />
                    </Imagew>
                    <div>
                      <h6>{service?.title}</h6>
                      <p>{service?.description}</p>
                    </div>
                  </FilteredItem>
                ))
              ) : (
                filteredServices.map((service) => (
                  <FilteredItem
                    key={service?.id}
                    onClick={() =>
                      navigate.push(
                        `/${currentLanguage}/services/${service?.id}/subservice/${service?.id}/${service?.slug}`
                      )
                    }
                  >
                    <Imagew>
                      <Image
                        src={imagesAPI + service?.image}
                        alt="services"
                        width={100}
                        height={100}
                      />
                    </Imagew>
                    <div>
                      <h6>{service?.title}</h6>
                      <p>{service?.description}</p>
                    </div>
                  </FilteredItem>
                ))
              )}
            </FilteredItems>
          )}
        </SearchComponent>
        <CircleBlue />
        <CircleOrange />
        <CircleBlueSecond />
        <CircleOrangeSecond />
      </Box>
    </Container>
  );
}
const Container = styled.section`
  position: relative;
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};
  background-color: #f9f9fa;

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
    margin: ${proportions.sectionMargin.tablet} auto;
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
    margin: ${proportions.sectionMargin.mobile} auto;
  }
`;

const SearchComponent = styled.div`
  position: relative;
  width: 80%;
  padding: 30px 50px;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 24px;

  @media screen and (max-width: 768px) {
    padding: 20px 40px;
    width: 100%;
  }

  @media screen and (max-width: 481px) {
    padding: 0;
  }
`;

const SearchInput = styled.div<{ $isOpen: boolean }>`
  input {
    border-radius: ${({ $isOpen }) => ($isOpen ? "16px 16px 0 0" : "8px")};
    padding: 30px;

    &:hover {
      border-radius: 20px;
    }

    @media screen and (max-width: 768px) {
      padding: 20px 40px;
    }

    @media screen and (max-width: 481px) {
      padding: 20px;
      border-radius: 8px;

      &:hover {
        border-radius: 10px;
      }
    }

    &::placeholder {
      font-size: 20px;
      transform: translateY(2px);
    }
  }
`;

const FilteredItems = styled.div`
  position: absolute;
  top: 110px;
  width: 90%;
  border-radius: 0 0 16px 16px;
  background-color: #f9f9fa;
  box-shadow: 0 0 5px #e8e8e8;
  z-index: 101;

  @media screen and (max-width: 605px) {
    width: 100%;
    left: 0;
  }

  @media screen and (max-width: 481px) {
    top: 60px;
  }
`;

const FilteredItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: ${proportions.textMargin.desktop};
  cursor: pointer;

  @media screen and (max-width: 605px) {
    padding: 10px;
  }

  &:hover {
    background-color: #f2f2f2;
  }

  &:hover img {
    transform: scale(1.1);
  }

  img {
    transition: 0.1s;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    color: #999999;
  }

  h6 {
    color: ${MyColors.primary};
  }

  div {
    text-align: start;
  }
`;

const Imagew = styled.div`
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const NoServicesFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 18px;
  color: #999999;
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

  @media screen and (max-width: 1328px) {
    right: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
