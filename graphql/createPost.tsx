import { gql, useMutation} from "@apollo/client";
import { useUser } from '@clerk/clerk-react'
import {useAuth} from "@clerk/nextjs";


const INSERT_POST = gql`    
          mutation MyMutation {
            insert_post_one(object: {title: "with auth"}) {
                title
                id
                user_id
            }
          }
`;

interface Post {
    id: string
    title: string
    userID: string
}

interface NewPostDetails {
    id: string
    title: string
    userID: string
}

export const CreatePost = async (teamplateName: string, userRole:string, token:any) =>  {

    const {userId, getToken} = useAuth()
    const  {user} = useUser()

    const [createPost, {data, loading, error}] = useMutation<{savePost:Post}, {post:NewPostDetails}>(INSERT_POST, {
        context: {
            Authorization: `Bearer ${token}`,
            "x-hasura-role": `${userRole}`
        }
    })

    return [createPost, {data, loading, error}]


}
