import { useRouter } from "next/router";
import { EditPost } from '../../../../components/Agent'
import { Layout } from '../../../../components/Layout'

const EditMyPost = () => {
    const { query } = useRouter();
  return (
    <Layout>
        <EditPost slug={query?.slug}/>
    </Layout>
  )
}

export default EditMyPost