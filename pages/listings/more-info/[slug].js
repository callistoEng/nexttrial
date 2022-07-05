import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout/Layout";
import { ListingDetail } from "../../../components/Listings";
const ListingDetailSlug = () => {
  const { query } = useRouter();
  return (
    <Layout>
      <ListingDetail slug={query?.slug} />
    </Layout>
  );
};
// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   await store.dispatch(getFeaturedPosts());
//   await store.dispatch(getPopularPosts());
//   return{
//     props:{}
//   }
// });
// export const getStaticPaths = async () => {
//   const state = store.getState();

//   const paths = state.user.users.map((user) => {
//     return (
//       {params: {username: user.username}}
//     );
//   });

//   return {paths, fallback: false}
// };
// export const getStaticPaths = wrapper.getStaticProps((store) => async () => {
//   const posts = await getContentList();
//   return {
//     paths: posts.map((post) => {
//       return {
//         params: {
//           postSlug: post.slug,
//         },
//       };
//     }),
//     fallback: false,
//   };
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
export default ListingDetailSlug;
