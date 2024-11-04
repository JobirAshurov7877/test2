// store.ts

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

// Load initial state from localStorage if available
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

// Function to update userFormDataStore and localStorage
export const setFormDataItem = (key: keyof UserFormData, value: any) => {
  if (key === "ServiceSummary" && !Array.isArray(value)) {
    throw new Error(`Value for ${key} must be an array.`);
  }

  userFormDataStore[key] = value;
  localStorage.setItem("userFormData", JSON.stringify(userFormDataStore));
};

export const resetUserFormData = () => {
  for (const key in userFormDataStore) {
    if (userFormDataStore.hasOwnProperty(key)) {
      const initialValue = initialState[key as keyof UserFormData];
      if (initialValue === null) {
        // Handle null case explicitly
        userFormDataStore[key as keyof UserFormData] = initialValue as any;
      } else {
        // Assign initial value from initialState if not null
        userFormDataStore[key as keyof UserFormData] = initialValue as any; // Use 'as any' to handle type assertion
      }
    }
  }
  localStorage.setItem("userFormData", JSON.stringify(userFormDataStore));
};
