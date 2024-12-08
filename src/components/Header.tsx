"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import styled from "styled-components";
import { MyColors } from "@/styles/color";
import { proportions } from "@/styles/proportions";
import Image from "next/image";
import languages from "@/data/languages";
import { MyDownloadButton, MyHamburger } from "@/ui";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Logo from "@/assets/logo.svg";
import AppStore from "@/assets/app_store.svg";
import GooglePlay from "@/assets/google_play.svg";
import { usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import NavigationLink from "./NavigationLink";
import { initializeUserInfo } from "@/services/getUserData";
import Cookies from "js-cookie";
import { resetUserFormData } from "@/valtio-store/bookStore";
import { clearUserDataIfNeeded } from "@/helper/appCurrentVersion";

interface HeaderProps {
  language: string;
}
export default function Header({ language: currentLang }: HeaderProps) {
  const t = useTranslations("");
  const urlParts =
    typeof location !== "undefined" && location?.pathname
      ? location.pathname.split("/")
      : [];
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageDropdownRef = useRef(null);
  const router = useRouter();
  const [_isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !(languageDropdownRef.current as any).contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  function changeLanguage(lang: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale: lang }
      );
    });
  }
  const toggleLanguageDropdown = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsMobileNavOpen(false);
  };
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    setIsLanguageOpen(false);
  };
  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  let urlCode = urlParts[1];
  if (urlCode === "hy") {
    urlCode = "am";
  }

  Cookies.set("countryCode", urlCode, { expires: 365 });
  useEffect(() => {
    if (!location.pathname.includes("/services/booking-process/")) {
      resetUserFormData();
    }
  }, [location.pathname]);
  useEffect(() => {
    const initializeApp = async () => {
      try {
        clearUserDataIfNeeded();
        const countryCode = await initializeUserInfo();
        changeLanguage(countryCode);
      } catch (error) {
        changeLanguage("en");
      }
    };
    initializeApp();
  }, []);

  return (
    <Container>
      <Box $isOpen={isMobileNavOpen || isLanguageOpen}>
        <LogoContainer>
          <NavigationLink href={`/`} prefetch={false}>
            <Image src={Logo} alt="varpet-logo" priority />
          </NavigationLink>
        </LogoContainer>
        <Nav>
          <Ul>
            <Li>
              <NavigationLink href={`/about`} rel=" noopener noreferrer">
                {t("About")}
              </NavigationLink>
            </Li>
            <Li>
              <NavigationLink href={`/services`} rel=" noopener noreferrer">
                {t("Services")}
              </NavigationLink>
            </Li>
            <Li>
              <NavigationLink href={`/blog`} rel=" noopener noreferrer">
                {t("Blog")}
              </NavigationLink>
            </Li>
            <Li>
              <NavigationLink href={`/contact`} rel=" noopener noreferrer">
                {t("Contact")}
              </NavigationLink>
            </Li>
          </Ul>
        </Nav>
        <LanguagesParent>
          <Languages>
            <li ref={languageDropdownRef} onClick={toggleLanguageDropdown}>
              <Image src={currentLanguage?.image} alt="Language" />
              {isLanguageOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              <LanguagesContainer $isOpen={isLanguageOpen}>
                {isLanguageOpen && (
                  <SwitchLanguage>
                    {languages
                      .filter((language) => language.name !== currentLang)
                      .map((language, index) => (
                        <div
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                          key={index}
                          onClick={() => changeLanguage(language.code)}
                        >
                          <Image src={language.image} alt="Language" />
                          {language.name}
                        </div>
                      ))}
                  </SwitchLanguage>
                )}
              </LanguagesContainer>
            </li>
            <MyHamburger checked={isMobileNavOpen} onClick={toggleMobileNav} />
          </Languages>
          <DownloadButton>
            <MyDownloadButton />
          </DownloadButton>
        </LanguagesParent>
        <MobileNavContainer $isOpen={isMobileNavOpen}>
          <MobileNav>
            <ul>
              <Line />
              <li onClick={toggleMobileNav}>
                <NavigationLink prefetch href={`/about`}>
                  {t("About")}
                </NavigationLink>
              </li>
              <Line />
              <li onClick={toggleMobileNav}>
                <NavigationLink prefetch href={`/services`}>
                  {t("Services")}
                </NavigationLink>
              </li>
              <Line />
              <li onClick={toggleMobileNav}>
                <NavigationLink href={`/blog`}>{t("Blog")}</NavigationLink>
              </li>
              <Line />
              <li onClick={toggleMobileNav}>
                <NavigationLink href={`/contact`}>
                  {t("Contact")}
                </NavigationLink>
              </li>
              <Line />
            </ul>
            <Store>
              <div>
                <a
                  href="https://varpet.onelink.me/px3l/jc3yinnx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={AppStore} alt="App Store" />
                </a>
              </div>
              <GooglePlayIcon>
                <a
                  href="https://varpet.onelink.me/px3l/jc3yinnx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={GooglePlay} alt="Google Play" />
                </a>
              </GooglePlayIcon>
            </Store>
          </MobileNav>
        </MobileNavContainer>
      </Box>
    </Container>
  );
}
const Container = styled.header`
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #f9f9fa;
`;

