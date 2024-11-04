import { proxy } from "valtio";

interface LocationData {
  countryCode: string;
  location: {
    lng: number;
    lat: number;
  };
  supportNumber: string;
  supportEmail: string;
  currencySymbol: string;
}

export const locationStore = proxy<LocationData>({
  countryCode: "",
  location: {
    lng: 0,
    lat: 0,
  },
  supportNumber: "",
  supportEmail: "",
  currencySymbol: "",
});

export const setLocationData = (
  code: string,
  lat: number,
  lng: number,
  supportNumber: string,
  supportEmail: string,
  currencySymbol: string
) => {
  locationStore.countryCode = code;
  locationStore.location.lat = lat;
  locationStore.location.lng = lng;
  locationStore.supportNumber = supportNumber;
  locationStore.supportEmail = supportEmail;
  locationStore.currencySymbol = currencySymbol;
};
