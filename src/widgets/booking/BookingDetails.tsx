import { proportions } from "@/styles/proportions";
import Logo from "@/assets/BigLogo.svg";
import { FiCheck } from "react-icons/fi";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import Image from "next/image";
// import { userFormDataStore } from "@/valtio-store/bookStore";

const BookingDetails = () => {
  const translations = useTranslations();

  return (
    <Wrapper>
      <DownloadApp>
        <Header>
          <Image src={Logo} alt="logo" width={80} height={80} />
          <h6>
            {translations("Download")}
            <a
              href="https://play.google.com/store/apps/details?id=com.varpet.app&pli=1"
              target="blank"
            >
              Varpet app{" "}
            </a>
            {translations(
              "today and experience the future of home services firsthand"
            )}
            !
          </h6>
        </Header>
        <Main>
          <ul>
            <li>
              <FiCheck />
              {translations("Quick and easy booking process")}
            </li>
            <li>
              <FiCheck />
              {translations("Trusted professionals")}
            </li>
            <li>
              <FiCheck />
              {translations("Progress tracking in real-time")}
            </li>
            <li>
              <FiCheck />
              {translations("Secure and hassle-free payments")}
            </li>
          </ul>
        </Main>
      </DownloadApp>
    </Wrapper>
  );
};

export default BookingDetails;

const Wrapper = styled.div`
  width: 36%;

  @media screen and (max-width: 1300px) {
    display: none;
  }
`;

// const BookingDetailsBox = styled.div`
//   box-shadow: 0 0 5px #e2dfdf;
//   border-radius: 10px;
//   padding: ${proportions.textMargin.desktop};
// `;

// const ServiceTitle = styled.div`
//   p {
//     color: #767676;
//   }
//   div {
//     margin: ${proportions.textMargin.tablet} 0;
//     display: flex;
//     justify-content: space-between;
//     gap: ${proportions.textMargin.desktop};
//   }
// `;

const DownloadApp = styled.div`
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 10px;
  /* margin-top: ${proportions.divMargin.desktop}; */
  padding: ${proportions.textMargin.desktop};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${proportions.textMargin.desktop};

  a {
    color: #007fe1;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${proportions.textMargin.desktop};

  ul {
    display: flex;
    flex-direction: column;
    margin-top: ${proportions.textMargin.desktop};
    gap: ${proportions.textMargin.tablet};
    li {
      display: flex;
      align-items: start;
      gap: ${proportions.textMargin.mobile};
      font-size: 16px;
      svg {
        transform: translateY(4px);
        color: #0078db;
      }
    }
  }
`;
