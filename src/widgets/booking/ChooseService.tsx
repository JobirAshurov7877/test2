import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  Title,
  MyLoaderContainer,
} from "@/styles/booking-service";
import StepForm from "./StepForm";
import BookingDetails from "./BookingDetails";
import { useSelector } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchServiceRootData } from "@/store/rootWithServicesSlice";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { MyButton } from "@/ui";
import MyLoading from "@/ui/loading/MyLoading";

interface ChooseServiceProps {
  serviceId: string | undefined;
}

const ChooseService: React.FC<ChooseServiceProps> = ({ serviceId }) => {
  const [selectedServices, setSelectedServices] = useState<
    { id: number; rateValue: number }[]
  >([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const navigate = useRouter();
  const {
    data: root,
    loading,
    error,
  } = useSelector((state: RootState) => state.rootWithServicesSlice);
  const dispatch = useDispatch();
  const currentLanguage = useLocale();
  const translations = useTranslations();

  useEffect(() => {
    setFormDataItem("serviceTitle", null);
    if (serviceId) {
      (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
        fetchServiceRootData({
          rootId: serviceId,
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, serviceId, currentLanguage]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const goBack = () => {
    setFormDataItem("serviceTitle", null);
    navigate.back();
  };

  const handleItemClick = (id: number, rateValue: number, title: string) => {
    if (selectedItemId === id) {
      setSelectedItemId(null); // Deselect if clicking on the already selected item
      setFormDataItem("serviceTitle", null);
    } else {
      setSelectedItemId(id); // Select the clicked item
      setFormDataItem("serviceTitle", title);
      setSelectedServices([...selectedServices, { id, rateValue }]);
    }
  };

  const selectedIds = selectedServices.map((service) => service.id);

  const handleBook = () => {
    const selectedIdsBase64 = btoa(JSON.stringify(selectedIds));

    if (root) {
      const selectedItem = root.subServices.find(
        (item) => item.id === selectedItemId
      );
      if (selectedItem && selectedItem?.service) {
        navigate.push(
          `/${currentLanguage}/services/booking-process/subservice/pricing/${selectedIdsBase64}`
        );
      } else {
        navigate.push(
          `/${currentLanguage}/services/booking-process/subservice/${selectedItemId}/${selectedItem?.slug}`
        );
      }
    }
  };

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <Title>{!loading && <h4>{root?.title}</h4>}</Title>
            <Ul>
              {loading ? (
                <LoaderParent>
                  <MyLoaderContainer>
                    <MyLoading />
                  </MyLoaderContainer>
                </LoaderParent>
              ) : (
                root &&
                root.subServices.map((subService) => (
                  <li
                    key={subService.id}
                    onClick={() =>
                      handleItemClick(
                        subService.id,
                        subService.rateValue,
                        subService.title
                      )
                    }
                    className={
                      selectedItemId === subService.id ? "selected" : ""
                    }
                  >
                    <p>{subService.title}</p>
                  </li>
                ))
              )}
            </Ul>
          </div>
          <Movement>
            <PrevStep>
              <MyButton $variant="secondary" onClick={goBack}>
                <IoIosArrowRoundBack />
                {translations("Back")}
              </MyButton>
            </PrevStep>
            <NextStep>
              <MyButton disabled={selectedItemId === null} onClick={handleBook}>
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

export default ChooseService;

const Ul = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};
  width: 100%;
  flex-wrap: wrap;
  li {
    list-style: none;
    border: 1px solid #b7b1bd;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;

    p {
      font-weight: 500;
      font-size: 16px;
    }

    &.selected {
      background-image: linear-gradient(to right, #009dfe, #0078db);
      color: white;
      box-shadow: 0 0 5px #009dfeb9;
    }

    &:hover {
      background-image: linear-gradient(to right, #009dfe, #0078db);
      color: white;
    }
  }
`;

const LoaderParent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
