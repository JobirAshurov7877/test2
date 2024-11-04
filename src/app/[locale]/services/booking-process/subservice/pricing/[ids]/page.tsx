"use client";
import { MyButton, MyLoading } from "@/ui";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
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
import { useSnapshot } from "valtio";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchPricingData } from "@/store/pricingSlice";
import StepForm from "@/widgets/booking/StepForm";
import BookingDetails from "@/widgets/booking/BookingDetails";
import PriceCard from "@/widgets/booking/price/PriceCard";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const Pricing = () => {
  store.bookingFormStep = 1;
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const pathname = usePathname();
  const params = useParams<{ ids: string }>();
  const navigate = useRouter();
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const currentLanguage = useLocale();
  const translations = useTranslations();
  const { data: pricingData, loading } = useSelector(
    (state: RootState) => state.pricingData
  );

  console.log(params["ids"]);

  useEffect(() => {
    if (params["ids"]) {
      const decodedIds = JSON.parse(atob(params["ids"]));
      dispatch(
        fetchPricingData({ itemIds: decodedIds, lang: currentLanguage })
      );
    }
  }, [params["ids"], dispatch, pathname, currentLanguage]);

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
    navigate.push(
      `/${currentLanguage}/services/booking-process/subservice/service-details`
    );
  };
  const handleNavigate = () => {
    if (navigate && typeof navigate.back === "function") {
      navigate.back();
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
                {translations("Back")}
              </MyButton>
            </PrevStep>
            <NextStep>
              <MyButton onClick={HandleNextStep}>
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

export default Pricing;
