import Cookies from "js-cookie";
import { setLocationData } from "@/valtio-store/locationStore";
import { api } from "./axios";

interface UserInfo {
  countryCode: string;
  lat: number;
  lng: number;
  supportNumber: string;
  supportEmail: string;
  currencySymbol: string;
}

const clearAllCookies = () => {
  const cookies = Cookies.get();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
};

export const initializeUserInfo = async (): Promise<string> => {
  try {
    let countryCode: string = Cookies.get("countryCode") || "";
    let lat: number | null = parseFloat(Cookies.get("lat") || "");
    let lng: number | null = parseFloat(Cookies.get("lng") || "");
    let supportNumber: string = Cookies.get("supportNumber") || "";
    let supportEmail: string = Cookies.get("supportEmail") || "";
    let currencySymbol: string = Cookies.get("currencySymbol") || "";

    if (
      !countryCode ||
      isNaN(lat) ||
      isNaN(lng) ||
      !supportEmail ||
      !currencySymbol ||
      !supportNumber
    ) {
      // If any required field is missing, fetch user info from the server
      const response = await api.get<UserInfo>("/api/get-user-info");
      console.log(response.data);

      countryCode = response.data.countryCode || "en";
      lat = response.data.lat || 0;
      lng = response.data.lng || 0;
      supportNumber = response.data.supportNumber || "";
      supportEmail = response.data.supportEmail || "";
      currencySymbol = response.data.currencySymbol || "";

      Cookies.set("countryCode", countryCode, { expires: 365 });
      Cookies.set("lat", lat.toString(), { expires: 365 });
      Cookies.set("lng", lng.toString(), { expires: 365 });
      Cookies.set("supportNumber", supportNumber, { expires: 365 });
      Cookies.set("supportEmail", supportEmail, { expires: 365 });
      Cookies.set("currencySymbol", currencySymbol, { expires: 365 });
      Cookies.set("correctCountryCode", countryCode, { expires: 365 });
    }

    setLocationData(
      countryCode,
      lat,
      lng,
      supportNumber,
      supportEmail,
      currencySymbol
    );

    switch (countryCode.toLowerCase()) {
      case "am":
        countryCode = "hy";
        break;
      case "es":
        countryCode = "es"; // Spanish
        break;
      case "ru":
        countryCode = "ru"; // Russian
        break;
      default:
        countryCode = "en"; // Default to English for other codes
        break;
    }

    return countryCode;
  } catch (error) {
    console.error("Error initializing user info:", error);
    clearAllCookies();
    try {
      // Retry fetching user info
      let countryCode: string = Cookies.get("countryCode") || "";
      let lat: number | null = parseFloat(Cookies.get("lat") || "");
      let lng: number | null = parseFloat(Cookies.get("lng") || "");
      let supportNumber: string = Cookies.get("supportNumber") || "";
      let supportEmail: string = Cookies.get("supportEmail") || "";
      let currencySymbol: string = Cookies.get("currencySymbol") || "";
      if (
        !countryCode ||
        isNaN(lat) ||
        isNaN(lng) ||
        !supportEmail ||
        !currencySymbol ||
        !supportNumber
      ) {
        const response = await api.get<UserInfo>("/api/get-user-info");

        countryCode = response.data.countryCode || "en";
        lat = response.data.lat || 40.18460530969092;
        lng = response.data.lng || 44.51500179151635;
        supportNumber = response.data.supportNumber || "";
        supportEmail = response.data.supportEmail || "";
        currencySymbol = response.data.currencySymbol || "";

        Cookies.set("countryCode", countryCode, { expires: 365 });
        Cookies.set("lat", lat.toString(), { expires: 365 });
        Cookies.set("lng", lng.toString(), { expires: 365 });
        Cookies.set("supportNumber", supportNumber, { expires: 365 });
        Cookies.set("supportEmail", supportEmail, { expires: 365 });
        Cookies.set("currencySymbol", currencySymbol, { expires: 365 });
        Cookies.set("correctCountryCode", countryCode || "en", {
          expires: 365,
        });
      }

      setLocationData(
        countryCode,
        lat,
        lng,
        supportNumber,
        supportEmail,
        currencySymbol
      );

      switch (countryCode.toLowerCase()) {
        case "am":
          countryCode = "hy";
          break;
        case "es":
          countryCode = "es";
          break;
        case "ru":
          countryCode = "ru";
          break;
        default:
          countryCode = "en";
          break;
      }

      console.log(countryCode);
      return countryCode;
    } catch (retryError) {
      console.error("Error retrying user info initialization:", retryError);
      return "en";
    }
  }
};
