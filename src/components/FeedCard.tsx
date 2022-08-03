import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Link } from "../lib/Link";
import { f } from "../styles";
import * as css from "./FeedCard.css";

interface FeedCardProps {
  articleId: string;
  title: string;
  region: string;
  price: number;
  daysAgo: number;
}
const FeedCard: React.FC<FeedCardProps> = ({
  articleId,
  title,
  price,
  region,
  daysAgo,
}) => {
  const imageUrl = `https://picsum.photos/800/800/?id=${articleId}`;

  return (
    <div className={css.container}>
      <Link
        className={css.button}
        activityName="Article"
        activityParams={{
          articleId: String(articleId),
        }}
      >
        <div className={css.thumbnail}>
          <LazyLoadImage
            className={f.imgObjectFitCover}
            src={imageUrl}
            effect="opacity"
            width={108}
            height={108}
          />
        </div>
        <div className={css.right}>
          <div className={css.title}>{title}</div>
          <div className={css.subtitle}>
            {region} · {daysAgo} day ago
          </div>
          <div className={css.price}>£{price}.00</div>
        </div>
      </Link>
    </div>
  );
};

export default FeedCard;
