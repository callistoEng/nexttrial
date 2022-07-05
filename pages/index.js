import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { ListingHome } from "../components/Listings";
import {
  getCommercialHomeListings,
  getCowokingHomeListings,
  getLandHomeListings,
  getResidentialHomeListings,
} from "../state/actionCreators/listings";
import { wrapper } from "../state/store";

export default function Home() {
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
          <ListingHome />
        </Layout>
      </main>
    </section> 
  );
}
export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async () => {
      await store.dispatch(getResidentialHomeListings());
      await store.dispatch(getLandHomeListings());
      await store.dispatch(getCommercialHomeListings());
      await store.dispatch(getCowokingHomeListings());
      return {
        props: {},
      };
    }
);

  