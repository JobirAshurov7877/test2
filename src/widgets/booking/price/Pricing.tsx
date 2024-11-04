import StepForm from "../StepForm";
import BookingDetails from "../BookingDetails";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MyButton, MyLoading } from "@/ui";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import PriceCard from "./PriceCard";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  MyLoaderContainer,
} from "@/styles/booking-service";
import { store } from "@/valtio-store/store";
import { useEffect, useState } from "react";
import { languageStore } from "@/valtio-store/languageStore";
import { useSnapshot } from "valtio";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchPricingData } from "@/store/pricingSlice";

const Pricing = () => {
  store.bookingFormStep = 1;
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const location = useLocation();
  const { ids } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const { translations, currentLanguage } = useSnapshot(languageStore);
  const { data: pricingData, loading } = useSelector(
    (state: RootState) => state.pricingData
  );

  useEffect(() => {
    if (ids) {
      const decodedIds = JSON.parse(atob(ids));
      dispatch(fetchPricingData(decodedIds));
    }
  }, [ids, dispatch, location.pathname, currentLanguage]);

  const updateQuantity = (id: number, quantityDelta: number) => {
    const newQuantity = (quantities[id] || 1) + quantityDelta;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  const HandleNextStep = () => {
    const mappedServiceSummary = pricingData?.map((service) => ({
      serviceId: service.id.toString(),
      interval: quantities[service.id] || 1,
    }));

    setFormDataItem("ServiceSummary", mappedServiceSummary);
    navigate(
      `/${currentLanguage}/services/booking-process/subservice/service-details`
    );
  };
  const handleNavigate = () => {
    if (canNavigateBack) {
      navigate(-1);
    }
  };

  const canNavigateBack = typeof navigate === "function";

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            {loading || !pricingData || !Array.isArray(pricingData) ? (
              <>
                <MyLoaderContainer>
                  <MyLoading />
                </MyLoaderContainer>
              </>
            ) : (
              <>
                <PriceCard
                  ServiceSummary={pricingData}
                  onUpdateQuantity={updateQuantity}
                />
              </>
            )}
          </div>
          <Movement>
            <PrevStep>
              <MyButton
                disabled={!canNavigateBack}
                $variant="secondary"
                onClick={handleNavigate}
              >
                <IoIosArrowRoundBack />
                {translations.Back}
              </MyButton>
            </PrevStep>
            <NextStep>
              <MyButton onClick={HandleNextStep}>
                {translations.Next}
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

export default Pricing;
