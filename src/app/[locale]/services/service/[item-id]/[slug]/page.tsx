"use client";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "@/widgets/service/Header";
import SubServices from "@/widgets/service/SubServices";
import FAQ from "@/components/FAQ";
import Related from "@/widgets/service/Related";
import ExploreServices from "@/components/ExploreServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchServiceRootData } from "@/store/rootWithServicesSlice";
import MyLoadingContainer from "@/components/MyLoadingContainer";
import { useParams } from "next/navigation";
import MyLoading from "@/ui/loading/MyLoading";
import { useLocale, useTranslations } from "next-intl";
import { Guide } from "@/components";
import Head from "next/head";

const Categories = () => {
  const params = useParams<{ "item-id": string }>();
  const currentLanguage = useLocale();
  const t = useTranslations();

  const { data: rootWithServicesSlice, loading } = useSelector(
    (state: RootState) => state.rootWithServicesSlice
  );
  const dispatch = useDispatch();
  console.log(params["item-id"]);

  useEffect(() => {
    if (params["item-id"]) {
      const itemId = params["item-id"];
      (dispatch as ThunkDispatch<RootState, unknown, UnknownAction>)(
        fetchServiceRootData({
          rootId: itemId,
          lang: currentLanguage,
        })
      );
    }
  }, [dispatch, currentLanguage, params["item-id"]]);

  useEffect(() => {
    if (params["item-id"] && rootWithServicesSlice?.title) {
      document.title = rootWithServicesSlice?.title || t("Services");
      document
        .querySelector("meta[name='description']")
        ?.setAttribute(
          "content",
          rootWithServicesSlice?.description || t("home_meta_description")
        );
      document
        .querySelector("meta[name='keywords']")
        ?.setAttribute("content", "Varpet, footer, services");
      document
        .querySelector("link[rel='canonical']")
        ?.setAttribute(
          "href",
          `https://varpet.com/${currentLanguage}/services/${params["item-id"]}`
        );
    }
  }, [currentLanguage, params["item-id"], rootWithServicesSlice]);

  if (loading || !rootWithServicesSlice) {
    return (
      <MyLoadingContainer>
        <MyLoading />
      </MyLoadingContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{rootWithServicesSlice?.title || t("Services")}</title>
        <meta name="description" content={rootWithServicesSlice?.description} />
        <meta name="keywords" content="Varpet, footer, services" />
        <link
          rel="canonical"
          href={`https://varpet.com/${currentLanguage}/services/${params["item-id"]}`}
        />
      </Head>
      <Container>
        <Header service={rootWithServicesSlice} />
        <SubServices service={rootWithServicesSlice} />
        <Guide />
        <FAQ />
        <ExploreServices />
        <Related
          currentCategoryTitle={rootWithServicesSlice?.title}
          services={[]}
        />
      </Container>
    </>
  );
};

export default Categories;

const Container = styled.main`
  overflow: hidden;
`;
