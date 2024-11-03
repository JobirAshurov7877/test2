"use client";
import { proportions } from "@/styles/proportions";
import styled from "styled-components";
import { MyColors } from "@/styles/color";
import { MyButton } from "@/ui";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import FormattedDate from "@/components/FormattedDate";
import { useMemo, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTranslations } from "next-intl";
import { NavigationLink } from "@/components";
import Image from "next/image";
import { Articles, BlogPagination } from "@/interfaces/blog.interface";
import { useSnapshot } from "valtio";
import { blogCategoryStore } from "@/valtio-store/blogCategoryStore";
interface ArticlesProps {
  articles: Articles[];
  pagination: BlogPagination;
  loadMoreArticles: (page: number) => void;
  isLoadMoreDisabled: () => boolean;
  loadingMore: boolean;
  category_name: string;
  loadCategories: boolean;
}
const AllArticles: React.FC<ArticlesProps> = ({
  articles,
  loadMoreArticles,
  isLoadMoreDisabled,
  loadingMore,
  category_name,
  loadCategories,
}) => {
  const { blogCategoryId } = useSnapshot(blogCategoryStore);
  const t = useTranslations();
  const memoizedArticles = useMemo(() => articles, [articles]);

  return (
    <Container>
      <Box id="all-articles">
        <Title>
          {blogCategoryId > 0
            ? category_name
            : blogCategoryId === -1
            ? t("SEARCH RESULTS")
            : t("ALL ARTICLES")}
        </Title>
        <ArticlesComponent>
          {loadCategories ? (
            <MiddleWare>
              <h3>{t("Loading")}</h3>
            </MiddleWare>
          ) : articles.length === 0 ? (
            <MiddleWare>
              <h3>{t("No article found")}</h3>
            </MiddleWare>
          ) : (
            <>
              {memoizedArticles?.map((article: any) => (
                <Article key={article.id}>
                  <NavigationLink href={`/blog/${article.slug}`}>
                    <div>
                      <Imagew>
                        <Image
                          src={article.image}
                          alt={article.image_title}
                          width={1000}
                          height={1000}
                        />
                      </Imagew>
                      <Categories>
                        {article.categories.map(
                          (category: any, index: number) => (
                            <p key={index}>{category}</p>
                          )
                        )}
                      </Categories>
                      <Desc>
                        <h6>{article.title}</h6>
                        <p>{article.short_description}</p>
                      </Desc>
                    </div>
                    <DateAndButton>
                      <CreatedDate>
                        <FormattedDate createdAt={article.created_at} />
                      </CreatedDate>
                      <MyButton $variant="borderLess">
                        <HiOutlineArrowUpRight />
                      </MyButton>
                    </DateAndButton>
                  </NavigationLink>
                </Article>
              ))}
            </>
          )}
        </ArticlesComponent>
        <LoadMore>
          <MyButton
            disabled={isLoadMoreDisabled()}
            $variant="secondary"
            onClick={loadMoreArticles}
          >
            {!loadingMore ? t("Load More") : t("Loading")}
            <MdOutlineKeyboardArrowDown />
          </MyButton>
        </LoadMore>
      </Box>
    </Container>
  );
};

export default AllArticles;

const Container = styled.section`
  width: 100%;
  padding: 0 ${proportions.divMargin.desktop};

  @media screen and (max-width: 1024px) {
    padding: ${proportions.divMargin.desktop};
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
  margin: 0 auto;
  border-radius: 24px;
  max-width: calc(${proportions.bodyMaxWidth} + 400px);

  @media screen and (max-width: 768px) {
    gap: ${proportions.divMargin.tablet};
    padding: ${proportions.screenPadding.tablet};
  }
  @media screen and (max-width: 481px) {
    gap: ${proportions.divMargin.mobile};
    padding: ${proportions.screenPadding.mobile};
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${proportions.textMargin.mobile};
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${proportions.divMargin.desktop};
  button {
    display: flex;
    align-items: center;

    svg {
      font-size: 24px;
    }
  }
`;

const Title = styled.h4`
  margin: ${proportions.textMargin.desktop} 0;
  font-weight: 500;
`;

const ArticlesComponent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${proportions.divMargin.mobile};
`;

const Article = styled.div`
  flex: 1 0 calc(30% - 20px); /* Three articles per row */
  max-width: calc(34% - 20px);

  @media screen and (max-width: 1076px) {
    flex: 1 0 calc(50% - 20px); /* Three articles per row */
    max-width: calc(51% - 20px);
  }

  @media screen and (max-width: 624px) {
    flex: 1 0 calc(100%); /* Three articles per row */
    max-width: calc(100%);
  }

  box-shadow: 0 0 5px #e2dfdf;
  border-radius: 16px;
  padding: 10px;

  > a {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.1s;
    border-radius: 16px;
  }

  h6 {
    font-weight: 500;
    margin-top: ${proportions.textMargin.tablet};
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
  margin-bottom: ${proportions.textMargin.tablet};
  height: 300px;

  @media screen and (max-width: 1550px) {
    height: 220px;
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
  }
`;

const CreatedDate = styled.div`
  font-size: 16px;
  color: ${MyColors.secondary};

  @media screen and (max-width: 1024px) {
    color: ${MyColors.primary};
  }
`;

const MiddleWare = styled.div`
  margin: 100px auto;

  @media screen and (max-width: 1024px) {
    margin: 50px auto;
  }

  h3 {
    font-weight: 500;
  }
`;
