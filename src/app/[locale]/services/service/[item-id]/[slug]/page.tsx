import { useEffect } from "react";
import styled from "styled-components";
import FAQ from "@/components/FAQ";
import ExploreServices from "@/components/ExploreServices";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useSnapshot } from "valtio";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchServiceRootData } from "@/store/rootWithServicesSlice";
import MyLoadingContainer from "@/components/MyLoadingContainer";
import MyLoading from "@/ui/loading/MyLoading";

const Categories = () => {
  const { data: rootWithServicesSlice, loading } = useSelector(
    (state: RootState) => state.rootWithServicesSlice
  );
  const dispatch = useDispatch();

  if (loading || !rootWithServicesSlice) {
    return (
      <MyLoadingContainer>
        <MyLoading />
      </MyLoadingContainer>
    );
  }

  return (
    <>
      <Container>
        {/* <Header service={rootWithServicesSlice} />
        <SubServices service={rootWithServicesSlice} />
        <Guide />
        <FAQ />
        <ExploreServices />
        <Related
          currentCategoryTitle={rootWithServicesSlice.title}
          services={categories}
        /> */}
      </Container>
    </>
  );
};

export default Categories;

const Container = styled.main`
  overflow: hidden;
`;
