"use client";

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { getToken, isAuthenticated, saveToken } from "@/lib/auth";

// export const EXPRESS_URL = process.env.NEXT_PUBLIC_EXPRESS_URL;
export const EXPRESS_URL = "https://api.siting.xyz";
export const GRAPHQL_URL = `${EXPRESS_URL}/graphql`;

const refreshLink = new TokenRefreshLink({
  accessTokenField: "access_token",
  isTokenValidOrUndefined: () => Promise.resolve(isAuthenticated()),
  fetchAccessToken: () => {
    return fetch(`${EXPRESS_URL}/refresh`, {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => saveToken(accessToken),
  handleError: (err) => {
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);
  },
});

// const uploadLink = createUploadLink({
//   uri: GRAPHQL_URL,
//   credentials: "include",
// });

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
