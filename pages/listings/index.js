import { Layout } from "../../components/Layout";
import { Properties } from "../../components/Listings";

import {
  getCommercialListings,
  getLandListings,
  getResidentialListings,
} from "../../state/actionCreators/listings";
import { wrapper } from "../../state/store";

const Listings = () => {
  return (
    <Layout>
      <Properties />
    </Layout>
  );
};

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   await store.dispatch(getCommercialListings());
//   await store.dispatch(getLandListings());
//   await store.dispatch(getResidentialListings());
//   return {
//     props: {},
//   };
// });

export default Listings;
