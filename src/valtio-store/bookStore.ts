import { proxy } from "valtio";

interface UserFormData {
  serviceTitle: string | null;
  subServiceTitle: string | null;
  ServiceSummary: { id: string; quantity: number }[] | null;
  desc: string | null;
  time: string | null;
  date: string | null;
  location: {
    address: string | null;
    lat: string | null;
    lng: string | null;
  };
}

// Initialize state
const initialState: UserFormData = {
  serviceTitle: null,
  subServiceTitle: null,
  ServiceSummary: [],
  desc: null,
  time: null,
  date: null,
  location: {
    address: null,
    lat: null,
    lng: null,
  },
};

// Create the Valtio proxy
export const userFormDataStore = proxy<UserFormData>(initialState);

// Access localStorage only if it's available (client-side)
if (typeof window !== "undefined") {
  const storedData = localStorage.getItem("userFormData");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    userFormDataStore.serviceTitle = parsedData.serviceTitle;
    userFormDataStore.subServiceTitle = parsedData.subServiceTitle;
    userFormDataStore.ServiceSummary = parsedData.ServiceSummary || [];
    userFormDataStore.desc = parsedData.desc;
    userFormDataStore.time = parsedData.time;
    userFormDataStore.date = parsedData.date;
    userFormDataStore.location = parsedData.location || initialState.location;
  }
}

// Function to update userFormDataStore and localStorage
export const setFormDataItem = (key: keyof UserFormData, value: any) => {
  if (key === "ServiceSummary" && !Array.isArray(value)) {
    throw new Error(`Value for ${key} must be an array.`);
  }

  userFormDataStore[key] = value;

  if (typeof window !== "undefined") {
    localStorage.setItem("userFormData", JSON.stringify(userFormDataStore));
  }
};

export const resetUserFormData = () => {
  for (const key in userFormDataStore) {
    if (userFormDataStore.hasOwnProperty(key)) {
      const initialValue = initialState[key as keyof UserFormData];
      if (initialValue === null) {
        userFormDataStore[key as keyof UserFormData] = initialValue as any;
      } else {
        userFormDataStore[key as keyof UserFormData] = initialValue as any; // Use 'as any' to handle type assertion
      }
    }
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("userFormData", JSON.stringify(userFormDataStore));
  }
};
