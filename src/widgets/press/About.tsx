import styled from "styled-components";
import { proportions } from "@/styles/proportions";
import Mission from "@/assets/press/mission.svg";
import Vision from "@/assets/press/vision.svg";
import Value from "@/assets/press/value.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SubServiceSummary = () => {
  const t = useTranslations();

  return (
    <Container>
      <h3>{t("About us")}</h3>
      <Box>
        <div>
          <Image src={Mission} alt="mission" />
          <h5>{t("Our mission")}</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            aperiam commodi sequi cumque aliquam deleniti odit corporis
            praesentium quod molestias, quam, ex recusandae adipisci
            voluptatibus! Dolorum, sequi? Dolorem, exercitationem incidunt?
          </p>
        </div>
        <div>
          <Image src={Vision} alt="vision" />
          <h5>{t("Our vision")}</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            aperiam commodi sequi cumque aliquam deleniti odit corporis
            praesentium quod molestias, quam, ex recusandae adipisci
            voluptatibus! Dolorum, sequi? Dolorem, exercitationem incidunt?
          </p>
        </div>
        <div>
          <Image src={Value} alt="value" />
          <h5>{t("Our value")}</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            aperiam commodi sequi cumque aliquam deleniti odit corporis
            praesentium quod molestias, quam, ex recusandae adipisci
            voluptatibus! Dolorum, sequi? Dolorem, exercitationem incidunt?
          </p>
        </div>
      </Box>
    </Container>
  );
};

export default SubServiceSummary;

const Container = styled.section`
  width: 100%;
  background-color: #f9f9fa;
  padding: ${proportions.divMargin.desktop} 0;

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet} 0;
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile} 0;
  }

  h3 {
    text-align: center;
    margin-bottom: ${proportions.divMargin.desktop};

    @media screen and (max-width: 768px) {
      margin-bottom: ${proportions.divMargin.tablet};
    }
    @media screen and (max-width: 481px) {
      margin-bottom: ${proportions.divMargin.mobile};
    }
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: ${proportions.divMargin.desktop};
  text-align: center;
  max-width: ${proportions.bodyMaxWidth};
  flex-wrap: wrap;
  padding: ${proportions.screenPadding.desktop};

  div {
    width: 30%;
    img {
      height: 100px;
    }

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  h5 {
    margin: ${proportions.textMargin.desktop} 0;
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;
