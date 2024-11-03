import axios from "axios";
import { toast } from "react-toastify";

interface PhoneState {
  recipient: string;
  countryCode: string;
}

interface FormValues {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tel?: PhoneState;
  subject?: string;
  message?: string;
}

const useHubSpotFormService = (
  page: string,
  formId: string,
  successMessage: string,
  errorMessage: string,
  showToast: boolean
) => {
  const hubSpotApiEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/44569876/${formId}`;
  const hubSpotUTK = "c7f7949db023bf20ce35a5ae5eeb6df3";

  const submitToHubSpot = async (formData: FormValues) => {
    try {
      const fields = [];

      if (formData.email) {
        fields.push({
          objectTypeId: "0-1",
          name: "email",
          value: formData.email,
        });
      }

      if (formData.name) {
        fields.push({
          objectTypeId: "0-1",
          name: "firstname",
          value: formData.name,
        });
      }

      if (formData.firstName) {
        fields.push({
          objectTypeId: "0-1",
          name: "firstname",
          value: formData.firstName,
        });
      }

      if (formData.lastName) {
        fields.push({
          objectTypeId: "0-1",
          name: "lastname",
          value: formData.lastName,
        });
      }

      if (formData.tel) {
        fields.push({
          objectTypeId: "0-1",
          name: "mobilephone",
          value: formData.tel.recipient,
        });
      }

      if (formData.phone) {
        fields.push({
          objectTypeId: "0-1",
          name: "mobilephone",
          value: formData.phone,
        });
      }

      if (formData.subject) {
        fields.push({
          objectTypeId: "0-1",
          name: "subject",
          value: formData.subject,
        });
      }

      if (formData.message) {
        fields.push({
          objectTypeId: "0-1",
          name: "message",
          value: formData.message,
        });
      }

      const response = await axios.post(hubSpotApiEndpoint, {
        submittedAt: Date.now(), // Optional: Timestamp of submission
        fields: fields,
        context: {
          hutk: hubSpotUTK,
          pageUri: "https://new.varpet.com", // Example: "www.example.com/page"
          pageName: page,
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow Example Company to store and process my personal data.",
            communications: [
              {
                value: true,
                subscriptionTypeId: 999,
                text: "I agree to receive marketing communications from Example Company.",
              },
            ],
          },
        },
      });

      if (showToast) {
        toast.success(successMessage, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      return response.data;
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      if (showToast) {
        toast.error(errorMessage, {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      throw error;
    }
  };

  return { submitToHubSpot };
};

export default useHubSpotFormService;
