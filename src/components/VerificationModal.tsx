"use client";
import { proportions } from "@/styles/proportions";
import { MyButton } from "@/ui";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RiCloseLargeLine } from "react-icons/ri";
import { MyColors } from "@/styles/color";
import { useTranslations } from "next-intl";

interface VerificationProps {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  setRequestModal: (value: boolean) => void;
  handleVerify: () => void;
  handleSignIn: () => void;
  phoneValue: {
    recipient: string;
    countryCode: string;
  };
  verifyError: string;
  setVerifyError: (error: string) => void;
  setVerificationCodeInterval: (value: boolean) => void;
  timer: number;
  setTimer: (value: any) => void;
  encodedKey: string;
}

const VerificationModal: React.FC<VerificationProps> = ({
  verificationCode,
  setVerificationCode,
  setRequestModal,
  handleVerify,
  handleSignIn,
  phoneValue,
  verifyError,
  setVerifyError,
  setVerificationCodeInterval,
  timer,
  setTimer,
  encodedKey,
}) => {
  const translations = useTranslations();
  const [isVerificationCodeFocused, setIsVerificationCodeFocused] =
    useState(false);
  const [disableSendAgain, setDisableSendAgain] = useState(true);
  const timerId = useRef<number | undefined>();

  useEffect(() => {
    localStorage.setItem(encodedKey, btoa(timer.toString()));
    const countdownTimer = () => {
      timerId.current = setInterval(() => {
        // Use functional update to safely update state
        setTimer((prevTimer: number) => {
          if (prevTimer === 0) {
            clearInterval(timerId.current as number);
            setDisableSendAgain(false);
            setVerificationCodeInterval(false);
            localStorage.setItem(encodedKey + "_interval", btoa("false"));
            localStorage.removeItem(encodedKey + "_interval");
            localStorage.removeItem(encodedKey);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000) as unknown as number;
    };

    // Start countdownTimer when timer changes
    countdownTimer();

    return () => {
      clearInterval(timerId.current as number);
    };
  }, [timer]);

  const handleSendAgain = () => {
    handleVerify();
    setDisableSendAgain(true);
    setTimer(60);
    localStorage.setItem(encodedKey, btoa("60"));
  };

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  return (
    <Container>
      <Modal>
        <Box>
          <h4>{translations("Verify your phone number")}</h4>
          <p>
            {translations("We have sent a verification code to this number")}{" "}
            <br />+{phoneValue.recipient}.{" "}
            {translations("Please enter the code to proceed")}
          </p>
          <VerifyInputContainer>
            <VerificationInput
              placeholder="Verification code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              onFocus={() => handleFocus(setIsVerificationCodeFocused)}
              onBlur={() => handleBlur(setIsVerificationCodeFocused)}
              $isFocused={isVerificationCodeFocused}
            />
            <Error>{verifyError}</Error>
          </VerifyInputContainer>
          <Buttons>
            <MyButton
              $variant="secondary"
              onClick={handleSendAgain}
              disabled={disableSendAgain}
            >
              {translations("Send again")}
              <p>{timer}</p>
            </MyButton>
            <MyButton disabled={!verificationCode} onClick={handleSignIn}>
              {translations("Confirm")}
            </MyButton>
          </Buttons>
        </Box>
        <CloseButton
          onClick={() => {
            setRequestModal(false);
            setVerifyError("");
          }}
        >
          <RiCloseLargeLine />
        </CloseButton>
      </Modal>
    </Container>
  );
};

export default VerificationModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  margin: 0 auto;
  padding: 0 20px;
`;

const Modal = styled.div`
  position: relative;
  width: 558px;
  height: 416px;
  border-radius: 24px;
  background-color: white;
  display: flex;

  @media screen and (max-width: 768px) {
    width: 488px;
    height: 386px;
  }
`;

const Box = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  gap: ${proportions.textMargin.desktop};

  p {
    font-weight: 400;
  }

  @media screen and (max-width: 481px) {
    width: 100%;
  }
`;

const VerifyInputContainer = styled.div`
  width: 100%;
  position: relative;

  p {
    position: absolute;
    right: 15px;
    font-size: 13px;
    color: ${MyColors.primary};
  }
`;

const VerificationInput = styled.input<{ $isFocused: boolean }>`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 5px #e2dfdf;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 10px #e2dfdf;
    border-radius: 12px;
  }

  &::placeholder {
    color: #b2adb9;
  }

  color: ${(props) => (props.$isFocused ? "black" : "#b2adb9")};
  border: ${(props) =>
    props.$isFocused ? "1px solid transparent" : "1px solid #ccc"};
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${proportions.divMargin.desktop};
  margin-top: ${proportions.divMargin.tablet};
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    width: 50%;

    p {
      font-size: 13px;
      transform: translateX(7px);
    }
  }

  @media screen and (max-width: 481px) {
    margin-top: ${proportions.divMargin.mobile};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Error = styled.div`
  position: absolute;
  left: 18px;
  bottom: -20px;
  font-size: 13px;
  color: #fe0200;
`;
