import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchSubRootData } from "@/store/subrootSlice";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { MyButton, MyCheckBox, MyLoading } from "@/ui";
import { SubRoot } from "@/interfaces/subroot.interface";
import StepForm from "@/widgets/booking/StepForm";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  MyLoaderContainer,
  Title,
} from "@/styles/booking-service";
import BookingDetails from "./BookingDetails";
import { MyColors } from "@/styles/color";
import { fetchSubServiceData } from "@/store/subServiceSlice";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { store } from "@/valtio-store/store";
import { useParams, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const BookService = () => {
  store.bookingFormStep = 1;
  const navigate = useRouter();
  const params = useParams<{ "sub-service-id": string }>();

  const {
    data: subRootData,
    loading,
    error,
  } = useSelector((state: RootState) => state.subroot);
  const { data: category } = useSelector(
    (state: RootState) => state.subservice
  );
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<
    {
      id: number;
      rateValue: number;
      title: string;
      rateType: string;
      minOrderTime: number;
    }[]
  >([]);

  const currentLanguage = useLocale();
  const translations = useTranslations();
  useEffect(() => {
    if (params["sub-service-id"]) {
      dispatch(
        fetchSubRootData({
          rootId: params["sub-service-id"],
          lang: currentLanguage,
        })
      );
      dispatch(
        fetchSubServiceData({
          itemId: params["sub-service-id"],
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, params["sub-service-id"], currentLanguage]);

  const handleInputChange = (title: string) => {
    setSelectedInput(title);
    setFormDataItem("subServiceTitle", title);
    setSelectedServices([]);
  };

  const selectedIds = selectedServices.map((service) => service.id);

  const handleFormSubmit = () => {
    const isServiceSelected = selectedServices.length > 0;
    const selectedSubService = subRootData?.find(
      (subService) => subService.title === selectedInput
    );
    const selectedIdsBase64 = btoa(JSON.stringify(selectedIds));

    if (isServiceSelected) {
      // Navigate to pricing route
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/pricing/${selectedIdsBase64}`
      );
    } else {
      // Navigate to another route
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/${selectedSubService?.id}/${selectedSubService?.slug}/details`
      );
    }
  };

  const handleCheckboxChange = (
    id: number,
    rateValue: number,
    title: string,
    isChecked: boolean,
    rateType: string,
    minOrderTime: number
  ) => {
    const index = selectedServices.findIndex((service) => service.id === id);

    if (isChecked) {
      // Checkbox is checked, add the service to selectedServices
      if (index === -1) {
        setSelectedServices([
          ...selectedServices,
          { id, rateValue, title, rateType, minOrderTime },
        ]);
      }
    } else {
      // Checkbox is unchecked, remove the service from selectedServices
      if (index !== -1) {
        const updatedServices = [...selectedServices];
        updatedServices.splice(index, 1);
        setSelectedServices(updatedServices);
      }
    }

    setSelectedInput(null); // Reset selectedInput
    setFormDataItem("subServiceTitle", null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            {loading || !subRootData ? (
              <></>
            ) : (
              <Title>
                <h4>{category?.title}</h4>
              </Title>
            )}
            <Ul>
              {loading || !subRootData ? (
                <MyLoaderContainer>
                  <MyLoading />
                </MyLoaderContainer>
              ) : (
                subRootData &&
                subRootData.map((subService: SubRoot) => (
                  <li key={subService.id}>
                    {!subService.service ? (
                      <>
                        <input
                          type="radio"
                          id={subService.title}
                          onChange={() => handleInputChange(subService.title)}
                          checked={selectedInput === subService.title}
                        />
                        <label htmlFor={subService.title}>
                          {subService.title}
                        </label>
                      </>
                    ) : (
                      <>
                        <MyCheckBox
                          id={subService.title + subService.id}
                          onChange={(isChecked) =>
                            handleCheckboxChange(
                              subService.id,
                              subService.rateValue,
                              subService.title,
                              isChecked,
                              subService.rateType,
                              subService.minOrderTime
                            )
                          }
                          isChecked={
                            selectedServices.some(
                              (service) => service.id === subService.id
                            )
                              ? true
                              : false // Use false instead of null if you don't want null values
                          }
                        />
                        <label htmlFor={subService.title + subService.id}>
                          {subService.title}
                        </label>
                      </>
                    )}
                  </li>
                ))
              )}
            </Ul>
          </div>
          <Movement>
            <PrevStep>
              <MyButton $variant="secondary" onClick={() => navigate.back()}>
                <IoIosArrowRoundBack />
                {translations("Back")}
              </MyButton>
            </PrevStep>
            <NextStep>
              <MyButton
                disabled={
                  selectedInput === null && selectedServices.length === 0
                } // Disable button if no input is selected
                onClick={handleFormSubmit}
              >
                {translations("Next")}
                <IoIosArrowRoundForward />
              </MyButton>
            </NextStep>
          </Movement>
        </OrderPreparation>
        <BookingDetails />
      </Box>
    </Container>
  );
};

export default BookService;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};
  li {
    display: flex;
    align-items: center;
    gap: ${proportions.textMargin.desktop};
    transition: all 0.1s ease-in;
    label {
      cursor: pointer;
    }
    input {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    &:hover {
      color: ${MyColors.primary};
    }
  }
`;
