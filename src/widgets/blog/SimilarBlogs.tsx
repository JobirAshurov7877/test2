"use client";
import React, { useEffect, useState } from "react";
import "./SimilarBlogs.css";
import { api } from "@/services/axios";
import Image from "next/image";
import Link from "next/link";
import dateIcon from "../../assets/newsdate.svg";
import FormattedDate from "@/components/FormattedDate";
import { useLocale, useTranslations } from "next-intl";

const SimilarBlogs = ({ slug }: any) => {
  const [similarBlogData, setSimilarBlogData] = useState([]);
  const locale = useLocale();
  const t = useTranslations();
  useEffect(() => {
    api
      .get(`/api/blog/articles/similar/${locale}`)
      .then((response) => setSimilarBlogData(response?.data));
  }, [locale, slug]);
  return (
    <div className="similar-news">
      <h2 className="title-h2">{t("Similar_news")}</h2>
      {similarBlogData.map((item: any) => (
        <div className="main-news d-flex" key={item?.id}>
          <Link className="news-img-single" href={`/blog/${item?.slug}`}>
            <Image
              className="news-img img-fluid lazyload loaded"
              src={item?.image}
              alt={item?.image_title || "news"}
              width={200}
              height={200}
            />
          </Link>
          <div className="news-content">
            {item.categories.map((category: any, index: number) => (
              <Link key={index} href="" className="news-category">
                {category}
              </Link>
            ))}
            <a className="news-single" href="#">
              <h3 className="title-h3">{item?.title}</h3>
            </a>
            <div className="news-date d-flex">
              <Image
                className="lazyload loaded"
                alt="date"
                src={dateIcon}
                width={20}
                height={20}
              />
              <span>
                <FormattedDate createdAt={item?.created_at || ""} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarBlogs;
