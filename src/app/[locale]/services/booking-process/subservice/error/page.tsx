"use client";
import {
  Box,
  Container,
  Movement,
  OrderPreparation,
  PrevStep,
  Title,
} from "@/styles/booking-service";

import styled from "styled-components";
import { MyButton } from "@/ui";
import { IoIosArrowRoundBack } from "react-icons/io";
import { store } from "@/valtio-store/store";
import error from "@/assets/error.svg";
import { MyColors } from "@/styles/color";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import StepForm from "@/widgets/booking/StepForm";
import Image from "next/image";
import BookingDetails from "@/widgets/booking/BookingDetails";

const BookingError = () => {
  store.bookingFormStep = 6;
  const translations = useTranslations();
  const navigate = useRouter();

  useEffect(() => {
    const encodedKey = btoa("verificationTimer");
    localStorage.setItem(encodedKey, btoa("0"));
    localStorage.setItem(encodedKey + "_interval", btoa("false"));
    localStorage.removeItem(encodedKey + "_interval");
    localStorage.removeItem(encodedKey);
  }, []);

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <SuccessContainer>
              <Title>
                <h3>{translations("Failed")}!</h3>
                <Image src={error} alt="error" />
                <p>{translations("Your booking has not been made ...")}</p>
              </Title>
            </SuccessContainer>
          </div>
          <Buttons>
            <Movement>
              <PrevStep>
                <MyButton onClick={() => navigate.back()}>
                  <IoIosArrowRoundBack />
                  {translations("Back")}
                </MyButton>
              </PrevStep>
            </Movement>
          </Buttons>
        </OrderPreparation>
        <BookingDetails />
      </Box>
    </Container>
  );
};

export default BookingError;

const SuccessContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    color: ${MyColors.error};
  }
  p {
    font-weight: 400;
  }
  img {
    max-width: 200px;
    margin-top: 16px;
  }
`;

const Buttons = styled.div`
  div {
    justify-content: start;
  }
`;
