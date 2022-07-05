import { ContentHome } from "../../components/Content";
import { wrapper } from "../../state/store";
import { getRandomPosts } from "../../state/actionCreators/content";
import Layout from "../../components/Layout/Layout";
const News = () => { 
  return (
    <Layout>
      <ContentHome />
    </Layout>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // await store.dispatch(getLatestPosts());
  await store.dispatch(getRandomPosts());
  return {
    props: {},
    revalidate: 3600, //time in seconds, tells the page to regenerate at every given second and updates the data even after the build time without deploying it again.
  };
});
export default News;
