import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    hello: "world",
  },
});

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: "blocking",
  paths: ["/articles/1234"],
});

export default () => null;
