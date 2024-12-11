"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  Title,
} from "@/styles/booking-service";
import { MyButton, MyLoading } from "@/ui";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
import { store } from "@/valtio-store/store";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setUser, userStore } from "@/valtio-store/userStore";
import { MyColors } from "@/styles/color";
import Cookies from "js-cookie";
import { userFormDataStore } from "@/valtio-store/bookStore";
import useHubSpotFormService from "@/components/HubSpotFormService";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { api } from "@/services/axios";
import StepForm from "@/widgets/booking/StepForm";
import BookingDetails from "@/widgets/booking/BookingDetails";
import { VerificationModal } from "@/components";

interface PhoneState {
  recipient: string;
  countryCode: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  tel: PhoneState;
  email: string;
}

const PhoneMail = () => {
  store.bookingFormStep = 4;
  const navigate = useRouter();
  const translations = useTranslations();
  const currentLanguage = useLocale();
  const correctCountryCode = Cookies.get("correctCountryCode");
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const verifiedUserString =
    typeof window !== "undefined" && localStorage.getItem("userData");
  const verifiedUser = verifiedUserString ? JSON.parse(verifiedUserString) : {};
  const [verificationCode, setVerificationCode] = useState<string>(
    verifiedUser.code
  );
  const [verificationId, setVerificationId] = useState<string>(
    verifiedUser.userId
  );
  const [verifyError, setVerifyError] = useState<string>("");
  const [registered, setRegistered] = useState<boolean>(true);
  const [namesInputsOpen, setNamesInputsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const encodedKey = btoa("verificationTimer");
  const initialTimer = useMemo(() => {
    const initialTimerEncoded =
      typeof window !== "undefined" && localStorage.getItem(encodedKey);
    return initialTimerEncoded ? parseInt(atob(initialTimerEncoded), 10) : 60;
  }, [encodedKey]);
  const [timer, setTimer] = useState(initialTimer);
  const [verificationCodeInterval, setVerificationCodeInterval] = useState(
    () => {
      const interval =
        typeof window !== "undefined" &&
        localStorage.getItem(encodedKey + "_interval");
      return interval ? JSON.parse(atob(interval)) : false;
    }
  );
  /* /// VERIFY NUMBER STATES END /// */
  /* /// VERIFY NUMBER STATES END /// */
  /* /// VERIFY NUMBER STATES END /// */

  /* /// FORM INPUTS STATES /// */
  /* /// FORM INPUTS STATES /// */
  /* /// FORM INPUTS STATES /// */
  const initialValues: FormData = {
    firstName: verifiedUser.firstName ? verifiedUser.firstName : "",
    lastName: verifiedUser.lastName ? verifiedUser.lastName : "",
    tel: {
      recipient: verifiedUser?.phone?.recipient
        ? verifiedUser.phone?.recipient
        : "",
      countryCode: verifiedUser?.phone?.countryCode
        ? verifiedUser?.phone?.countryCode
        : correctCountryCode,
    },
    email: verifiedUser?.email ? verifiedUser?.email : "",
  };

  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [phoneValue, setPhoneValue] = useState<{
    recipient: string;
    countryCode: string;
  }>({
    recipient: initialValues.tel.recipient,
    countryCode: initialValues.tel.countryCode,
  });
  const [emailValue, setEmailValue] = useState(initialValues.email);
  /* /// FORM INPUTS STATES END /// */
  /* /// FORM INPUTS STATES END /// */
  /* /// FORM INPUTS STATES END /// */

  /* FORM VALIDATION */
  /* FORM VALIDATION */
  /* FORM VALIDATION */
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(translations("First name is required")),
    lastName: Yup.string().required(translations("Last name is required")),
    tel: Yup.object().shape({
      recipient: Yup.string().required(
        translations("Phone number is required")
      ),
      countryCode: Yup.string(),
    }),
    email: Yup.string().email(translations("Invalid email address")),
  });
  const rest = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("userFormData")) ||
      "{}"
  );

  const handleRegister = async () => {
    setLoading(true);
    setUser({
      ...userStore,
      firstName,
      lastName,
    });
    const updatedUserData = JSON.parse(
      (typeof window !== "undefined" && localStorage.getItem("userData")) ||
        "{}"
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    const orderResponse = await api.post("/api/auth-and-order", {
      orderServices: rest.ServiceSummary,
      comment: rest.desc,
      orderLocation: rest.location,
      orderDate: rest.date + rest.time,
      phone: "+" + updatedUserData.phone.recipient,
      email: updatedUserData.email,
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      verificationId: updatedUserData.userId,
      verificationCode: updatedUserData.code,
      registered,
    });
    if (orderResponse.data === 200) {
      const formValues: FormData = {
        firstName: firstName,
        lastName: lastName,
        email: emailValue,
        tel: {
          recipient: phoneValue.recipient,
          countryCode: phoneValue.countryCode,
        },
      };
      submitToHubSpot(formValues);
      setUser({
        email: emailValue,
        phone: {
          recipient: phoneValue.recipient,
          countryCode: phoneValue.countryCode,
        },
        userId: verificationId,
        code: verificationCode,
      });
      setLoading(false);
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/success`
      );
    } else {
      setLoading(false);
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/error`
      );
    }
  };

  const handleVerify = async () => {
    setRequestModal(true);
    if (verificationCodeInterval) return;
    localStorage.setItem(encodedKey, btoa("60"));
    localStorage.setItem(encodedKey + "_interval", btoa("true"));
    setVerificationCodeInterval(true);
    setVerificationCode("");
    const response = await api.post("/api/user/signin", {
      recipient: "+" + phoneValue.recipient,
      countryCode: phoneValue.countryCode,
    });
    setVerificationId(response.data.verificationId);
    setRegistered(response.data.registered);
  };

  const handleSignIn = async () => {
    console.log("sign in 1 ");
    setVerifyError("");
    setLoading(true);
    const response = await api.post("/api/user/verify", {
      verificationId,
      verificationCode,
    });
    if (registered) {
      if (response.data === 200) {
        setUser({
          email: emailValue,
          phone: {
            recipient: phoneValue.recipient,
            countryCode: phoneValue.countryCode,
          },
          userId: verificationId,
          code: verificationCode,
        });
        const updatedUserData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        await new Promise((resolve) => setTimeout(resolve, 0));

        const orderResponse = await api.post("/api/auth-and-order", {
          orderServices: rest.ServiceSummary,
          comment: rest.desc,
          orderLocation: rest.location,
          firstName: "Registered User",
          lastName: "Registered User",
          orderDate: rest.date,
          orderTime: rest.time,
          phone: "+" + updatedUserData.phone.recipient,
          email: updatedUserData.email,
          verificationId: updatedUserData.userId,
          verificationCode: updatedUserData.code,
          registered,
        });
        if (orderResponse.data === 200) {
          const formValues: FormData = {
            firstName: firstName,
            lastName: lastName,
            email: emailValue,
            tel: {
              recipient: phoneValue.recipient,
              countryCode: phoneValue.countryCode,
            },
          };
          submitToHubSpot(formValues);
          setLoading(false);
          navigate.push(
            `/${currentLanguage}/services/booking-process/subservice/success`
          );
        } else {
          setLoading(false);
          navigate.push(
            `/${currentLanguage}/services/booking-process/subservice/error`
          );
        }
      } else {
        setLoading(false);
        setVerifyError(translations("Oops"));
      }
    } else {
      if (response.data === 200) {
        setUser({
          firstName,
          lastName,
          email: emailValue,
          phone: {
            recipient: phoneValue.recipient,
            countryCode: phoneValue.countryCode,
          },
          userId: verificationId,
          code: verificationCode,
        });
        setLoading(false);
        setNamesInputsOpen(true);
        setRequestModal(false);
      }
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

  const { submitToHubSpot } = useHubSpotFormService(
    "Varpet - register",
    "6b8a15a3-3ff5-4e02-848e-738b4c5c5720",
    translations("Subscribed successfully!"),
    translations("Failed_to_subscribe"),
    false
  );

  return (
    <Container>
      {loading && <MyLoading />}
      <Box>
        <OrderPreparation>
          <div>
            <StepForm />
            <Title>
              <h4>{translations("Sign up")}</h4>
              <p>{translations("Sign up to complete the booking process")}</p>
            </Title>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (_, { resetForm }) => {
                try {
                  resetForm();
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              }}
            >
              {({
                touched,
                errors,
                setFieldValue,
                setFieldTouched,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <SignUpInputs>
                    {namesInputsOpen ? (
                      <>
                        <InputContainer>
                          <InputLabel>{translations("First Name")}</InputLabel>
                          <NameInputWrapper>
                            <HiOutlineUser />
                            <Field
                              as={NameInput}
                              name="firstName"
                              value={firstName}
                              placeholder={translations("First Name")}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue("firstName", e.target.value);
                                setFirstName(e.target.value);
                              }}
                              onFocus={() => setIsFirstNameFocused(true)}
                              onBlur={() => {
                                setIsFirstNameFocused(false);
                                setFieldTouched("firstName", true);
                              }}
                              $isFocused={isFirstNameFocused}
                              className={
                                isFirstNameFocused
                                  ? "focused"
                                  : touched.firstName && errors.firstName
                                  ? "error"
                                  : ""
                              }
                            />
                          </NameInputWrapper>
                          {touched.firstName && errors.firstName && (
                            <ErrorLabel>{errors.firstName}</ErrorLabel>
                          )}
                        </InputContainer>
                        <InputContainer>
                          <InputLabel>{translations("Last Name")}</InputLabel>
                          <NameInputWrapper>
                            <HiOutlineUser />
                            <Field
                              as={NameInput}
                              name="lastName"
                              value={lastName}
                              placeholder={translations("Last Name")}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setFieldValue("lastName", e.target.value);
                                setLastName(e.target.value);
                              }}
                              onFocus={() => setIsLastNameFocused(true)}
                              onBlur={() => {
                                setIsLastNameFocused(false);
                                setFieldTouched("lastName", true);
                              }}
                              $isFocused={isLastNameFocused}
                              className={
                                isLastNameFocused
                                  ? "focused"
                                  : touched.lastName && errors.lastName
                                  ? "error"
                                  : ""
                              }
                            />
                          </NameInputWrapper>
                          {touched.lastName && errors.lastName && (
                            <ErrorLabel>{errors.lastName}</ErrorLabel>
                          )}
                        </InputContainer>
                      </>
                    ) : (
                      <>
                        <InputContainer>
                          <InputLabel>
                            {translations("Phone number")}
                          </InputLabel>
                          <PhoneInputWrapper $isFocused={isPhoneFocused}>
                            <Field
                              disabled={
                                verifiedUser.code || verifiedUser.userId
                              }
                              as={PhoneInput}
                              name="tel.recipient"
                              value={phoneValue.recipient}
                              country={phoneValue.countryCode}
                              onChange={(value: string, country: any) => {
                                setPhoneValue((prevState) => ({
                                  ...prevState,
                                  recipient: value,
                                  countryCode: country?.countryCode,
                                }));
                                setFieldValue("tel.recipient", value);
                              }}
                              onFocus={() => setIsPhoneFocused(true)}
                              onBlur={() => {
                                setIsPhoneFocused(false);
                                setFieldTouched("tel.recipient", true);
                              }}
                            />
                            <ErrorMessage
                              name="tel.recipient"
                              component={ErrorLabel}
                            />
                          </PhoneInputWrapper>
                        </InputContainer>
                        <InputContainer>
                          <InputLabel>{translations("Email")}</InputLabel>
                          <EmailInputWrapper>
                            <MdMailOutline />
                            <Field
                              disabled={verifiedUser.email}
                              as={EmailInput}
                              name="email"
                              placeholder="example@gmail.com"
                              type="email"
                              value={emailValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                setEmailValue(e.target.value);
                                setFieldValue("email", e.target.value);
                              }}
                              onFocus={() => setIsEmailFocused(true)}
                              onBlur={() => {
                                setIsEmailFocused(false);
                                setFieldTouched("email", true);
                              }}
                              $isFocused={isEmailFocused}
                              className={
                                isEmailFocused
                                  ? "focused"
                                  : touched.email && errors.email
                                  ? "error"
                                  : ""
                              }
                            />
                          </EmailInputWrapper>
                          {touched.email && errors.email && (
                            <ErrorLabel>{errors.email}</ErrorLabel>
                          )}
                        </InputContainer>
                      </>
                    )}
                  </SignUpInputs>
                  <Movement>
                    <PrevStep>
                      <MyButton
                        type="button"
                        $variant="secondary"
                        onClick={() => {
                          setUser({
                            email: "",
                            phone: {
                              recipient: "",
                              countryCode: "",
                            },
                            userId: "",
                            code: "",
                          });
                          navigate.back();
                        }}
                      >
                        <IoIosArrowRoundBack />
                        {translations("Back")}
                      </MyButton>
                    </PrevStep>
                    <NextStep>
                      <MyButton
                        style={
                          namesInputsOpen
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                        type="submit"
                        disabled={!firstName || !lastName}
                        onClick={handleRegister}
                      >
                        {translations("Complete")}
                        <IoIosArrowRoundForward />
                      </MyButton>
                      <MyButton
                        style={
                          !namesInputsOpen
                            ? { display: "flex" }
                            : { display: "none" }
                        }
                        type="submit"
                        disabled={
                          !errors.email && phoneValue.recipient.length < 10
                        }
                        onClick={
                          verifiedUser.code && verifiedUser.userId
                            ? handleRegister
                            : handleVerify
                        }
                      >
                        {translations("Complete")}
                        <IoIosArrowRoundForward />
                      </MyButton>
                    </NextStep>
                  </Movement>
                </Form>
              )}
            </Formik>
          </div>
        </OrderPreparation>
        <BookingDetails />
      </Box>
      {/* Verification Modal */}
      {requestModal && (
        <VerificationModal
          timer={timer}
          setTimer={setTimer}
          phoneValue={phoneValue}
          setRequestModal={setRequestModal}
          setVerificationCode={setVerificationCode}
          verificationCode={verificationCode}
          handleVerify={handleVerify}
          handleSignIn={handleSignIn}
          verifyError={verifyError}
          setVerifyError={setVerifyError}
          setVerificationCodeInterval={setVerificationCodeInterval}
          encodedKey={encodedKey}
        />
      )}
    </Container>
  );
};
export default PhoneMail;

const SignUpInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.divMargin.mobile};
  margin-bottom: ${proportions.textMargin.desktop};

  @media screen and (max-width: 481px) {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 481px) {
    input {
      width: 100%;
    }
  }
`;

const InputLabel = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
`;

const NameInputWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 26%;
    left: 11px;
    font-size: 20px;
    color: #0078db;
  }
`;

const NameInput = styled.input<{ $isFocused: boolean }>`
  width: 340px;
  padding: 10px 15px 10px 45px;
  font-size: 16px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 5px #e2dfdf;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 5px ${MyColors.primary};
    border-radius: 12px;
  }

  &::placeholder {
    color: #b2adb9;
  }

  color: ${(props) => (props.$isFocused ? "black" : "#b2adb9")};
  border: ${(props) =>
    props.$isFocused ? "1px solid transparent" : "1px solid #ccc"};
`;

const PhoneInputWrapper = styled.div<{ $isFocused: boolean }>`
  .react-tel-input {
    .form-control {
      width: 340px;
      padding: 20px 15px 20px 45px;
      font-size: 16px;
      border: 1px solid #ccc;
      outline: none;
      border-radius: 10px;
      box-shadow: 0 0 5px #e2dfdf;
      transition: 0.2s;

      &:hover {
        box-shadow: 0 0 5px ${MyColors.primary};
        border-radius: 12px;
      }

      &::placeholder {
        color: #b2adb9;
      }

      color: ${(props) => (props.$isFocused ? "black" : "#b2adb9")};
      border: ${(props) =>
        props.$isFocused ? "1px solid transparent" : "1px solid #ccc"};
    }

    .flag-dropdown {
      border: none;
      background-color: transparent;
      left: 0.5%;
      top: -3%;
      border-radius: 50%;
    }

    .selected-flag {
      width: 30px;

      &:hover {
        background-color: transparent;
      }
    }

    @media screen and (max-width: 481px) {
      .form-control {
        width: 100%;
      }
    }
  }
`;

const EmailInputWrapper = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 26%;
    left: 11px;
    font-size: 20px;
    color: #0078db;
  }
`;

const EmailInput = styled.input<{ $isFocused: boolean }>`
  width: 340px;
  padding: 10px 15px 10px 45px;
  font-size: 16px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 10px;
  box-shadow: 0 0 5px #e2dfdf;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 0 5px ${MyColors.primary};
    border-radius: 12px;
  }

  &::placeholder {
    color: #b2adb9;
  }

  color: ${(props) => (props.$isFocused ? "black" : "#b2adb9")};
  border: ${(props) =>
    props.$isFocused ? "1px solid transparent" : "1px solid #ccc"};
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;
