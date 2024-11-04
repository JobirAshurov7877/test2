"use client";
import {
  Box,
  Container,
  Movement,
  NextStep,
  OrderPreparation,
  Title,
} from "@/styles/booking-service";

import styled from "styled-components";
import { MyButton } from "@/ui";
import { IoIosArrowRoundForward } from "react-icons/io";
import { store } from "@/valtio-store/store";
import qr from "@/assets/varpetQr.png";
import { TbSpeakerphone } from "react-icons/tb";
import { proportions } from "@/styles/proportions";
import { MyColors } from "@/styles/color";
import { resetUserFormData } from "@/valtio-store/bookStore";
import { useEffect } from "react";
import { userFormDataStore } from "@/valtio-store/bookStore";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import StepForm from "@/widgets/booking/StepForm";
import Image from "next/image";
import BookingDetails from "@/widgets/booking/BookingDetails";

const BookingSuccess = () => {
  store.bookingFormStep = 5;
  const translations = useTranslations();
  const currentLanguage = useLocale();
  const navigate = useRouter();

  useEffect(() => {
    const encodedKey = btoa("verificationTimer");
    localStorage.setItem(encodedKey, btoa("0"));
    localStorage.setItem(encodedKey + "_interval", btoa("false"));
    localStorage.removeItem(encodedKey + "_interval");
    localStorage.removeItem(encodedKey);
    userFormDataStore.ServiceSummary = null;
  }, []);

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <SuccessContainer>
              <Title>
                <h3>{translations("Success")}!</h3>
                <p>
                  {translations("Your booking has been successfully made")}...
                </p>
                <Image src={qr} alt="qr" width={200} />
              </Title>
              <div className="warn">
                <div>
                  <TbSpeakerphone />
                </div>
                <p>
                  {translations(
                    "Download Varpet app to track the progress in real-time and get notifications about it."
                  )}
                </p>
              </div>
            </SuccessContainer>
          </div>
          <Buttons>
            <Movement>
              <NextStep>
                <MyButton
                  onClick={() => {
                    resetUserFormData();
                    navigate.push(`/${currentLanguage}/services`);
                  }}
                >
                  {translations("Home")}
                  <IoIosArrowRoundForward />
                </MyButton>
              </NextStep>
            </Movement>
          </Buttons>
        </OrderPreparation>
        <BookingDetails />
      </Box>
    </Container>
  );
};

export default BookingSuccess;

const SuccessContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;

  .warn {
    display: flex;
    width: 50%;
    background-color: #fef5e8;
    padding: 12px 16px;
    margin: 0 auto;
    border: 1px solid #f7900c;
    border-radius: 8px;

    div {
      width: 10%;
      margin-right: ${proportions.textMargin.tablet};

      svg {
        transform: translateY(3px);
        color: #f7900c;
        font-size: 24px;
      }
    }

    p {
      width: 80%;
      text-align: start;
    }

    @media screen and (max-width: 768px) {
      width: 80%;
    }
    @media screen and (max-width: 481px) {
      width: 100%;
    }
  }

  h3 {
    color: ${MyColors.success};
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
    justify-content: end;
  }
`;
