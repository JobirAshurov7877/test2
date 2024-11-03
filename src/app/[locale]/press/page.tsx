"use client";
import FAQ from "@/components/FAQ";
import SubServiceSummary from "@/widgets/press/About";
import AppDownload from "@/widgets/press/AppDownload";
import SubServicesHeader from "@/widgets/press/Header";
import MediaResources from "@/widgets/press/MediaResources";
import styled from "styled-components";

const Press = () => {
  return (
    <>
      <Container>
        <SubServicesHeader />
        <MediaResources />
        <AppDownload />
        <SubServiceSummary />
        <FAQ />
      </Container>
    </>
  );
};

export default Press;

const Container = styled.main``;
