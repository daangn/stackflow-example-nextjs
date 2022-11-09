import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useActivityPreloadRef } from "@stackflow/plugin-preload";
import { ActivityComponentType } from "@stackflow/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ArticleCard from "../components/ArticleCard";
import ArticleProfile from "../components/ArticleProfile";
import { readPageProps } from "../lib/readPageProps";
import { ArticlePageProps } from "../pages/articles/[articleId]";
import { f } from "../styles";
import * as css from "./Article.css";

export interface ArticleParams {
  articleId: string;
}
const Article: ActivityComponentType<ArticleParams> = (props) => {
  const preloadRef = useActivityPreloadRef<{ key: string }>();
  const pageProps = readPageProps<ArticlePageProps>(preloadRef);

  const imageUrl = `https://picsum.photos/800/800/?id=${props.params.articleId}`;

  return (
    <AppScreen appBar={{}}>
      <div className={css.container}>
        <div className={css.image}>
          <div className={css.imageInner}>
            <LazyLoadImage
              className={f.imgObjectFitCover}
              src={imageUrl}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <ArticleProfile />
        <div className={css.content}>
          <div className={css.title}>Title</div>
          <div className={css.subtitle}>Baby & Kids ∙ 7 days ago</div>
          <div className={css.body}>
            Est aliquip laborum elit nisi ad. Elit do cupidatat aute tempor.
            Esse exercitation sit amet elit magna velit esse aliquip.
          </div>
          <div className={css.subtitle}>1 chats ∙ 2 favorites ∙ 212 views</div>
        </div>
        <div className={css.section}>
          <div className={css.sectionTitle}>Other Items by Emila </div>
          <div className={css.recommenderGrid}>
            {pageProps.recommendedArticles.map((article) => (
              <ArticleCard
                key={article.articleId}
                articleId={article.articleId}
                price={article.price}
                title={article.title}
              />
            ))}
          </div>
        </div>
      </div>
    </AppScreen>
  );
};

export default Article;
