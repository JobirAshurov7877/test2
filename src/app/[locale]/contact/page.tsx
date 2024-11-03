"use client";
import { moveBlue, moveOrange } from "@/animations/circleAnimations";
import { MyColors } from "@/styles/color";
import { proportions } from "@/styles/proportions";
import { MyButton, MyInput } from "@/ui";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { LiaFacebookF } from "react-icons/lia";
import { LuMailOpen } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import IOS from "@/assets/home/app-store.svg";
import ANDROID from "@/assets/home/google-store.svg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useHubSpotFormService from "@/components/HubSpotFormService";
import { useTranslations } from "next-intl";
import { ExploreServices } from "@/components";

const Contact = () => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    {
      value: t("I am customer"),
      label: t("I am customer"),
    },
    { value: t("I am master"), label: t("I am master") },
    {
      value: t("Become a partner"),
      label: t("Become a partner"),
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("Name is required")),
    email: Yup.string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
    phone: Yup.string()
      .matches(/^[0-9]+$/, t("Phone number must contain only digits"))
      .required(t("Phone number is required")),
    subject: Yup.string(),
    message: Yup.string().required(t("Message is required")),
  });

  const { submitToHubSpot } = useHubSpotFormService(
    "Varpet - contact",
    "f407359f-2bc6-47e5-8fa3-d0f4f2b921ee",
    t("Your message has been sent!"),
    t("Failed to submit form . Please try again"),
    true
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitToHubSpot(values);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
      }
    },
  });

  return (
    <>
      <Container>
        <CircleBlue />
        <CircleOrange />
        <CircleBlueSecond />
        <CircleOrangeSecond />
        <Box>
          <Form>
            <h4>{t("Contact")}</h4>
            <Info>
              <ContactUs>
                <h5>{t("Contact us")}</h5>
                <ul>
                  <li>
                    <SlLocationPin />
                    <a
                      href="https://maps.app.goo.gl/f8zbBycaz6vnPxMo8"
                      target="blank"
                    >
                      Yerevan, RA
                      <br />
                      Str. Komitas 59/9, 2nd floor
                    </a>
                  </li>
                  <li>
                    <FiPhone />
                    <a href={`tel:${"+374 96 999 944"}`}>{"+374 96 999 944"}</a>
                  </li>
                  <li>
                    <LuMailOpen />
                    <a href={`mailto:${"support@varpet.com"}`}>
                      {"support@varpet.com"}
                    </a>
                  </li>
                </ul>
                <SocialMedia>
                  <a
                    href="https://www.facebook.com/VarpetArmenia"
                    target="blank"
                  >
                    <LiaFacebookF />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/varpet/"
                    target="blank"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a href="https://www.instagram.com/varpetcom/" target="blank">
                    <FaInstagram />
                  </a>
                </SocialMedia>
              </ContactUs>
              <form onSubmit={formik.handleSubmit}>
                <h5>{t("Write to us")}</h5>
                <SelectPurpose>
                  <div>
                    <div>
                      <label>
                        {t("Select")}
                        <span> *</span>
                      </label>
                    </div>
                    <DropdownContainer>
                      <DropdownHeader onClick={toggleDropdown}>
                        {selectedValue || t("Select a purpose")}
                        <DropdownIcon>
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </DropdownIcon>
                      </DropdownHeader>
                      <DropdownList $isOpen={isOpen}>
                        {options.map((option) => (
                          <DropdownItem
                            key={option.value}
                            onClick={() => handleOptionClick(option.value)}
                          >
                            {option.label}
                          </DropdownItem>
                        ))}
                      </DropdownList>
                    </DropdownContainer>
                  </div>
                </SelectPurpose>
                {selectedValue === "" ||
                selectedValue === t("Become a partner") ? (
                  <>
                    <div>
                      <div>
                        <label htmlFor="name">
                          {" "}
                          {t("Name")}
                          <span> *</span>
                        </label>
                        <MyInput
                          id="name"
                          name="name"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                          className={
                            formik.touched.name && formik.errors.name
                              ? "error"
                              : ""
                          }
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <ErrorLabel>{formik.errors.name}</ErrorLabel>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="email">
                          {t("Email address")}
                          <span> *</span>
                        </label>
                        <MyInput
                          id="email"
                          name="email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          className={
                            formik.touched.email && formik.errors.email
                              ? "error"
                              : ""
                          }
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <ErrorLabel>{formik.errors.email}</ErrorLabel>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="phone">
                          {t("Phone")}
                          <span> *</span>
                        </label>
                        <MyInput
                          id="phone"
                          name="phone"
                          type="tel"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          className={
                            formik.touched.phone && formik.errors.phone
                              ? "error"
                              : ""
                          }
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                          <ErrorLabel>{formik.errors.phone}</ErrorLabel>
                        ) : null}
                      </div>
                      <div>
                        <label htmlFor="subject">{t("Subject")}</label>
                        <MyInput
                          id="subject"
                          name="subject"
                          type="text"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.subject}
                          className={
                            formik.touched.subject && formik.errors.subject
                              ? "error"
                              : ""
                          }
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                          <ErrorLabel>{formik.errors.subject}</ErrorLabel>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="message">
                          {t("Message")}
                          <span> *</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          className={
                            formik.touched.message && formik.errors.message
                              ? "error"
                              : ""
                          }
                        ></textarea>
                        {formik.touched.message && formik.errors.message ? (
                          <ErrorLabel>{formik.errors.message}</ErrorLabel>
                        ) : null}
                      </div>
                    </div>
                    <div style={{ justifyContent: "flex-end" }}>
                      <MyButton
                        type="submit"
                        disabled={
                          !formik.isValid ||
                          !formik.dirty ||
                          selectedValue === ""
                        }
                      >
                        {t("Send")}
                      </MyButton>
                    </div>
                  </>
                ) : selectedValue === t("I am customer") ? (
                  <DownloadButtons>
                    {t("Customer app")}
                    <div>
                      <a
                        href="https://apps.apple.com/am/app/varpet/id1414315442"
                        target="blank"
                      >
                        <img src={IOS} alt="" />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.varpet.app&pli=1"
                        target="blank"
                      >
                        <img src={ANDROID} alt="" />
                      </a>
                    </div>
                  </DownloadButtons>
                ) : (
                  <DownloadButtons>
                    {t("Master app")}
                    <div>
                      <a
                        href="https://apps.apple.com/am/app/varpet-partner/id1441873914"
                        target="blank"
                      >
                        <img src={IOS} alt="" />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.varpet.master&pcampaignid=web_share"
                        target="blank"
                      >
                        <img src={ANDROID} alt="" />
                      </a>
                    </div>
                  </DownloadButtons>
                )}
              </form>
            </Info>
          </Form>
        </Box>
        <Map>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.173377401402!2d44.52052866192365!3d40.20520611804318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x646f89915d198e49!2zRUQgQWNjb3VudGFudCDVgNWh1bfVvtWh1brVodWw1aHVr9Wh1bYg1aPWgNWh1b3VpdW21bXVodWv!5e0!3m2!1sru!2s!4v1594199721992!5m2!1sru!2s"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </Map>
        <ExploreServices />
      </Container>
    </>
  );
};

