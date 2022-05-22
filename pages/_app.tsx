import '../styles/globals.css'
import type { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import {ClerkProvider, SignedIn, SignedOut, RedirectToSignIn} from "@clerk/nextjs"
import {useRouter} from "next/router"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {AuthContext} from "../lib/authcontext";

const client = new ApolloClient({
    uri: "https://hasura-project-22.herokuapp.com",
    cache: new InMemoryCache(),
    headers: {"x-hasura-admin-secret": "grace_under_pressure"}
})

const publicPages:string[] = []

function MyApp({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const isPublicPages = publicPages.includes(pathname)
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  return (
      <ClerkProvider>
        {isPublicPages ? getLayout(<Component {...pageProps} />) : (
            <>
                <ApolloProvider client={client}>
                    <AuthContext.Provider value={{token:null, userRole:null}}>
                        <SignedIn>
                            {getLayout(<Component {...pageProps}/>)}
                        </SignedIn>
                    </AuthContext.Provider>
                </ApolloProvider>
              <SignedOut>
                <RedirectToSignIn/>
              </SignedOut>
            </>
        )}
      </ClerkProvider>
  )
}

export default MyApp
