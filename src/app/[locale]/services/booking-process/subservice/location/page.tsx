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

import { store } from "@/valtio-store/store";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useSnapshot } from "valtio";
import { locationStore } from "@/valtio-store/locationStore";
import { setFormDataItem } from "@/valtio-store/bookStore";
import { MyColors } from "@/styles/color";
import { userFormDataStore } from "@/valtio-store/bookStore";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { setUser, userStore } from "@/valtio-store/userStore";
import StepForm from "@/widgets/booking/StepForm";
import BookingDetails from "@/widgets/booking/BookingDetails";
import { MyButton } from "@/ui";
import MyLocationLoader from "@/ui/mylocation-loader/MyLocationLoader";

const OrderLocation = () => {
  store.bookingFormStep = 3;
  const navigate = useRouter();
  const [orderDate, setOrderDate] = useState(() => {
    {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  });
  const translations = useTranslations();
  const currentLanguage = useLocale();

  const { location } = useSnapshot(locationStore);

  const [orderTime, setOrderTime] = useState(() => {
    // Initialize with current time rounded to the next hour
    const today = new Date();
    const minutes = today.getMinutes();

    if (minutes > 0) {
      today.setHours(today.getHours() + 2); // Round up to the next hour
      today.setMinutes(0); // Reset minutes to 0
    }

    // Format time as HH:MM
    const hours = String(today.getHours()).padStart(2, "0");
    const mins = String(today.getMinutes()).padStart(2, "0");

    return `${hours}:${mins}`;
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string | undefined;
  } | null>(() => {
    const initialLocation = userStore.location;
    if (initialLocation && initialLocation.lat && initialLocation.lng) {
      return {
        lat: parseFloat(initialLocation.lat),
        lng: parseFloat(initialLocation.lng),
        address: initialLocation.address,
      };
    }
    return null;
  });
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleFormSend = () => {
    if (
      selectedLocation &&
      selectedLocation.lat !== undefined &&
      selectedLocation.lng !== undefined
    ) {
      // Ensure address is converted to string | null
      const addressOrNull: string | undefined =
        selectedLocation.address !== undefined
          ? selectedLocation.address
          : undefined;

      setFormDataItem("time", orderTime);
      setFormDataItem("date", orderDate);
      setFormDataItem("location", {
        address: addressOrNull,
        lat: selectedLocation.lat.toString(),
        lng: selectedLocation.lng.toString(),
      });

      setUser({
        ...userStore,
        location: {
          address: addressOrNull,
          lat: selectedLocation.lat.toString(),
          lng: selectedLocation.lng.toString(),
        },
      });

      navigate.push(
        `/${currentLanguage}/services/booking-process/subservice/sign-up`
      );
    } else {
      console.error("Missing or invalid location data for form submission.");
    }
  };

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
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
    } else {
      console.log("Autocomplete is not loaded yet!");
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

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
  };

  const options = {
    bounds: {
      east: location.lng + 0.1,
      west: location.lng - 0.1,
      north: location.lat + 0.1,
      south: location.lat - 0.1,
    },
  };

  return (
    <Container>
      <Box>
        <OrderPreparation>
          <StepForm />
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
              googleMapsApiKey="AIzaSyD7BWT58CQO-RdY8I4F0kdS5CPx82PC1G8"
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
                  height: "250px", // Adjust height as needed
                }}
                center={{ lat: location.lat, lng: location.lng }}
                zoom={11}
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
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={options}
              >
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
        <BookingDetails />
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
