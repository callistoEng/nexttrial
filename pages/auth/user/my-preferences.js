import UserPreferences from "../../../components/Auth/UserPreferences";
import { Layout } from "../../../components/Layout";
import { getUserPreferences } from "../../../state/actionCreators/auth";
import { getLikedListings } from "../../../state/actionCreators/listings";
import { wrapper } from "../../../state/store";

const MyPreferences = () => {
  return (
    <Layout>
      <UserPreferences /> 
    </Layout>
  );
};
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(getLikedListings());
  await store.dispatch(getUserPreferences());
  return {
    props: {},
  };
});
export default MyPreferences;
