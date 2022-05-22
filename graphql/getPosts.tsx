import {useQuery, gql} from "@apollo/client";

const GET_POSTS = gql`query MyQuery {
  post {
    id
    title
    user_id
  }
}`

interface Post {
    id: string
    title: string
    userID: string
}

export const getPosts = (hasuraToken:string, userRole:string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {error, loading, data} = useQuery<Post>(GET_POSTS, {
        context: {
            Authorization: `Bearer ${hasuraToken}`,
            "x-hasura-role": `${userRole}`

        }
    })

    return {
        data,
        error,
        loading,
    }



}