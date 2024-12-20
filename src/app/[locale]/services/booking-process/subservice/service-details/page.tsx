"use client";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  Title,
} from "@/styles/booking-service";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styled from "styled-components";
import { store } from "@/valtio-store/store";
import { proportions } from "@/styles/proportions";
import { useEffect, useState } from "react";
import { MyColors } from "@/styles/color";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { userFormDataStore } from "@/valtio-store/bookStore";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import StepForm from "@/widgets/booking/StepForm";
import { MyButton } from "@/ui";
import BookingDetails from "@/widgets/booking/BookingDetails";

const ServiceDetails = () => {
  store.bookingFormStep = 2;
  const MAX_DESC_LENGTH = 200;
  const navigate = useRouter();
  const [desc, setDesc] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);
  const translations = useTranslations();
  const currentLanguage = useLocale();
  const handleDescSend = () => {
    setFormDataItem("desc", desc);
    navigate.push(
      `/${currentLanguage}/services/booking-process/subservice/location`
    );
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_DESC_LENGTH) {
      setDesc(value);
      setCharCount(value.length);
    }
  };

  useEffect(() => {
    if (
      !userFormDataStore.ServiceSummary ||
      userFormDataStore.ServiceSummary.length === 0
    ) {
      navigate.push(`/${currentLanguage}/service-not-found`);
    }
  }, [userFormDataStore.ServiceSummary, navigate, currentLanguage]);

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <Title>
              <h4>{translations("Service Details_")}</h4>
            </Title>
            <Form>
              <p>{translations("Describe the problem")}</p>
              <TextArea
                placeholder={translations("Describe_the_problem_placeholder")}
                rows={6}
                value={desc}
                onChange={handleDescChange}
                maxLength={MAX_DESC_LENGTH}
              ></TextArea>
              <CharCount $isOverLimit={charCount > MAX_DESC_LENGTH}>
                {charCount}/{MAX_DESC_LENGTH}
              </CharCount>
            </Form>
          </div>
          <Movement>
            <PrevStep>
              <MyButton $variant="secondary" onClick={() => navigate.back()}>
                <IoIosArrowRoundBack />
                {translations("Back")}
              </MyButton>
            </PrevStep>
            <NextStep onClick={handleDescSend}>
              <MyButton>
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

export default ServiceDetails;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.tablet};

  p {
    font-weight: 500;
    margin-left: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 10px;
  border: 1px solid #b2adb9;
  padding: 20px;
  resize: none;
  outline: none;
  transition: 0.2s;
  font-family: Mardoto;
  font-size: 16px;

  &:hover {
    box-shadow: 0 0 5px ${MyColors.primary};
    border-radius: 12px;
    border: 1px solid transparent;
  }

  &::placeholder {
    color: ${MyColors.secondary};
  }
`;

const CharCount = styled.div<{ $isOverLimit: boolean }>`
  font-weight: 300;
  font-size: 13px;
  align-self: flex-start;
  margin-left: 10px;
  color: ${(props) => (props.$isOverLimit ? "red" : "#777")};
`;
