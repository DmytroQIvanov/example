import '../styles/globals.css'
import type { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import {ClerkProvider, SignedIn, SignedOut, RedirectToSignIn} from "@clerk/nextjs"
import {useRouter} from "next/router"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {AuthContext} from "../lib/authcontext";
import {createTheme, ThemeProvider} from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        green: {
            main: string,

        };
        blue: {
            main: string,
        };
    }
    interface PaletteOptions {
        green:  {
            main: string,
            contrastText:string,
        };
        blue: {
            main: string,
            contrastText:string,

        };
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        green:  true;
        blue:true;
    }
}

const client = new ApolloClient({
    uri: "https://hasura-project-22.herokuapp.com",
    cache: new InMemoryCache(),
    headers: {"x-hasura-admin-secret": "grace_under_pressure"}
})

const publicPages:string[] = []
const apiKey = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

function MyApp({ Component, pageProps }: AppProps) {

    const theme = createTheme({
        palette: {
            green: {
                contrastText: '#ffffff',
                main: "#13901B",
            },
            blue:{

                contrastText: '#ffffff',
                main: "#134A90",
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
        },
    });
  const {pathname} = useRouter();
  const isPublicPages = publicPages.includes(pathname)
  const getLayout = Component.getLayout || ((page: ReactElement) => page)
  return (
      <ThemeProvider theme={theme}>

      <ClerkProvider frontendApi={apiKey} {...pageProps} >
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
      </ThemeProvider>
  )
}

export default MyApp
