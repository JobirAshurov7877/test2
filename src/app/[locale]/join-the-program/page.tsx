"use client";
import { api } from "@/services/axios";
import { proportions } from "@/styles/proportions";
import { useLocale, useTranslations } from "next-intl";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

const JoinTheProgram = () => {
  const t = useTranslations();
  const [html, setHtml] = useState("");
  const currentLanguage = useLocale();

  useEffect(() => {
    const fetchHtmlFile = async () => {
      try {
        const response = await api.get(`/api/join/${currentLanguage}`);
        setHtml(response.data.content);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchHtmlFile();
  }, [currentLanguage]);

  return (
    <>
      <Head>
        <title>{t("Join the program")}</title>
        <meta
          name="description"
          content="This is the footer page for Varpet."
        />
        <meta name="keywords" content="Varpet, footer, services" />
      </Head>
      <Container>
        <Box dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </>
  );
};

export default JoinTheProgram;

const Container = styled.main`
  width: 100%;
`;
const Box = styled.div`
  max-width: ${proportions.bodyMaxWidth};
  margin: ${proportions.sectionMargin.tablet} auto;
  padding: ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
    margin: ${proportions.sectionMargin.mobile} auto;
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }

  h5 {
    margin-bottom: ${proportions.divMargin.desktop};
  }
  p,
  li {
    margin: ${proportions.textMargin.desktop} 0;
    font-size: 14px;
    color: #656565;
  }

  div {
    margin: ${proportions.sectionMargin.desktop} 30px;
  }
`;
