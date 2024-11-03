"use client";
import Image from "next/image";
import Link from "next/link";
import { proportions } from "@/styles/proportions";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import Logo from "@/assets/logo.svg";
import AppStore from "@/assets/app_store.svg";
import GooglePlay from "@/assets/google_play.svg";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { LuMailOpen } from "react-icons/lu";
import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { MyColors } from "@/styles/color";
import useHubSpotFormService from "./HubSpotFormService";
import NavigationLink from "./NavigationLink";

export default function Footer() {
  const t = useTranslations();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
  });
  const { submitToHubSpot } = useHubSpotFormService(
    "Varpet - footer",
    "ab26fa1b-4fda-4dba-b6c0-35bae630b096",
    t("Subscribed successfully!"),
    t("Failed to subscribe. Please try again"),
    true
  );
  const formik = useFormik({
    initialValues: {
      email: "",
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
    <MyFooter>
      <Box>
        <MyLogo>
          <Link href={"/"}>
            <Image src={Logo} alt="" />
          </Link>
          <p>{t("Download the app by clicking the link below")} :</p>
          <Store>
            <div>
              <a
                href="https://apps.apple.com/am/app/varpet/id1414315442"
                target="blank"
              >
                <Image src={AppStore} alt="app store" />
              </a>
            </div>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=com.varpet.app&pli=1"
                target="blank"
              >
                <Image src={GooglePlay} alt="google play" />
              </a>
            </div>
          </Store>
        </MyLogo>
        <MiddleBox>
          <Pages>
            <h6>{t("Pages")}</h6>
            <ul>
              <li>
                <NavigationLink href={"/about"}>
                  {t("Navbar.About")}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href={"/services"}>
                  {t("Navbar.Services")}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href={"/blog"}>
                  {t("Navbar.Blog")}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href={"/contact"}>
                  {t("Navbar.Contact")}{" "}
                </NavigationLink>
              </li>
            </ul>
          </Pages>
          <UsefulLinks>
            <h6>{t("Useful links")}</h6>
            <ul>
              <li>
                <NavigationLink href={`/privacy-policy`}>
                  {t("Privacy Policy")}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href={`/join-the-program`}>
                  {t("Terms and Conditions")}
                </NavigationLink>
              </li>
              <li>
                <NavigationLink href={`/press`}>{t("Press")}</NavigationLink>
              </li>
            </ul>
          </UsefulLinks>
        </MiddleBox>
        <Contacts>
          <h6>{t("Contacts")}</h6>
          <ul>
            <li>
              <FiPhone />
              <div>
                <a href={`tel:${"+374 96 999 944"}`}>{"+374 96 999 944"}</a>
              </div>
            </li>
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
              <LuMailOpen />
              <a href={`mailto:${"support@varpet.com"}`}>
                {"support@varpet.com"}
              </a>
            </li>
          </ul>
        </Contacts>
        <SocialMedia>
          <a href="https://www.facebook.com/VarpetArmenia" target="blank">
            <LiaFacebookF />
          </a>
          <a href="https://www.linkedin.com/company/varpet/" target="blank">
            <FaLinkedinIn />
          </a>
          <a href="https://www.instagram.com/varpetcom/" target="blank">
            <FaInstagram />
          </a>
        </SocialMedia>
      </Box>
      <EndPart>
        <div>
          <h2>
            {t("Subscribe to site updates, be the first to know all the news")}
          </h2>
          <p>
            © 2024 — {t("Varpet. All rights reserved. Powered by")}{" "}
            <a href="https://www.addevice.io/" target="blank">
              Addevice
            </a>
            .
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Form>
            <label>{t("Subscribe for mor interesting news")}</label>
            <Label>
              {formik.touched.email && formik.errors.email ? (
                <ErrorLabel>{formik.errors.email}</ErrorLabel>
              ) : (
                <span>{t("YOUR EMAIL")}</span>
              )}
            </Label>
            <StyledInput
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
              placeholder="example@gmail.com"
            />
            <StyledButton type="submit">
              <FaArrowRightLong />
            </StyledButton>
          </Form>
        </form>
      </EndPart>
    </MyFooter>
  );
}
const MyFooter = styled.footer`
  padding: ${proportions.screenPadding.desktop};

  background-image: linear-gradient(to right, #009dfe, #0078db);

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Box = styled.div`
  position: relative;
  padding: ${proportions.screenPadding.desktop};
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${proportions.divMargin.mobile};

  svg {
    color: #0078db;
    font-size: 22px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    padding: ${proportions.screenPadding.tablet};
  }

  @media screen and (max-width: 481px) {
    padding: ${proportions.screenPadding.mobile};
  }
`;

const MyLogo = styled.div`
  img {
    cursor: pointer;
  }
  p {
    font-weight: 400;
    margin: ${proportions.textMargin.desktop} 0;
  }

  @media screen and (max-width: 481px) {
    text-align: center;
    margin: 0 auto;
  }
`;
const Store = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};

  @media screen and (max-width: 481px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MiddleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Pages = styled.div`
  h6 {
    margin-bottom: ${proportions.textMargin.tablet};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.tablet};
    color: #656565;

    li {
      cursor: pointer;

      &:hover {
        color: #979797;
      }
    }
  }
