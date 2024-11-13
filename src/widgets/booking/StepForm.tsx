import { useState } from "react";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MyColors } from "@/styles/color";
import { store } from "@/valtio-store/store";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const StepForm = () => {
  const [step] = useState<number>(store.bookingFormStep);
  const translations = useTranslations();
  const pathname = usePathname();

  const isLastStepSuccess = pathname.endsWith(
    "/booking-process/subservice/success"
  );
  const isLastStepError = pathname.endsWith(
    "/booking-process/subservice/error"
  );

  return (
    <Container>
      <StepFormContainer>
        <StepIndicator>
          <StepWrapper
            className={step <= 2 ? "show" : "hide"}
            $success={step >= 1}
            $active={step === 1}
          >
            <Step $success={step >= 1} $active={step === 1}>
              {step > 1 ? <FiCheck /> : 1}
            </Step>
          </StepWrapper>
          <Line
            className={step <= 2 ? "show" : "hide"}
            $success={step >= 2}
            $active={step === 1}
          />
          <StepWrapper
            className={step <= 2 ? "show" : "hide"}
            $success={step >= 2}
            $active={step === 2}
          >
            <Step $success={step >= 2} $active={step === 2}>
              {step > 2 ? <FiCheck /> : 2}
            </Step>
          </StepWrapper>
          <Line
            className={step < 1 ? "show" : "hide"}
            $success={step >= 3}
            $active={step === 2}
          />
          <StepWrapper
            className={step > 2 ? "show" : "hide"}
            $success={step >= 3}
            $active={step === 3}
          >
            <Step $success={step >= 3} $active={step === 3}>
              {step > 3 ? <FiCheck /> : 3}
            </Step>
          </StepWrapper>
          <Line
            className={step > 2 ? "show" : "hide"}
            $success={step >= 4}
            $active={step === 3}
          />
          <StepWrapper
            className={step > 2 ? "show" : "hide"}
            $success={step >= 4}
            $active={step === 4}
          >
            <Step
              $success={step >= 4}
              $active={step === 4}
              style={
                isLastStepError
                  ? { backgroundColor: MyColors.error, color: "white" }
                  : { backgroundColor: "", color: "" }
              }
            >
              {step > 4 && isLastStepSuccess ? (
                <FiCheck />
              ) : isLastStepError ? (
                <IoClose />
              ) : (
                4
              )}
            </Step>
          </StepWrapper>
        </StepIndicator>
      </StepFormContainer>
      <StepFormText>
        <span id="step-services" className="hide">
          {translations("Service")}
        </span>
        <span id="step-details" className="hide">
          {translations("Details")}
        </span>
        <span id="step-location" className="hide">
          {translations("Location")}
        </span>
        <span id="step-complete" className="hide">
          {translations("Complete")}
        </span>
      </StepFormText>
    </Container>
  );
};

export default StepForm;

const Container = styled.div``;

const StepFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: space-around;
    .hide,
    .thirth-line {
      display: none;
    }
  }
`;

const StepWrapper = styled.div<{ $success: boolean; $active: boolean }>`
  ${({ $success, $active }) =>
    $active ? "border: 2px solid #D4E6FF;" : $success ? "" : ""};
  ${({ $success, $active }) =>
    $active ? "padding: 3px;" : $success ? "padding: 0;" : "padding: 0;"};
  border-radius: 50%;
`;

const Step = styled.div<{
  $success: boolean;
  $active: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  background: ${({ $success, $active }) =>
    $active ? "#D4E6FF" : $success ? "#D6FEDB" : "#EEEEEE"};
`;

const Line = styled.div<{ $success: boolean; $active: boolean }>`
  height: 2px;
  width: 30%;
  background: ${({ $success, $active }) =>
    $active
      ? "linear-gradient(to right, #D4E6FF 50%, transparent)"
      : $success
      ? "linear-gradient(to right, #D6FEDB 50%, transparent)"
      : "#EEEEEE"};

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const StepFormText = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    width: 7%;
    display: flex;
    justify-content: center;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .hide {
      display: none;
    }
  }

  #step-services {
    transform: translateX(4px);
  }
  #step-details {
    transform: translateX(3px);
  }
  #step-location {
    transform: translateX(2px);
  }
  #step-complete {
    transform: translateX(-4px);
  }
`;
