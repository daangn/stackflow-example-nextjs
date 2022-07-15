import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { articles } from "../data";

export default () => null;

export const getServerSideProps: GetServerSideProps<{
  articles: typeof articles;
}> = async () => ({
  props: {
    articles,
  },
});

export type MainPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;
