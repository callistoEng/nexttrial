import Head from 'next/head'
import HomePage from '../components/Content/HomePage'
import { getRandomPosts } from '../state/actionsCreators/content';
import {wrapper} from "../state/store" 
function Home() {
  return (
    <div className="p-4">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
        <HomePage/>
     
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // await store.dispatch(getLatestPosts());
  await store.dispatch(getRandomPosts());
  return {
    props: {},
    revalidate:3600 //time in seconds, tells the page to regenerate at every given second and updates the data even after the build time without deploying it again.  
  };
});
export default Home;

