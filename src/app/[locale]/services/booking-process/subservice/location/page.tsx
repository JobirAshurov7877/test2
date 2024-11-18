"use client";
import {
  Container,
  Box,
  OrderPreparation,
  Movement,
  NextStep,
  PrevStep,
  Title,
} from "@/styles/booking-service";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styled from "styled-components";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MyButton } from "@/ui";
import MyLocationLoader from "@/ui/mylocation-loader/MyLocationLoader";
import { MyColors } from "@/styles/color";
import { proportions } from "@/styles/proportions";

const OrderLocation = () => {
  const navigate = useRouter();
  const translations = useTranslations();
  const currentLanguage = useLocale();

  const [orderDate, setOrderDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const [orderTime, setOrderTime] = useState(() => {
    const today = new Date();
    const minutes = today.getMinutes();
    if (minutes > 0) {
      today.setHours(today.getHours() + 2);
      today.setMinutes(0);
    }
    const hours = String(today.getHours()).padStart(2, "0");
    const mins = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${mins}`;
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string | undefined;
  } | null>(null);

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null); // Xarita referensi
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.error("Place not found or has no geometry");
        return;
      }

      const selected = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      };

      setMarkerPosition({ lat: selected.lat, lng: selected.lng });
      setSelectedLocation(selected);

      // Xarita markerni ko'rsatish uchun markazga o'tadi va zoom qiladi
      if (mapRef) {
        mapRef.setCenter(selected);
        mapRef.setZoom(15); // Zoom darajasi
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const handleFormSend = () => {
    if (
      selectedLocation &&
      selectedLocation.lat !== undefined &&
      selectedLocation.lng !== undefined
    ) {
      // Formani yuborish jarayoni
      console.log("Location Selected:", selectedLocation);
      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/sign-up`
      );
    } else {
      console.error("Missing or invalid location data for form submission.");
    }
  };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: true,
  };

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <Title>
            <h4>{translations("Location")}</h4>
          </Title>
          <Wrapper>
            <DateTimeInputs>
              <DateInputContainer>
                <p>{translations("Service date")}</p>
                <DateInput
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </DateInputContainer>
              <TimeInputContainer>
                <p>{translations("Service time")}</p>
                <TimeInput
                  type="time"
                  value={orderTime}
                  onChange={(e) => setOrderTime(e.target.value)}
                />
              </TimeInputContainer>
            </DateTimeInputs>
            <LoadScript
              googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
              libraries={["places"]}
              loadingElement={
                <LoadingContainer>
                  <MyLocationLoader />
                </LoadingContainer>
              }
            >
              <GoogleMap
                options={mapOptions}
                mapContainerStyle={{
                  width: "100%",
                  height: "250px",
                }}
                center={{ lat: 41.2995, lng: 69.2401 }} // Default center (Tashkent)
                zoom={11}
                onLoad={onMapLoad}
              >
                {markerPosition && (
                  <Marker
                    position={{
                      lat: markerPosition.lat,
                      lng: markerPosition.lng,
                    }}
                  />
                )}
              </GoogleMap>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <GoogleSearchInput>
                  <input
                    type="text"
                    placeholder={
                      selectedLocation?.address ||
                      translations("Search Address")
                    }
                  />
                </GoogleSearchInput>
              </Autocomplete>
            </LoadScript>
          </Wrapper>
          <Movement>
            <PrevStep>
              <MyButton $variant="secondary" onClick={() => navigate.back()}>
                <IoIosArrowRoundBack />
                {translations("Back")}
              </MyButton>
            </PrevStep>
            <NextStep>
              <MyButton
                disabled={!orderDate || !orderTime || !selectedLocation}
                onClick={handleFormSend}
              >
                {translations("Next")}
                <IoIosArrowRoundForward />
              </MyButton>
            </NextStep>
          </Movement>
        </OrderPreparation>
      </Box>
    </Container>
  );
};

export default OrderLocation;

const Wrapper = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 10px 15px;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 10px;
    box-shadow: 0 0 5px #e2dfdf;
    border: 1px solid #ccc;

    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 5px ${MyColors.primary};
      border-radius: 12px;
      border: 1px solid transparent;
    }

    &::placeholder {
    }
  }
`;
const DateTimeInputs = styled.div`
  width: 100%;
  display: flex;
  gap: ${proportions.divMargin.desktop};
  margin-bottom: ${proportions.textMargin.desktop};

  div {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: ${proportions.textMargin.tablet};

    @media screen and (max-width: 615px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 615px) {
    flex-direction: column;
    gap: ${proportions.divMargin.mobile};
  }
`;

const DateInputContainer = styled.div`
  position: relative;
  input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
    width: auto;
  }
`;

const DateInput = styled.input`
  cursor: pointer;
`;

const TimeInputContainer = styled.div`
  position: relative;
  input[type="time"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
    width: auto;
  }
`;

const TimeInput = styled.input`
  cursor: pointer;
`;

const GoogleSearchInput = styled.div`
  text-align: center;

  input {
    width: 50%;
    margin-top: 20px;

    @media screen and (max-width: 768px) {
      width: 80%;
    }

    @media screen and (max-width: 481px) {
      width: 100%;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  div {
    margin-top: 20px;
  }
`;