`;

const UsefulLinks = styled.div`
  h6 {
    margin-bottom: ${proportions.textMargin.tablet};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.tablet};
    color: #656565;

    li {
      cursor: pointer;

      &:hover {
        color: #979797;
      }
    }
  }
`;

const Contacts = styled.div`
  margin-bottom: 40px;

  h6 {
    margin-bottom: ${proportions.textMargin.tablet};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.tablet};

    li {
      display: flex;
      gap: ${proportions.textMargin.tablet};
      color: #656565;
      cursor: pointer;

      &:hover {
        color: #979797;
      }
    }
  }

  @media screen and (max-width: 481px) {
  }
`;

const SocialMedia = styled.div`
  position: absolute;
  bottom: ${proportions.textMargin.desktop};
  right: ${proportions.textMargin.desktop};
  display: flex;
  gap: ${proportions.textMargin.desktop};

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0078db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 3px #0078db;
    }

    @media screen and (max-width: 768px) {
      width: 30px;
      height: 30px;
      padding: 6px;
    }
  }

  @media screen and (max-width: 768px) {
    bottom: ${proportions.textMargin.tablet};
    right: ${proportions.textMargin.tablet};
  }
`;

const EndPart = styled.div`
  margin-top: ${proportions.divMargin.desktop};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: underline;

    &:hover {
      opacity: 0.7;
    }
  }

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.tablet};

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  form {
    position: relative;
    width: 50%;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: ${proportions.divMargin.mobile};
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }

  @media screen and (max-width: 481px) {
    h2 {
      word-break: break-word;
    }
  }
`;

const StyledInput = styled.input`
  position: relative;
  border: 1px solid white;
  outline: none;
  background-color: transparent;
  color: white;
  padding: 35px 20px 15px 20px;
  border-radius: 10px;
  width: 100%;
  transition: 0.2s;

  &:-webkit-autofill {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px ${MyColors.primary} inset;
  }

  &:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px ${MyColors.primary} inset;
  }

  &::placeholder {
    color: white;
    transition: 0.2s;
    font-size: 15px;
  }

  &:focus {
    border-radius: 15px;
    box-shadow: 0 0 5px white;
    transform: scale(1.01);
  }
`;

const Form = styled.div`
  position: relative;
  width: 100%;
  float: right;

  @media screen and (max-width: 1024px) {
    float: left;
  }
`;

const StyledButton = styled.button`
  border: none;
  position: absolute;
  font-size: 22px;
  background-color: transparent;
  right: 10px;
  bottom: 19px;
  color: white;
  z-index: 9999;
  cursor: pointer;
`;

const Label = styled.label`
  position: absolute;
  font-size: 12px;
  bottom: 38px;
  left: 20px;
  opacity: 70%;
  width: 100%;
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 13px;
`;
