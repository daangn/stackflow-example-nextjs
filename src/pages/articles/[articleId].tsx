import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import { articles } from "../../data";

export const getStaticProps: GetStaticProps<{
  recommendedArticles: typeof articles;
}> = async (ctx) => ({
  props: {
    recommendedArticles: articles,
  },
});

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: "blocking",
  paths: [...articles.map((article) => `/articles/${article.articleId}`)],
});

export default () => null;

export type ArticlePageProps = InferGetStaticPropsType<typeof getStaticProps>;
