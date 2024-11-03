"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { MyButton } from "@/ui";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import FormattedDate from "@/components/FormattedDate";
import { MyColors } from "@/styles/color";
import { useTranslations } from "next-intl";
import { NavigationLink } from "@/components";
import Image from "next/image";
interface TopArticlesProps {
  topArticles: any[];
}
const TopArticles: React.FC<TopArticlesProps> = ({ topArticles }) => {
  const t = useTranslations();

  return (
    <Container>
      <Box>
        <Title>{t("MOST READ ARTICLES")}</Title>
        <ArticleList>
          <BigArticle>
            <NavigationLink href={""}>
              <div>
                <Imagew className="image">
                  {topArticles && (
                    <Image
                      src={topArticles[0]?.image}
                      alt={topArticles[0]?.image_title}
                      width={1000}
                      height={1000}
                    />
                  )}
                </Imagew>
                <Categories>
                  {topArticles[0]?.categories.map((category: any) => (
                    <p key={category}>{category}</p>
                  ))}
                </Categories>
                <BigArticleDesc>
                  <h6>{topArticles[0]?.title}</h6>
                  <p>{topArticles[0]?.short_description}</p>
                </BigArticleDesc>
              </div>
              <DateAndButton>
                <CreatedDate>
                  <FormattedDate createdAt={topArticles[0]?.created_at} />
                </CreatedDate>
                <MyButton $variant="borderLess">
                  <HiOutlineArrowUpRight />
                </MyButton>
              </DateAndButton>
            </NavigationLink>
          </BigArticle>
          <SmallArticles>
            <Article>
              <NavigationLink href={`/blog/${topArticles[1]?.slug}`}>
                <Imagew>
                  <Image
                    src={topArticles[1]?.image}
                    alt={topArticles[1]?.image_title}
                    width={1000}
                    height={1000}
                  />
                </Imagew>
                <Desc>
                  <div>
                    <Categories>
                      {topArticles[1]?.categories.map((category: any) => (
                        <p key={category}>{category}</p>
                      ))}
                    </Categories>
                    <div>
                      <h6>{topArticles[1]?.title}</h6>
                      <p>{topArticles[1]?.short_description}</p>
                    </div>
                  </div>
                  <DateAndButton>
                    <CreatedDate>
                      <FormattedDate createdAt={topArticles[1]?.created_at} />
                    </CreatedDate>
                    <MyButton $variant="borderLess">
                      <HiOutlineArrowUpRight />
                    </MyButton>
                  </DateAndButton>
                </Desc>
              </NavigationLink>
            </Article>
            <Article>
              <NavigationLink href={`/blog/${topArticles[2]?.slug}`}>
                <Imagew>
                  <Image
                    src={topArticles[2]?.image}
                    alt={topArticles[2]?.image_title}
                    width={1000}
                    height={1000}
                  />
                </Imagew>
                <Desc>
                  <div>
                    <Categories>
                      {topArticles[2]?.categories.map((category: any) => (
                        <p key={category}>{category}</p>
                      ))}
                    </Categories>
                    <div>
                      <h6>{topArticles[2]?.title}</h6>
                      <p>{topArticles[2]?.short_description}</p>
                    </div>
                  </div>
                  <DateAndButton>
                    <CreatedDate>
                      <FormattedDate createdAt={topArticles[2]?.created_at} />
                    </CreatedDate>
                    <MyButton $variant="borderLess">
                      <HiOutlineArrowUpRight />
                    </MyButton>
                  </DateAndButton>
                </Desc>
              </NavigationLink>
            </Article>
          </SmallArticles>
        </ArticleList>
      </Box>
    </Container>
  );
};

export default TopArticles;

const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 1470px) {
    padding: ${proportions.divMargin.desktop};
  }
  @media screen and (max-width: 768px) {
    padding: ${proportions.divMargin.tablet};
  }
  @media screen and (max-width: 481px) {
    padding: ${proportions.divMargin.mobile};
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
  margin: ${proportions.sectionMargin.desktop} auto;
  flex-wrap: wrap;
  max-width: calc(${proportions.bodyMaxWidth} + 400px);

  border-radius: 24px;

  @media screen and (max-width: 1470px) {
    padding: 0;
  }

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    margin: ${proportions.sectionMargin.tablet} auto;
  }

  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    margin: ${proportions.sectionMargin.mobile} auto;
  }
`;

const Title = styled.h4`
  margin: ${proportions.textMargin.desktop} 0;
  font-weight: 500;

  @media screen and (max-width: 1130px) {
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    text-align: start;
  }
`;

const ArticleList = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};

  @media screen and (max-width: 1130px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BigArticle = styled.div`
  width: 50%;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 16px;
  padding: 10px;

  @media screen and (max-width: 1130px) {
    width: 100%;
  }

  a {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h6 {
    font-weight: 500;
    margin-top: ${proportions.textMargin.tablet};
  }

  .image {
    width: 100%;
    height: 320px;
    margin-bottom: ${proportions.textMargin.tablet};

    @media screen and (max-width: 481px) {
      height: 220px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.1s;
  }

  &:hover img {
    transform: scale(1.05);
  }
  &:hover {
    box-shadow: 0 0 10px #e5f2fb;
  }
`;

const BigArticleDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.mobile};
`;

const SmallArticles = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.desktop};

  @media screen and (max-width: 1130px) {
    width: 100%;
  }
`;

const Article = styled.div`
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 16px;

  a {
    display: flex;
    gap: ${proportions.textMargin.tablet};

    @media screen and (max-width: 481px) {
      flex-direction: column;
    }
  }

  h6 {
    font-weight: 500;
    margin-top: ${proportions.textMargin.tablet};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.1s;

    @media screen and (max-width: 481px) {
      height: 220px;
    }
  }

  &:hover img {
    transform: scale(1.05);
  }
  &:hover {
    box-shadow: 0 0 10px #e5f2fb;
  }
`;

const Imagew = styled.div`
  overflow: hidden;
  border-radius: 16px;
  width: 50%;

  @media screen and (max-width: 1130px) {
    width: 40%;
  }

  @media screen and (max-width: 481px) {
    width: 100%;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${proportions.textMargin.tablet};
  width: 50%;

  @media screen and (max-width: 1130px) {
    width: 60%;
  }

  @media screen and (max-width: 481px) {
    width: 100%;
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: ${proportions.textMargin.desktop};
  color: ${MyColors.secondary};

  p {
    font-weight: 500;
  }
`;

const DateAndButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${proportions.divMargin.mobile};

  @media screen and (max-width: 1380px) {
    margin-top: ${proportions.textMargin.mobile};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #e5f2fb;
    padding: 8px;
    border-radius: 50%;
    &:hover {
      border: none;
      box-shadow: none;
    }
  }

  svg {
    width: 32px;
    height: 32px;

    @media screen and (max-width: 481px) {
      width: 22px;
      height: 22px;
    }
  }
`;

const CreatedDate = styled.div`
  font-size: 16px;
  color: ${MyColors.secondary};

  @media screen and (max-width: 1024px) {
    color: ${MyColors.primary};
  }
`;
