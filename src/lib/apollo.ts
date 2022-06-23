import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4qbgrdm3jpz01xx0rfecyrh/master",
  cache: new InMemoryCache()
})