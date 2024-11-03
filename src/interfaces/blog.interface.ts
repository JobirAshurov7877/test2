export interface Articles {
  id: number;
  slug: string;
  image: string;
  short_description: string;
  created_at: string;
  image_title: string;
  title: string;
  categories: string[];
}

export interface BlogCategory {
  category_name: string;
  articles: Articles[];
}


export interface BlogPagination {
  last_page: number;
  current_page: number;
}

export interface BlogFilteredArticles extends Articles {}
export interface LatestArticle extends Articles {}
export interface BlogTopArticles extends Articles {}

export interface BlogCategories {
  id: number;
  name: string;
}

export interface BlogSinglePage extends Articles {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  content: string;
}