export default Contact;

const Container = styled.section`
  width: 100%;
`;

const Box = styled.div`
  margin: 0 auto;
  max-width: ${proportions.bodyMaxWidth};
  gap: ${proportions.divMargin.tablet};
  padding: 0 ${proportions.divMargin.desktop};
  transform: translateY(50px);
  margin-bottom: -50px;

  @media screen and (max-width: 1300px) {
    margin: ${proportions.divMargin.desktop} auto;
  }

  @media screen and (max-width: 950px) {
    padding: 0;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.mobile};
    margin: 0 auto;
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
  }
`;

const Form = styled.div`
  h4 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 68%;
    flex: 0 0 68%;
    padding: 60px 40px;
    gap: ${proportions.textMargin.desktop};

    @media screen and (max-width: 950px) {
      width: 100%;
      padding: 40px 20px;

      button {
        padding: 13px 25px;
      }
    }

    > div {
      display: flex;
      gap: ${proportions.textMargin.desktop};

      @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-end;
      }

      > div {
        display: flex;
        flex-direction: column;
        gap: ${proportions.textMargin.desktop};
        width: 100%;
      }
    }
  }
`;

const SelectPurpose = styled.div``;

const Info = styled.div`
  display: flex;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  box-shadow: 0 0 15px #f0f0f1;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }

  label {
    font-size: 14px;
  }

  span {
    color: ${MyColors.error};
  }

  textarea {
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0 0 8px #f0f0f1;
    transition: 0.1s;
    resize: none;

    &:hover {
      box-shadow: 0 0 5px ${MyColors.primary};
      border-radius: 7px;
      transform: scale(1.01);
    }

    &::placeholder {
      font-size: 14px;
      color: ${MyColors.secondary};
    }
  }
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 13px;
`;

const ContactUs = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.divMargin.tablet};
  background: linear-gradient(90deg, #20a8fe, #0178db), #1ca1f9;
  width: 32%;
  flex: 0 0 32%;
  padding: 60px 40px;
  color: #fff;

  @media screen and (max-width: 950px) {
    width: 100%;
    gap: ${proportions.divMargin.mobile};
    padding: 40px 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: ${proportions.divMargin.tablet};

    @media screen and (max-width: 950px) {
      gap: ${proportions.divMargin.mobile};
    }
  }

  ul li {
    display: flex;
    align-items: center;
    gap: ${proportions.textMargin.tablet};
    transition: 0.1s;
    svg {
      font-size: 20px;
    }

    &:hover {
      color: #e1e1e1;
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 6px #fff;
    }
  }
`;

const Map = styled.div`
  width: 100%;
  height: 550px;
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 40%;
  box-shadow: 0 0 15px #f0f0f1;
  border-radius: 5px;

  .open {
    .DropdownList {
      max-height: 200px;
    }
  }

  &:hover {
    box-shadow: 0 0 5px ${MyColors.primary};
    border-radius: 7px;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const DropdownHeader = styled.div`
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownIcon = styled.div`
  font-size: 16px;
  transform: translateY(2px);
`;

const DropdownList = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  overflow: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 15px #f0f0f1;
  z-index: 1;
  transition: max-height 0.3s ease;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const DownloadButtons = styled.div`
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    align-items: start !important;
  }
  > div {
    flex-direction: row !important;

    @media screen and (max-width: 700px) {
      justify-content: space-between;
    }

    @media screen and (max-width: 400px) {
      img {
        width: 130px;
      }
    }

    @media screen and (max-width: 320px) {
      img {
        width: 110px;
      }
    }
  }
`;

const CircleBlue = styled.div`
  position: absolute;
  top: 30%;
  left: 10%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    left: 10%;
    top: 50%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrange = styled.div`
  position: absolute;
  top: 15%;
  left: 20%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    left: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleBlueSecond = styled.div`
  position: absolute;
  top: 15%;
  right: 20%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #0078db;
  animation: ${moveBlue} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    top: 50%;
    right: 10%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const CircleOrangeSecond = styled.div`
  position: absolute;
  top: 30%;
  right: 15%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4d4d;
  animation: ${moveOrange} 20s ease-in-out infinite alternate-reverse;

  @media screen and (max-width: 1328px) {
    right: 15%;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
