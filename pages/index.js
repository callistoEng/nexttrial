import Head from "next/head";
import { ContentHome } from "../components/Content";
import Layout from "../components/Layout/Layout";
import {
  getCommercialHomeListings,
  getCowokingHomeListings,
  getLandHomeListings,
  getResidentialHomeListings,
} from "../state/actionCreators/listings";
import { getRandomPosts } from "../state/actionCreators/content"; 
import { wrapper } from "../state/store";

function Home() {
  return (
    <section className="p-0 m-0 w-full">
      <Head>
        <title>Estate Cloud | Value in Property and Places</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Estate Cluod | Value for property" />
      </Head>

      <main>
        <Layout>
          <ContentHome />
        </Layout>
      </main>
    </section>
  );
}
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // await store.dispatch(getLatestPosts());
  await store.dispatch(getRandomPosts());
  return {
    props: {},
    revalidate: 3600, //time in seconds, tells the page to regenerate at every given second and updates the data even after the build time without deploying it again.
  };
});
export default Home;
// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async () => {
//       await store.dispatch(getResidentialHomeListings());
//       await store.dispatch(getLandHomeListings());
//       await store.dispatch(getCommercialHomeListings());
//       await store.dispatch(getCowokingHomeListings());
//       return {
//         props: {},
//       };
//     }
// );
