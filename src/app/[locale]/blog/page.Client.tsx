"use client";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { fetchArticles, resetArticles } from "@/store/articlesSlice";
import { fetchBlog } from "@/store/blogSlice";
import { fetchArticlesByCategory } from "@/store/blogCategorySlice";
import { useSnapshot } from "valtio";
import { blogCategoryStore } from "@/valtio-store/blogCategoryStore";
import Header from "@/widgets/blog/Header";
import TopArticles from "@/widgets/blog/TopArticles";
import Subscribe from "@/widgets/blog/Subscribe";

const AllArticles = dynamic(() => import("@/widgets/blog/AllArticles"));
const Categories = dynamic(() => import("@/widgets/blog/Categories"));

export default function BlogClient() {
  const currentLanguage = useLocale();
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadCategories, setLoadCategories] = useState(false);
  const { categories, latestArticle, topArticles, loading } = useSelector(
    (state: RootState) => state.blog
  );
  const { articles, pagination } = useSelector(
    (state: RootState) => state.articles
  );
  const { categoryArticles } = useSelector(
    (state: RootState) => state.blogCategory
  );
  const { filteredArticlesAfterSearch } = useSelector(
    (state: RootState) => state.filteredCategory
  );
  const { blogCategoryId } = useSnapshot(blogCategoryStore);

  useEffect(() => {
    dispatch(resetArticles());
    blogCategoryStore.blogCategoryId = 0;
    dispatch(fetchBlog(currentLanguage));
  }, [dispatch, location.pathname, currentLanguage]);

  useEffect(() => {
    setCurrentPage(1);
    dispatch(resetArticles());
    if (blogCategoryId === 0) {
      dispatch(fetchArticles(currentPage, currentLanguage));
    } else if (blogCategoryId === -1) {
    } else {
      setLoadCategories(true);
      dispatch(resetArticles());
      setCurrentPage(1);
      dispatch(fetchArticlesByCategory(blogCategoryId, currentLanguage))
        .then(() => {
          setLoadCategories(false);
        })
        .catch((error) => {
          console.error("Error fetching articles by category:", error);
          setLoadCategories(false);
        });
    }
  }, [dispatch, location.pathname, currentLanguage, blogCategoryId]);

  const loadMoreArticles = () => {
    if (currentPage < pagination.last_page) {
      setLoadingMore(true);
      dispatch(fetchArticles(currentPage + 1, currentLanguage)).then(() => {
        setCurrentPage(currentPage + 1);
        setLoadingMore(false);
      });
    }
  };

  const isLoadMoreDisabled = () => {
    return currentPage === pagination.last_page;
  };

  return (
    <Container>
      <Header latestArticle={latestArticle} />
      <Categories categories={categories} />
      <AllArticles
        loadCategories={loadCategories}
        loadingMore={loadingMore}
        isLoadMoreDisabled={isLoadMoreDisabled}
        loadMoreArticles={loadMoreArticles}
        articles={
          articles.length > 1
            ? articles
            : blogCategoryId === -1
            ? filteredArticlesAfterSearch
            : categoryArticles.articles
        }
        pagination={pagination}
        category_name={categoryArticles.category_name}
      />
      <TopArticles topArticles={topArticles} />
      <Subscribe />
    </Container>
  );
}

const Container = styled.main``;
