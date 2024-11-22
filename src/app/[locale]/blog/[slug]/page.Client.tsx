"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";
import FormattedDate from "@/components/FormattedDate";
import { MyColors } from "@/styles/color";
import { LiaFacebookF } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa6";
import Subscribe from "@/widgets/blog/Subscribe";
import Head from "next/head";
import { proportions } from "@/styles/proportions";
import { api } from "@/services/axios";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import MyLoadingContainer from "@/components/MyLoadingContainer";
import { MyLoading } from "@/ui";

const BlogSinglePageClient = () => {
  const params = useParams<{ slug: string }>();
  const currentLanguage = useLocale();
  const t = useTranslations();
  const [article, setArticle] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/blog/article/${currentLanguage}/${params?.slug}`
        );
        setArticle(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };
    fetchData();
  }, [currentLanguage, params?.slug]);

  return (
    <>
      <Head>
        <title>{article?.meta_title || t("Home_meta_title")}</title>
        <meta name="description" content={article?.meta_description} />
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content={article?.meta_keywords} />
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={article?.meta_description} />
        <meta property="og:image" content={article?.image} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Varpet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title} />
        <meta name="twitter:description" content={article?.meta_description} />
        <meta name="twitter:image" content={article?.image} />
        <link
          rel="canonical"
          href={`https://varpet.com/${currentLanguage}/blog/${article?.slug}`}
        />
      </Head>

      {loader ? (
        <MyLoading />
      ) : (
        <Container>
          <Wrapper>
            <Title>
              <DateAndCategory>
                <FormattedDate createdAt={article?.created_at || ""} />
                <li>{article?.categories[0]}</li>
              </DateAndCategory>
              <h1>{article?.title}</h1>
              <SocialMedias>
                <a
                  href="https://www.facebook.com/VarpetArmenia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LiaFacebookF />
                </a>
                <a
                  href="https://www.linkedin.com/company/varpet/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </SocialMedias>
            </Title>
            <Imagew>
              <Image
                src={article?.image}
                alt={article?.title}
                loading="lazy"
                fill
              />
            </Imagew>
          </Wrapper>
          <Box
            className="markdown"
            dangerouslySetInnerHTML={{ __html: article?.content || "" }}
          />
          <SubserviceContiner>
            <Subscribe />
          </SubserviceContiner>
        </Container>
      )}
    </>
  );
};

export default BlogSinglePageClient;

const Container = styled.div`
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }

  h3 {
    text-align: center;
    margin-bottom: ${proportions.divMargin.desktop};

    @media screen and (max-width: 768px) {
      margin-bottom: ${proportions.divMargin.tablet};
    }
    @media screen and (max-width: 481px) {
      margin-bottom: ${proportions.divMargin.mobile};
    }
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${proportions.sectionMargin.desktop} auto;
  max-width: calc(${proportions.bodyMaxWidth} - 250px);
  border-radius: 24px;
  overflow: auto;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    max-width: 100%;
    margin: ${proportions.textMargin.desktop} 0;
    text-align: start;
    display: flex;
    flex-wrap: wrap;
    word-break: break-word;
    font-size: 1.3rem;

    @media screen and (max-width: 768px) {
      margin: ${proportions.divMargin.tablet} 0;
      font-size: 18px;
    }
    @media screen and (max-width: 481px) {
      margin: ${proportions.divMargin.mobile} 0;
    }
  }

  p {
    margin: ${proportions.textMargin.desktop} 0;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
      margin: ${proportions.textMargin.tablet} 0;
    }
    @media screen and (max-width: 481px) {
      margin: ${proportions.textMargin.mobile} 0;
    }
  }

  img {
    width: calc(100% + 138px) !important;
    height: auto !important;
    border-radius: 10px;
    object-fit: contain;

    @media screen and (max-width: 1282px) {
      width: 100% !important;
    }
  }

  ul li {
    list-style: disc;
  }

  ul,
  ol,
  p {
    font-size: 13px;
  }

  table {
    border-collapse: collapse;
    width: calc(100% - 138px) !important;
    margin-left: 120px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${proportions.divMargin.desktop};

  img {
    width: 50%;
    border-radius: 10px;

    @media screen and (max-width: 1400px) {
      width: 60%;
    }
    @media screen and (max-width: 1024px) {
      width: 80%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
const Imagew = styled.div`
  width: 100%;
  position: relative;
  max-width: 800px;
  overflow: hidden;
  height: 370px;
  padding: 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${proportions.textMargin.desktop};
  width: 60%;
  padding: 0 20px;

  @media screen and (max-width: 1024px) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  h3 {
    margin-bottom: 0;
  }
`;

const DateAndCategory = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${proportions.textMargin.desktop};

  span {
    color: ${MyColors.secondary};
  }

  li {
    color: ${MyColors.primary};
  }
`;

const SocialMedias = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};
  margin-bottom: ${proportions.textMargin.desktop};

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    transition: 0.2s;
    background-color: #e5f2fb;
    color: ${MyColors.primary};
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 3px #0078db;
    }

    @media screen and (max-width: 768px) {
      width: 30px;
      height: 30px;
      padding: 6px;
    }
  }

  svg {
    font-size: 24px;
  }
`;

const SubserviceContiner = styled.div`
  div {
    gap: 0;
  }
`;
