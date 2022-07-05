import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { ContentByCategory } from "../../components/Content";
const ContentCategory = () => {
  const router = useRouter()
  const { categories } = router.query;
  return ( 
    <Layout> 
      <ContentByCategory categoryName={categories?.[0]} slug={categories?.[1]} />
    </Layout>
  );
};

export default ContentCategory;
