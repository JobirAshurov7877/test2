import styled from "styled-components";
import HappyCustomers from "@/assets/happy_costumers.svg";
import FlexibleScheduling from "@/assets/flexible_scheduling.svg";
import QualifiedExperts from "@/assets/qualified_experts.svg";
import { proportions } from "@/styles/proportions";
import { languageStore } from "@/valtio-store/languageStore";
import { useSnapshot } from "valtio";

const SubServiceSummary = () => {
  const { translations } = useSnapshot(languageStore);

  return (
    <Container>
      <Box>
        <div>
          <img src={HappyCustomers} alt="" />
          <h4>{translations["Happy customers"]}</h4>
          <p>
            {
              translations[
                "Over 70,000 satisfied customers who have experienced the convenience and reliability of our services."
              ]
            }
          </p>
        </div>
        <div>
          <img src={FlexibleScheduling} alt="" />
          <h4>{translations["Flexible scheduling"]}</h4>
          <p>
            {
              translations[
                "With 24/7 availability, you can schedule appointments and reach out to our support team anytime, anywhere."
              ]
            }
          </p>
        </div>
        <div>
          <img src={QualifiedExperts} alt="" />
          <h4>{translations["Qualified experts"]}</h4>
          <p>
            {
              translations[
                "Your home is in capable hands with our team of qualified experts. Trust in our team to deliver exceptional service"
              ]
            }
          </p>
        </div>
      </Box>
    </Container>
  );
};

export default SubServiceSummary;

const Container = styled.section`
  width: 100%;
  padding: ${proportions.divMargin.desktop} 0;

  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet} 0;
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile} 0;
  }
`;
const Box = styled.div`
  display: flex;
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

  p {
    font-weight: 300;
  }

  h4 {
    margin: ${proportions.textMargin.desktop} 0;
    font-weight: 800;
    white-space: nowrap;

    @media screen and (max-width: 1100px) {
      white-space: normal;
    }
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
