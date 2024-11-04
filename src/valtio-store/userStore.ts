import { proxy } from "valtio";

interface UserData {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  phone: {
    recipient: string | undefined;
    countryCode: string | undefined;
  };
  email: string | undefined | null;
  userId: string | undefined;
  code: string | undefined;
  location: {
    address: string | undefined;
    lat: string | undefined;
    lng: string | undefined;
  };
}

const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

export function initializeLocalStorage() {
  const existingData = localStorage.getItem("userData");

  // Check if userData already exists in localStorage
  if (!existingData) {
    // Initialize localStorage with initialUserData
    localStorage.setItem("userData", JSON.stringify(userStore));
  }
}

export const userStore = proxy<UserData>({
  firstName: storedData.firstName !== undefined ? storedData.firstName : null,
  lastName: storedData.lastName !== undefined ? storedData.lastName : null,
  phone: storedData.phone !== undefined ? storedData.phone : "",
  email: storedData.email !== undefined ? storedData.email : null,
  userId: storedData.userId !== undefined ? storedData.userId : "",
  code: storedData.code !== undefined ? storedData.code : "",
  location:
    storedData.location !== undefined
      ? {
          address:
            storedData.location.address !== undefined
              ? storedData.location.address
              : undefined,
          lat:
            storedData.location.lat !== undefined
              ? storedData.location.lat
              : undefined,
          lng:
            storedData.location.lng !== undefined
              ? storedData.location.lng
              : undefined,
        }
      : {
          address: undefined,
          lat: undefined,
          lng: undefined,
        },
});

export function saveStateToLocalStorage() {
  localStorage.setItem("userData", JSON.stringify(userStore));
}

export const setUser = (newData: Partial<UserData>) => {
  // Update userStore state
  Object.assign(userStore, {
    ...userStore,
    ...newData,
  });

  // Save updated state to local storage
  saveStateToLocalStorage();
};

initializeLocalStorage();
