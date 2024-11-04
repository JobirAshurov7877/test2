import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { useSnapshot } from "valtio";
import { SubService } from "@/interfaces/subservice.interface";
import { MyButton } from "@/ui";
import { proportions } from "@/styles/proportions";
import Cookies from "js-cookie";
import { locationStore } from "@/valtio-store/locationStore";
import { useTranslations } from "next-intl";

interface PriceCardProps {
  ServiceSummary: SubService[] | null; // Update to reflect the correct structure
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const PriceCard: React.FC<PriceCardProps> = ({
  ServiceSummary,
  onUpdateQuantity,
}) => {
  const translations = useTranslations();
  const { currencySymbol } = useSnapshot(locationStore);
  const value = Cookies.get("currencySymbol");
  const initialQuantities: { [id: number]: number } = ServiceSummary
    ? ServiceSummary.reduce((quantities, service) => {
        quantities[service.id] = service.minOrderTime || 1;
        return quantities;
      }, {} as { [id: number]: number })
    : {};

  const [quantities, setQuantities] = useState(initialQuantities);

  const handleIncrement = (id: number) => {
    onUpdateQuantity(id, 1); // Increase quantity by 1
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1, // Ensure to default to 0 if undefined
    }));
  };

  const handleDecrement = (id: number) => {
    onUpdateQuantity(id, -1); // Decrease quantity by 1
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(
        (prevQuantities[id] || 0) - 1,
        (ServiceSummary &&
          ServiceSummary.find((service) => service.id === id)?.minOrderTime) ||
          0
      ), // Ensure to not go below minOrderTime
    }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (ServiceSummary) {
      ServiceSummary.forEach((service) => {
        const quantity = quantities[service.id] || service.minOrderTime;
        total += service.rateValue * quantity;
      });
    }
    return total;
  };

  return (
    <Container>
      <Box>
        <Card>
          {ServiceSummary &&
            ServiceSummary.map((service) => (
              <Item key={service.id}>
                <Price>
                  <Title style={{ fontWeight: 300 }}>{service.title}</Title>
                  <p style={{ width: "30", fontWeight: 300, textAlign: "end" }}>
                    <strong style={{ fontWeight: 500 }}>
                      {service.rateValue}
                    </strong>{" "}
                    {service.rateType
                      ? service.rateType.replace("%d", "")
                      : currencySymbol}
                  </p>
                </Price>
                <CountButton>
                  <MyButton
                    $variant="secondary"
                    onClick={() => handleDecrement(service.id)}
                    disabled={quantities[service.id] <= service.minOrderTime}
                  >
                    <HiOutlineMinus />
                  </MyButton>
                  <p>{quantities[service.id] || service.minOrderTime}</p>
                  <MyButton
                    $variant="secondary"
                    onClick={() => handleIncrement(service.id)}
                  >
                    <HiOutlinePlus />
                  </MyButton>
                </CountButton>
              </Item>
            ))}
          <Line />
          <Summary>
            <p style={{ fontWeight: "700" }}>{translations("Total")}</p>
            <p style={{ color: "#0078db", fontWeight: "900" }}>
              {calculateTotalPrice()} {value}
            </p>
          </Summary>
        </Card>
      </Box>
    </Container>
  );
};

export default PriceCard;

const Container = styled.div``;
const Box = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};
  width: 65%;
  margin: ${proportions.divMargin.desktop} 0;
  box-shadow: 0 0 5px #e2dfdf;
  padding: ${proportions.textMargin.desktop};

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 481px) {
    width: 100%;
  }
`;

const Item = styled.div`
  p {
    font-weight: 400;
  }
`;
const Price = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${proportions.divMargin.mobile};
  gap: ${proportions.divMargin.mobile};
  /* white-space: nowrap; */
`;

const Title = styled.p`
  width: 70%;
  font-size: 17px;
`;

const CountButton = styled.div`
  gap: ${proportions.divMargin.mobile};
  display: flex;
  align-items: center;

  button {
    display: flex;
    padding: 3px 5px;
    font-size: 20px;
  }

  p {
    margin: 0 10px;
    font-size: 16px;
  }
`;

const Line = styled.div`
  height: 2px;
  background-color: black;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
`;
