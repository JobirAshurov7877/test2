"use client";

import { useEffect, useState } from "react";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { useLocale } from "next-intl";
import { api } from "@/services/axios";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const locale = useLocale(); // Lokal tilni olish

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/privacy/${locale}`);
        console.log(res.data);
        setContent(res.data.content || "No content available.");
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      }
    };
    fetchData();
  }, [locale]);

  return (
    <Container>
      <Box dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
};

export default PrivacyPolicy;

// Styled Components
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
