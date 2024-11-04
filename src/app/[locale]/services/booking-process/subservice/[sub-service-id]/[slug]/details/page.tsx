"use client";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { MyButton, MyCheckBox, MyLoading } from "@/ui";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
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
import { MyColors } from "@/styles/color";
import { fetchServiceRootData } from "@/store/rootWithServicesSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import StepForm from "@/widgets/booking/StepForm";
import BookingDetails from "@/widgets/booking/BookingDetails";
import { useLocale, useTranslations } from "next-intl";

const AdditionalServices = () => {
  const pathname = usePathname();
  const params = useParams<{ "sub-service-id": string }>();

  const navigate = useRouter();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
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
  const [selectedInput, setSelectedInput] = useState<string | null>(null);

  const { data: subServiceData, loading } = useSelector(
    (state: RootState) => state.rootWithServicesSlice
  );

  const handleInputChange = (title: string) => {
    setSelectedInput(title);
    setSelectedServices([]);
  };

  const handleCheckboxChange = (
    id: number,
    rateValue: number,
    title: string,
    rateType: string,
    minOrderTime: number
  ) => {
    const index = selectedServices.findIndex((service) => service.id === id);
    if (index !== -1) {
      const updatedServices = [...selectedServices];
      updatedServices.splice(index, 1);
      setSelectedServices(updatedServices);
    } else {
      setSelectedServices([
        ...selectedServices,
        { id, rateValue, title, rateType, minOrderTime },
      ]);
    }
    setSelectedInput(null);
  };

  const selectedIds = selectedServices.map((service) => service.id);

  const handleFormSubmit = () => {
    const isServiceSelected = selectedServices.length > 0;
    const selectedSubService = subServiceData?.subServices.find(
      (subService) => subService.title === selectedInput
    );
    const selectedIdsBase64 = btoa(JSON.stringify(selectedIds));

    if (isServiceSelected) {
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/pricing/${selectedIdsBase64}`
      );
    } else {
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/${selectedSubService?.id}/${selectedSubService?.slug}/details`
      );
    }
  };

  useEffect(() => {
    if (params["sub-service-id"]) {
      dispatch(
        fetchServiceRootData({
          rootId: params["sub-service-id"],
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, params["sub-service-id"], currentLanguage, pathname]);

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <Title>{!loading && <h4>{subServiceData?.title}</h4>}</Title>
            <Ul>
              {loading ? (
                <MyLoaderContainer>
                  <MyLoading />
                </MyLoaderContainer>
              ) : (
                subServiceData &&
                subServiceData.subServices.map((subServiceDetail) =>
                  !subServiceDetail.service ? (
                    <li key={subServiceDetail.id}>
                      <input
                        type="radio"
                        id={subServiceDetail.title}
                        onChange={() =>
                          handleInputChange(subServiceDetail.title)
                        }
                        checked={selectedInput === subServiceDetail.title}
                      />
                      <label htmlFor={subServiceDetail.title}>
                        {subServiceDetail.title}
                      </label>
                    </li>
                  ) : (
                    <li key={subServiceDetail.id}>
                      <MyCheckBox
                        id={subServiceDetail.title}
                        onChange={() =>
                          handleCheckboxChange(
                            subServiceDetail.id,
                            subServiceDetail.rateValue,
                            subServiceDetail.title,
                            subServiceDetail.rateType,
                            subServiceDetail.minOrderTime
                          )
                        }
                        isChecked={selectedServices.some(
                          (service) => service.id === subServiceDetail.id
                        )}
                      />
                      <label htmlFor={subServiceDetail.title}>
                        {subServiceDetail.title}
                      </label>
                    </li>
                  )
                )
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
                  selectedServices.length === 0 && selectedInput === null
                }
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

export default AdditionalServices;

const Ul = styled.ul`
  li {
    display: flex;
    margin-top: ${proportions.textMargin.desktop};
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
