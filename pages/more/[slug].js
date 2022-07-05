import React from "react";
import { useRouter } from "next/router";
import { wrapper } from "../../state/store";
import { getContentDetail } from "../../state/actionsCreators/content";
import ContentDetail from "../../components/Content/ContentDetail";
const Slug = () => {
  return <ContentDetail />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context; 
    console.log('params is', params)
    await store.dispatch(getContentDetail(params.slug));
    return {
      props: {},
    };
  }
);
export default Slug;
