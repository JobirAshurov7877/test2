import Cookies from "js-cookie";

const INTERNAL_VERSION = "1.0.1"; // Update this with each release

// Store the current version in localStorage
const setInternalVersion = () => {
  localStorage.setItem("internalVersion", INTERNAL_VERSION);
};

// Retrieve the stored version from localStorage
const getInternalVersion = () => {
  return localStorage.getItem("internalVersion");
};

// Clear specific user data from localStorage
const clearUserData = () => {
  const userDataKeys = [
    "userData", // Replace with your user data keys
  ];

  userDataKeys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

// Clear cookies
const clearCookies = () => {
  Cookies.remove("countryCode");
  Cookies.remove("lat");
  Cookies.remove("lng");
  Cookies.remove("supportNumber");
  Cookies.remove("supportEmail");
  Cookies.remove("currencySymbol");
  Cookies.remove("correctCountryCode");
};

// Clear all localStorage data
export const clearAllLocalStorage = () => {
  localStorage.clear();
};

// Check if version has changed and clear data if necessary
export const clearUserDataIfNeeded = () => {
  const storedVersion = getInternalVersion();

  if (storedVersion !== INTERNAL_VERSION) {
    // Clear specific user data
    clearUserData();

    // Optionally, clear all localStorage
    // clearAllLocalStorage();

    // Clear cookies
    clearCookies();

    // Update internal version
    setInternalVersion();
  }
};
