"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchSubServiceData } from "@/store/subServiceSlice";
import MyLoadingContainer from "@/components/MyLoadingContainer";
import MyLoading from "@/ui/loading/MyLoading";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import SubServicesHeader from "@/widgets/subservice/Header";
import { ExploreServices, Guide, WeGuarantee } from "@/components";
import FAQ from "@/components/FAQ";
import SubServiceAbout from "@/widgets/subservice/About";
import Related from "@/widgets/subservice/Related";

const SubService: React.FC = () => {
  const params = useParams<{ "item-id": string }>();
  const currentLanguage = useLocale();
  console.log(params);
  const { data: subServiceData, loading } = useSelector(
    (state: RootState) => state.subservice
  );
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();

  useEffect(() => {
    if (params["item-id"]) {
      dispatch(
        fetchSubServiceData({
          itemId: params["item-id"],
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, currentLanguage, params["item-id"]]);
  console.log(subServiceData);

  if (loading || !subServiceData) {
    return (
      <MyLoadingContainer>
        <MyLoading />
      </MyLoadingContainer>
    );
  }

  return (
    <>
      <Container>
        <SubServicesHeader subService={subServiceData} />
        <SubServiceAbout service={subServiceData?.aboutText} />
        <WeGuarantee />
        <Guide />
        <FAQ />
        <ExploreServices />
        <Related
          currentSubServiceId={subServiceData?.id}
          serviceId={params["item-id"]}
        />
      </Container>
    </>
  );
};

export default SubService;

const Container = styled.main`
  overflow: hidden;
`;