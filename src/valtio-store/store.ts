import { proxy } from "valtio";

interface RootState {
  bookingFormStep: number;
}

export const store = proxy<RootState>({
  bookingFormStep: 1,
});
