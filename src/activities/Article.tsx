import { useActivity } from "@stackflow/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ArticleProfile from "../components/ArticleProfile";
import Layout from "../components/Layout";
import { readPageProps } from "../lib/readPageProps";
import { f } from "../styles";
import * as css from "./Article.css";

export interface ArticleParams {
  articleId: string;
}
const Article: React.FC<ArticleParams> = () => {
  const activity = useActivity();
  const pageProps = readPageProps({ activityId: activity.id });

  console.log(pageProps);
  // const data = readPreloadData<Queries.ArticleTemplateQueryQuery>(activity.preloadRef)

  const imageUrl = `https://picsum.photos/800/800/?id=1234`;

  return (
    <Layout>
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
            {/* {data.allMarkdownRemark.nodes.map((node) => (
              <ArticleCard
                key={String(node.frontmatter!.id!)}
                articleId={String(node.frontmatter!.id!)}
                price={node.frontmatter!.price!}
                title={node.frontmatter!.title!}
              />
            ))} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
