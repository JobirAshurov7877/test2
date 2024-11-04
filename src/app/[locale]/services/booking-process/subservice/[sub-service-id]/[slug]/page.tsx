"use client";
import { store } from "@/valtio-store/store";
import BookService from "@/widgets/booking/BookService";
import ChooseService from "@/widgets/booking/ChooseService";
import { useParams } from "next/navigation";

const BookingProcess = () => {
  store.bookingFormStep = 1;
  const params = useParams<{ "service-id": string }>();

  return (
    <>
      {params["service-id"] ? (
        <ChooseService serviceId={params["service-id"]} />
      ) : (
        <BookService />
      )}
    </>
  );
};

export default BookingProcess;