const Box = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1469px;
  margin: 0 auto;
  padding: 24px 15px;
  overflow: ${(props) => (props.$isOpen ? "visible" : "hidden")};

  @media screen and (max-width: 1024px) {
    padding: 24px 0px 24px 15px;
  }

  @media screen and (max-width: 481px) {
    padding: 14px 0px 11px 15px;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;

  @media screen and (max-width: 481px) {
    img {
      width: 104px;
      height: 30px;
    }
  }
`;

const LanguagesParent = styled.div`
  display: flex;
  align-items: center;
  z-index: 9998;
`;

const Languages = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  transform: translateX(-30px);

  img {
    width: 18px;
    height: 18px;
  }

  li {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  svg {
    font-size: 15px;
    color: #b2aeb9;
    transform: translateX(7px);
  }

  @media screen and (max-width: 1024px) {
    transform: translateX(-20px);
    gap: 10px;
  }
`;

const LanguagesContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 40px;
  left: -20px;
  height: ${(props) => (props.$isOpen ? "200px" : "0")};
  overflow: hidden;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.2s;
`;

const SwitchLanguage = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};
  padding: 10px 23px 6px 23px;
  background-color: white;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 8px;

  a {
    display: flex;
    align-items: center;
    gap: ${proportions.textMargin.tablet};
  }
`;

const DownloadButton = styled.div`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const Li = styled.li<{ $active?: boolean }>`
  position: relative;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  text-align: center;
  color: ${(props) => (props.$active ? `${MyColors.primary}` : "black")};

  &:hover {
    color: ${MyColors.primary};
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    height: 2px;
    background-color: ${(props) =>
      props.$active ? `${MyColors.primary}` : "transparent"};
    width: 0;
    transition: width 0.3s ease;
  }

  &::before {
    left: 50%;
    transform: translateX(-50%);
  }

  &::after {
    right: 50%;
    transform: translateX(50%);
  }

  ${(props) =>
    props.$active &&
    `
    &::before,
    &::after {
      width: calc(100% - 40px);
    }
  `}

  &:hover::before,
  &:hover::after {
    width: calc(100% - 40px);
  }

  a {
    font-size: 15px;
  }
`;

const MobileNavContainer = styled.div<{ $isOpen: boolean }>`
  display: none;
  transition: 0.2s;

  @media screen and (max-width: 1024px) {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 80px;
    width: 100%;
    height: ${(props) => (props.$isOpen ? "60%" : "0")};
    overflow: hidden;
    z-index: 9999;

    @media screen and (max-width: 481px) {
      top: 60px;
    }
  }
`;

const MobileNav = styled.div`
  background-color: white;
  padding: 0 ${proportions.screenPadding.mobile};
  box-shadow: -1px 4px 10px rgba(150, 144, 156, 0.15);
  z-index: 999;

  ul {
    display: block;
    justify-content: space-between;
    list-style: none;
    li {
      cursor: pointer;
      transition: color 0.2s ease;

      a {
        padding: 16px 0;
        display: inline-block;
        width: 100%;
      }

      &:hover {
        color: ${MyColors.primary};
      }
    }
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 481px) {
    padding: 0 ${proportions.screenPadding.mobile};
  }
`;

const Store = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    gap: ${proportions.textMargin.tablet};
    justify-content: center;
    margin: ${proportions.divMargin.mobile} 0;
  }
`;

const GooglePlayIcon = styled.div`
  margin-bottom: 20px;
  @media screen and (max-width: 481px) {
  }
`;

const Line = styled.div`
  background-color: #aaaaaa;
  opacity: 15%;
  height: 1px;
`;
