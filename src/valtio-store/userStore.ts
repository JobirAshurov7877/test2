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

// Helper function to check if the code is running in the browser
function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

// Fetch stored data from localStorage or use an empty object if not available
const storedData = isBrowser()
  ? JSON.parse(localStorage.getItem("userData") || "{}")
  : {}; // Default to an empty object for SSR environments

// Initialize the user store using Valtio
export const userStore = proxy<UserData>({
  firstName: storedData.firstName ?? null,
  lastName: storedData.lastName ?? null,
  phone: storedData.phone ?? { recipient: undefined, countryCode: undefined },
  email: storedData.email ?? null,
  userId: storedData.userId ?? undefined,
  code: storedData.code ?? undefined,
  location: storedData.location ?? {
    address: undefined,
    lat: undefined,
    lng: undefined,
  },
});

// Function to initialize localStorage if it doesn't exist
export function initializeLocalStorage() {
  if (isBrowser()) {
    const existingData = localStorage.getItem("userData");
    if (!existingData) {
      localStorage.setItem("userData", JSON.stringify(userStore));
    }
  }
}

// Function to save the current state of userStore to localStorage
export function saveStateToLocalStorage() {
  if (isBrowser()) {
    localStorage.setItem("userData", JSON.stringify(userStore));
  }
}

// Function to update the userStore state and save it to localStorage
export const setUser = (newData: Partial<UserData>) => {
  Object.assign(userStore, {
    ...userStore,
    ...newData,
  });
  saveStateToLocalStorage();
};

// Initialize localStorage on script execution
initializeLocalStorage();
