import React from "react";
import { useRouter } from "next/router";
import {
  getFeaturedPosts,
  getContentDetail,
  getPopularPosts,
} from "../../../state/actionCreators/content";
import { wrapper } from "../../../state/store";
import { ContentDetail } from "../../../components/Content";
import Layout from "../../../components/Layout/Layout";
const Slug = ({singleContents}) => {
  const { query } = useRouter();
  return (
    <Layout>
      {/* <ContentDetail slug={query.slug} /> */}
      <ContentDetail singleContents={singleContents} /> 
    </Layout>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(store=>async(context)=>{
  const { params, req, res } = context
  await store.dispatch(getContentDetail(params.slug))
  return { 
    props: {  }
  }
})

// export async function getServerSideProps(context) {
//   const { params, req, res } = context

//   const data = 
//     await fetch(`https://.../products/${params.product}`)
//   const product = await data.json()

//   return { 
//     props: { product },
//   }
// }

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/ssg-slug/`)
//   const postsSlugs = await res.json()
//   // await getFeaturedPosts()
//   // await getPopularPosts()

//   const paths = postsSlugs?.results.map((post) => ({
//     params: { slug: post.slug.toString() },
//   }))

//   return { paths, fallback: 'blocking' }
// }


// export async function getStaticProps({ params }) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_SEMIBASE_URL}/api/v2/contents/detail/${params.slug}/`)
//   const singleContents = await res.json()
//   return { props: { singleContents } }
// }

//test
// export const getStaticProps = wrapper.getStaticProps((store) => async () => { 
//   await store.dispatch(getFeaturedPosts());
//   await store.dispatch(getPopularPosts());
//   return{
//     props:{}
//   }
// }); 


// export async function getStaticPaths() {
//   // Return a list of possible value for id
//   const posts = getContentList();
//   return {
//     // paths: posts.map((post) => {
//     //   return {
//     //     params: {
//     //       postSlug: post.slug,
//     //     },
//     //   };
//     // }),
//     paths: [
//       { params: { postSlug: 'vvsdvsdv' } }
//     ],
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const slug = params.postSlug;
//   results = getContentDetail(slug);
//   return {
//     props: {
//       data: results,
//     },
//   };

//   // Fetch necessary data for the blog post using params.id
// }
export default Slug;
